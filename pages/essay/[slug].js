import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import { getEssayContent, getEssaySlugs } from '@/lib/site-pages/essays'

export default function EssayPage({ essay }) {
  return (
    <SiteShell title={essay.title} description={essay.summary} eyebrow={essay.pathLabel}>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr),300px]'>
          <article className='site-shell-card-strong rounded-[32px] p-7 md:p-10'>
            <div className='site-ui text-[13px] tracking-[0.18em] text-[rgba(111,90,69,0.62)]'>
              {essay.pathLabel} · {essay.readTime}
            </div>
            <h1 className='mt-4 text-[clamp(2rem,4vw,3.8rem)] leading-[1.08] text-[#2f241a]'>
              {essay.title}
            </h1>
            <p className='mt-5 max-w-3xl text-[17px] leading-8 text-[rgba(47,36,26,0.74)]'>
              {essay.summary}
            </p>

            <div
              className='site-richtext mt-10'
              dangerouslySetInnerHTML={{ __html: essay.html }}
            />
          </article>

          <aside className='space-y-6'>
            <div className='site-shell-card rounded-[32px] p-6 md:p-8'>
              <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
                回到路径
              </div>
              <p className='mt-4 text-[15px] leading-8 text-[rgba(47,36,26,0.74)]'>
                如果你想顺着同一个主题继续往下读，可以先回到这条路径。
              </p>
              <Link
                href={`/path/${essay.path}`}
                className='site-link mt-5 inline-flex rounded-full border border-[rgba(117,91,56,0.18)] px-5 py-3 text-[15px] text-[#2f241a] hover:bg-[rgba(138,105,72,0.08)]'>
                去看看 {essay.pathLabel}
              </Link>
            </div>

            {essay.toc?.length > 0 && (
              <div className='site-shell-card rounded-[32px] p-6 md:p-8'>
                <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
                  目录
                </div>
                <div className='mt-4 space-y-2'>
                  {essay.toc
                    .filter(item => item.level <= 3)
                    .map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`site-link block text-[15px] leading-7 text-[rgba(47,36,26,0.75)] ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}>
                        {item.text}
                      </a>
                    ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </SiteShell>
  )
}

export const getStaticPaths = async () => ({
  paths: getEssaySlugs().map(slug => ({ params: { slug } })),
  fallback: false
})

export const getStaticProps = async ({ params }) => ({
  props: {
    essay: getEssayContent(params.slug)
  }
})

EssayPage.disableThemeLayout = true
