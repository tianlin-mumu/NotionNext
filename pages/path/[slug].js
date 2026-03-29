import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { getPathBySlug, getFeaturedEssays, paths } from '@/lib/site-pages/content'

export default function PathPage({ section, essays }) {
  return (
    <SiteShell title={section.title} description={section.body[0]}>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr,0.9fr]'>
        <section className='site-shell-card-strong rounded-[32px] p-7 md:p-10'>
          <div className='site-richtext'>
            <p className='site-ui text-sm uppercase tracking-[0.28em] text-[rgba(111,90,69,0.62)]'>
              路径
            </p>
            <h1 className='mt-4'>{section.title}</h1>
            {section.intro.map(text => (
              <p key={text}>{text}</p>
            ))}

            <div className='mt-8 space-y-6'>
              {section.body.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <h2>这一部分会慢慢写到的内容</h2>
            <ul>
              {section.topics.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className='space-y-6'>
          <section className='site-shell-card rounded-[32px] p-6 md:p-8'>
            <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
              先从这些文章读起
            </div>
            <div className='mt-5 space-y-4'>
              {essays.map(essay => (
                <Link
                  key={essay.slug}
                  href={`/essay/${essay.slug}`}
                  className='site-link block rounded-[24px] border border-[rgba(117,91,56,0.14)] bg-[rgba(255,251,244,0.7)] px-5 py-5 hover:translate-y-[-2px]'>
                  <div className='site-ui text-[13px] tracking-[0.18em] text-[rgba(111,90,69,0.62)]'>
                    {essay.pathLabel} · {essay.readTime}
                  </div>
                  <h2 className='mt-3 text-[22px] leading-8 text-[#2f241a]'>
                    {essay.title}
                  </h2>
                  <p className='mt-3 text-[15px] leading-8 text-[rgba(47,36,26,0.74)]'>
                    {essay.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}

export const getStaticPaths = async () => ({
  paths: paths.map(section => ({ params: { slug: section.slug } })),
  fallback: false
})

export const getStaticProps = async ({ params }) => {
  const section = getPathBySlug(params.slug)
  return {
    props: {
      section,
      essays: getFeaturedEssays(section.featuredEssaySlugs)
    }
  }
}

PathPage.disableThemeLayout = true
