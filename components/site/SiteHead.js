import Head from 'next/head'
import { siteMeta } from '@/lib/site-pages/content'

export default function SiteHead({
  title,
  description = siteMeta.description,
  image = '/images/site-assets/tianlin-book-avatar.png'
}) {
  const pageTitle = title ? `${title} | ${siteMeta.title}` : siteMeta.title

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content={description} />
      <meta name='keywords' content='AI, 长期主义, 个人成长, 焦虑, 人生方向' />
      <meta name='author' content='田林' />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  )
}
