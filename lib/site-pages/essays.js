import { markdownToHtml, normalizeEssayMarkdown } from './markdown'
import { essayCollection } from './essay-meta'

export const getEssayBySlug = slug =>
  essayCollection.find(essay => essay.slug === slug)

export const getEssaySlugs = () => essayCollection.map(essay => essay.slug)

export const getEssayContent = slug => {
  const essay = getEssayBySlug(slug)
  if (!essay) {
    return null
  }

  const fs = require('fs')
  const path = require('path')
  const ESSAY_ROOT = path.join(process.cwd(), 'content/essays')
  const source = fs.readFileSync(path.join(ESSAY_ROOT, essay.sourceFile), 'utf8')
  const normalized = normalizeEssayMarkdown(source)
  const rendered = markdownToHtml(normalized)

  return {
    ...essay,
    body: normalized,
    html: rendered.html,
    toc: rendered.toc
  }
}
