const escapeHtml = value =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const slugify = value =>
  value
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=|[\]{};:'",.<>/?\\]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const renderInline = raw => {
  let text = escapeHtml(raw)
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  return text
}

const isTableDivider = line =>
  /^\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(line.trim())

const isTableRow = line => line.includes('|')

const toCells = line =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(cell => renderInline(cell.trim()))

export const normalizeEssayMarkdown = markdown => {
  const lines = markdown.replace(/\r/g, '').split('\n')
  let cursor = 0

  while (cursor < lines.length && !lines[cursor].trim()) {
    cursor += 1
  }

  if (/^#\s+/.test(lines[cursor] || '')) {
    cursor += 1
  }

  while (cursor < lines.length) {
    const line = (lines[cursor] || '').trim()
    if (
      !line ||
      /^---+$/.test(line) ||
      /^\*\*[^*]+\*\*[:：]/.test(line) ||
      /^\*\*[^*]+\*\*\s*$/.test(line)
    ) {
      cursor += 1
      continue
    }
    break
  }

  return lines.slice(cursor).join('\n').trim()
}

export const markdownToHtml = markdown => {
  const lines = markdown.replace(/\r/g, '').split('\n')
  const html = []
  const toc = []
  let index = 0

  const pushParagraph = buffer => {
    if (!buffer.length) {
      return
    }
    html.push(`<p>${renderInline(buffer.join(' '))}</p>`)
    buffer.length = 0
  }

  while (index < lines.length) {
    const line = lines[index]
    const trimmed = line.trim()

    if (!trimmed) {
      index += 1
      continue
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2].trim()
      const id = slugify(`${text}-${toc.length}`)
      toc.push({ level, text, id })
      html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`)
      index += 1
      continue
    }

    if (/^---+$/.test(trimmed)) {
      html.push('<hr />')
      index += 1
      continue
    }

    if (trimmed.startsWith('>')) {
      const quoteLines = []
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }
      html.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`)
      continue
    }

    if (/^-\s+/.test(trimmed)) {
      const items = []
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(`<li>${renderInline(lines[index].trim().replace(/^-\s+/, ''))}</li>`)
        index += 1
      }
      html.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(
          `<li>${renderInline(lines[index].trim().replace(/^\d+\.\s+/, ''))}</li>`
        )
        index += 1
      }
      html.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    if (isTableRow(trimmed) && isTableDivider(lines[index + 1] || '')) {
      const header = toCells(lines[index])
      index += 2
      const rows = []
      while (index < lines.length && isTableRow(lines[index].trim())) {
        rows.push(toCells(lines[index]))
        index += 1
      }
      html.push(
        `<table><thead><tr>${header.map(cell => `<th>${cell}</th>`).join('')}</tr></thead><tbody>${rows
          .map(
            row =>
              `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
          )
          .join('')}</tbody></table>`
      )
      continue
    }

    if (trimmed.startsWith('```')) {
      const codeLines = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }
      html.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`)
      index += 1
      continue
    }

    const paragraphBuffer = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,4})\s+/.test(lines[index].trim()) &&
      !/^---+$/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('>') &&
      !/^-+\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('```') &&
      !(isTableRow(lines[index].trim()) && isTableDivider(lines[index + 1] || ''))
    ) {
      paragraphBuffer.push(lines[index].trim())
      index += 1
    }
    pushParagraph(paragraphBuffer)
  }

  return {
    html: html.join('\n'),
    toc
  }
}
