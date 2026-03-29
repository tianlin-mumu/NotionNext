import Image from 'next/image'
import SiteShell from '@/components/site/SiteShell'
import { aboutPage } from '@/lib/site-pages/content'

export default function AboutPage() {
  return (
    <SiteShell
      title='关于田林'
      description='关于田林的经历、写作出发点，以及这个知识库为什么会存在。'>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr,0.85fr]'>
        <section className='site-shell-card-strong rounded-[32px] p-7 md:p-10'>
          <div className='site-richtext'>
            <p className='site-ui text-sm uppercase tracking-[0.28em] text-[rgba(111,90,69,0.62)]'>
              关于田林
            </p>
            <h1 className='mt-4'>{aboutPage.title}</h1>
            {aboutPage.lead.map(text => (
              <p key={text}>{text}</p>
            ))}

            <div className='mt-10 space-y-6'>
              {aboutPage.story.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <div className='mt-10 rounded-[28px] border border-[rgba(117,91,56,0.14)] bg-[rgba(255,251,244,0.62)] px-6 py-6 md:px-8'>
              <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
                我写过的一本书
              </div>
              <h2 className='mt-4'>{aboutPage.book.title}</h2>
              <p>{aboutPage.book.intro}</p>
              {aboutPage.book.body.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </section>

        <div className='space-y-6'>
          <section className='site-shell-card rounded-[32px] p-6 md:p-8'>
            <div className='relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[28px] bg-[rgba(255,255,255,0.55)]'>
              <Image
                src='/images/site-assets/tianlin.png'
                alt='田林'
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 420px'
              />
            </div>
            <div className='site-ui mt-5 text-sm leading-8 text-[rgba(47,36,26,0.78)]'>
              <div>写作者</div>
              <div>长期主义践行者</div>
              <div>AI 创业者</div>
              <div>常住深圳</div>
              <div>著有《AI 时代不焦虑！用长期主义打破人生困局》</div>
            </div>
          </section>

          <section className='site-shell-card rounded-[32px] p-6 md:p-8'>
            <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
              一条慢慢写出来的路
            </div>
            <div className='mt-5 space-y-5'>
              {aboutPage.timeline.map(item => (
                <div
                  key={item.title}
                  className='rounded-[24px] border border-[rgba(117,91,56,0.14)] bg-[rgba(255,251,244,0.62)] px-5 py-4'>
                  <div className='site-ui text-[16px] text-[#2f241a]'>{item.title}</div>
                  <p className='mt-2 text-[15px] leading-8 text-[rgba(47,36,26,0.75)]'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}

AboutPage.disableThemeLayout = true
