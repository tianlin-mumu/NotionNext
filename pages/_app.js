// import '@/styles/animate.css' // @see https://animate.style/
import '@/styles/globals.css'
import '@/styles/utility-patterns.css'
import '@/styles/site-pages.css'

// core styles shared by all of react-notion-x (required)
import '@/styles/notion.css' //  重写部分notion样式
import 'react-notion-x/src/styles.css' // 原版的react-notion-x

import useAdjustStyle from '@/hooks/useAdjustStyle'
import { GlobalContextProvider } from '@/lib/global'
import { getBaseLayoutByTheme } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getQueryParam } from '../lib/utils'

// 各种扩展插件 这个要阻塞引入
import BLOG from '@/blog.config'
import ExternalPlugins from '@/components/ExternalPlugins'
import SEO from '@/components/SEO'
import { siteMeta } from '@/lib/site-pages/content'
import { zhCN } from '@clerk/localizations'
import dynamic from 'next/dynamic'
// import { ClerkProvider } from '@clerk/nextjs'
const ClerkProvider = dynamic(() =>
  import('@clerk/nextjs').then(m => m.ClerkProvider)
)

/**
 * App挂载DOM 入口文件
 * @param {*} param0
 * @returns
 */
const MyApp = ({ Component, pageProps }) => {
  // 一些可能出现 bug 的样式，可以统一放入该钩子进行调整
  useAdjustStyle()

  const route = useRouter()
  const normalizedPageProps = useMemo(() => {
    const forcedConfig = {
      THEME: BLOG.THEME,
      LANG: BLOG.LANG,
      LINK: BLOG.LINK,
      AUTHOR: BLOG.AUTHOR,
      BIO: BLOG.BIO,
      CUSTOM_MENU: BLOG.CUSTOM_MENU
    }

    return {
      ...pageProps,
      siteInfo: {
        ...(pageProps?.siteInfo || {}),
        title: siteMeta.title,
        description: siteMeta.description
      },
      NOTION_CONFIG: {
        ...(pageProps?.NOTION_CONFIG || {}),
        ...forcedConfig
      }
    }
  }, [pageProps])

  const theme = useMemo(() => {
    return (
      getQueryParam(route.asPath, 'theme') ||
      normalizedPageProps?.NOTION_CONFIG?.THEME ||
      BLOG.THEME
    )
  }, [normalizedPageProps?.NOTION_CONFIG?.THEME, route])

  // 整体布局
  const GLayout = useCallback(
    props => {
      const Layout = getBaseLayoutByTheme(theme)
      return <Layout {...props} />
    },
    [theme]
  )

  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  const disableThemeLayout = Component.disableThemeLayout
  const content = (
    <GlobalContextProvider {...normalizedPageProps}>
      {disableThemeLayout ? (
        <Component {...normalizedPageProps} />
      ) : (
        <GLayout {...normalizedPageProps}>
          <SEO {...normalizedPageProps} />
          <Component {...normalizedPageProps} />
        </GLayout>
      )}
      <ExternalPlugins {...normalizedPageProps} />
    </GlobalContextProvider>
  )
  return (
    <>
      {enableClerk ? (
        <ClerkProvider localization={zhCN}>{content}</ClerkProvider>
      ) : (
        content
      )}
    </>
  )
}

export default MyApp
