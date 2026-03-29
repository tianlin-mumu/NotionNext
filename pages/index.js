import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData, getPostBlocks } from '@/lib/db/SiteDataApi'
import { checkDataFromAlgolia } from '@/lib/plugins/algolia'
import { generateRedirectJson } from '@/lib/utils/redirect'
import { generateRobotsTxt } from '@/lib/utils/robots.txt'
import { generateRss } from '@/lib/utils/rss'
import { generateSitemapXml } from '@/lib/utils/sitemap.xml'
import { DynamicLayout } from '@/themes/theme'

const Index = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutIndex' {...props} />
}

export async function getStaticProps(req) {
  const { locale } = req
  const from = 'index'
  const props = await fetchGlobalAllData({ from, locale })
  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    12,
    props?.NOTION_CONFIG
  )
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )

  if (siteConfig('POST_LIST_STYLE') === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  if (siteConfig('POST_LIST_PREVIEW', false, props?.NOTION_CONFIG)) {
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
      post.blockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
    }
  }

  generateRobotsTxt(props)
  generateRss(props)
  generateSitemapXml(props)
  checkDataFromAlgolia(props)
  if (siteConfig('UUID_REDIRECT', false, props?.NOTION_CONFIG)) {
    generateRedirectJson(props)
  }

  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default Index
