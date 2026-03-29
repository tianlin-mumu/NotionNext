/**
 * 统一处理会与站点内置页面冲突的保留路由。
 * 这些前缀不应该再由 Notion 的泛 slug 页面去预生成，
 * 否则会和 /about、/path/* 这类自定义页面撞车。
 */

const RESERVED_TOP_LEVEL_SEGMENTS = new Set([
  '404',
  '500',
  'about',
  'api',
  'archive',
  'auth',
  'category',
  'companion',
  'dashboard',
  'essay',
  'page',
  'path',
  'rss',
  'search',
  'sign-in',
  'sign-up',
  'sitemap.xml',
  'tag'
])

export function normalizeSlugPath(slug = '') {
  if (!slug) {
    return ''
  }

  return slug.startsWith('/') ? slug.slice(1) : slug
}

export function hasReservedRouteConflict(slug = '') {
  const normalizedSlug = normalizeSlugPath(slug)
  if (!normalizedSlug) {
    return false
  }

  const [firstSegment] = normalizedSlug.split('/')
  return RESERVED_TOP_LEVEL_SEGMENTS.has(firstSegment)
}

