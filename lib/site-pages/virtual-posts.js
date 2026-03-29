import { normalizeSlugPath } from '@/lib/utils/route'
import { essayCollection } from './essay-meta'
import { siteMeta } from './content'

const DEFAULT_TAG_COLORS = [
  'blue',
  'green',
  'purple',
  'orange',
  'pink',
  'yellow',
  'red'
]

const DEFAULT_CATEGORY_COLORS = ['blue', 'green', 'purple', 'orange']

const DEMO_SLUG_PATTERNS = [
  /^#$/,
  /^links$/,
  /^article\/guide$/,
  /^article\/intro$/,
  /^article\/invisible$/,
  /^article\/example-\d+$/,
  /^article\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
]

function pickColor(value, palette) {
  const source = String(value || '')
  let hash = 0
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0
  }
  return palette[hash % palette.length]
}

function createTagItems(tags = []) {
  return tags.map(tag => ({
    id: `local-tag-${tag}`,
    color: pickColor(tag, DEFAULT_TAG_COLORS),
    name: tag
  }))
}

function isDemoSlug(slug = '') {
  const normalizedSlug = normalizeSlugPath(slug)
  return DEMO_SLUG_PATTERNS.some(pattern => pattern.test(normalizedSlug))
}

export function isDemoContentPage(page) {
  if (!page?.slug) {
    return false
  }

  return isDemoSlug(page.slug)
}

export function applySiteIdentity(siteInfo = {}) {
  const nextSiteInfo = { ...siteInfo }

  if (
    !nextSiteInfo.title ||
    nextSiteInfo.title === 'Notion 博客' ||
    nextSiteInfo.title === 'NotionNext BLOG'
  ) {
    nextSiteInfo.title = siteMeta.title
  }

  if (
    !nextSiteInfo.description ||
    nextSiteInfo.description === '一个NotionNext搭建的博客' ||
    nextSiteInfo.description === '这是一个由NotionNext生成的站点'
  ) {
    nextSiteInfo.description = siteMeta.description
  }

  return nextSiteInfo
}

export function getVirtualEssayPosts(siteInfo = {}) {
  return essayCollection.map((essay, index) => {
    const publishDay = essay.publishDay
    const updatedDay = essay.updatedDay || publishDay
    const publishDate = new Date(publishDay).getTime()
    const lastEditedDate = new Date(updatedDay)
    const category = essay.category || essay.pathLabel
    const tags = essay.tags || []

    return {
      id: `local-essay-${essay.slug}`,
      slug: `essay/${essay.slug}`,
      href: `/essay/${essay.slug}`,
      title: essay.title,
      summary: essay.summary,
      type: 'Post',
      status: 'Published',
      category,
      tags,
      tagItems: createTagItems(tags),
      publishDay,
      publishDate,
      lastEditedDay: updatedDay,
      lastEditedDate,
      pageCover: siteInfo.pageCover || '/bg_image.jpg',
      pageCoverThumbnail: siteInfo.pageCover || '/bg_image.jpg',
      pageIcon: '',
      icon: '',
      target: '_self',
      password: '',
      fullWidth: false,
      readTime: essay.readTime,
      date: {
        start_date: publishDay,
        time_zone: 'Asia/Shanghai'
      },
      source: 'local-essay',
      index: index + 1
    }
  })
}

export function mergeOwnedContent(collectionData = [], siteInfo = {}) {
  const filteredPages = collectionData.filter(page => !isDemoContentPage(page))
  const ownedPosts = getVirtualEssayPosts(siteInfo)
  const seenSlugs = new Set(filteredPages.map(page => normalizeSlugPath(page.slug)))

  const mergedPosts = ownedPosts.filter(post => !seenSlugs.has(post.slug))

  return [...mergedPosts, ...filteredPages]
}

export function createCategoryOptionsFromPages(allPages = []) {
  const categories = Array.from(
    new Set(
      allPages
        .filter(page => page?.type === 'Post' && page?.status === 'Published')
        .map(page => page?.category)
        .filter(Boolean)
    )
  )

  return categories.map(category => ({
    id: `local-category-${category}`,
    value: category,
    color: pickColor(category, DEFAULT_CATEGORY_COLORS)
  }))
}

export function createTagOptionsFromPages(allPages = []) {
  const tags = Array.from(
    new Set(
      allPages
        .filter(page => page?.type === 'Post')
        .flatMap(page => page?.tags || [])
        .filter(Boolean)
    )
  )

  return tags.map(tag => ({
    id: `local-tag-${tag}`,
    value: tag,
    color: pickColor(tag, DEFAULT_TAG_COLORS)
  }))
}

