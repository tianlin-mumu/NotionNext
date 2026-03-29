const fs = require('fs')
const path = require('path')

const checksPath = path.join(__dirname, 'published-page-checks.json')
const checks = JSON.parse(fs.readFileSync(checksPath, 'utf8'))

const inputBaseUrl = process.argv[2] || process.env.SITE_URL || 'https://www.tianlin.site'
const baseUrl = inputBaseUrl.replace(/\/$/, '')
const maxRetries = Number(process.env.CHECK_RETRIES || 1)
const retryDelayMs = Number(process.env.CHECK_RETRY_DELAY_MS || 0)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchPage(check) {
  const url = new URL(check.path, `${baseUrl}/`)
  url.searchParams.set('_tail_check', Date.now().toString())

  const response = await fetch(url.toString(), {
    headers: {
      'cache-control': 'no-cache',
      pragma: 'no-cache'
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }

  const html = await response.text()
  const expectedTexts = Array.isArray(check.expectedText)
    ? check.expectedText
    : [check.expectedText]

  const positions = expectedTexts.map(text => ({
    text,
    position: html.lastIndexOf(text)
  }))
  const matched = positions
    .filter(item => item.position !== -1)
    .sort((a, b) => b.position - a.position)[0]

  if (!matched) {
    throw new Error(`未找到结尾标记: ${expectedTexts.join(' | ')}`)
  }

  if (Array.isArray(check.forbiddenTexts)) {
    const forbidden = check.forbiddenTexts.find(text => html.includes(text))
    if (forbidden) {
      throw new Error(`发现不应出现的内容: ${forbidden}`)
    }
  }

  const ratio = matched.position / html.length
  const minPositionRatio = Number(check.minPositionRatio ?? 0.45)
  if (ratio < minPositionRatio) {
    throw new Error(
      `结尾标记出现位置过早(${(ratio * 100).toFixed(1)}%)，页面可能没有完整结尾`
    )
  }

  return {
    url: url.toString(),
    ratio,
    size: html.length,
    matchedText: matched.text
  }
}

async function main() {
  console.log(`检查已发布页面结尾: ${baseUrl}`)

  let hasFailure = false

  for (const check of checks) {
    let attempt = 0
    let lastError = null

    while (attempt < maxRetries) {
      attempt += 1
      try {
        const result = await fetchPage(check)
        console.log(
          `PASS ${check.label} ${check.path} 结尾位置 ${(result.ratio * 100).toFixed(1)}% 字符数 ${result.size} 标记 ${result.matchedText}`
        )
        lastError = null
        break
      } catch (error) {
        lastError = error
        if (attempt < maxRetries) {
          console.warn(
            `RETRY ${check.label} ${check.path} 第 ${attempt} 次失败: ${error.message}，${retryDelayMs}ms 后重试`
          )
          await sleep(retryDelayMs)
        }
      }
    }

    if (lastError) {
      hasFailure = true
      console.error(`FAIL ${check.label} ${check.path} ${lastError.message}`)
    }
  }

  if (hasFailure) {
    process.exitCode = 1
    return
  }

  console.log('所有页面都找到了预期的结尾标记。')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
