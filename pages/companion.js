import Image from 'next/image'
import SiteShell from '@/components/site/SiteShell'
import { companionPage } from '@/lib/site-pages/content'

export default function CompanionPage() {
  return (
    <SiteShell
      title='陪伴计划'
      description='关于这个知识库后续可能展开的陪伴式内容、交流方式和节奏。'>
      <div className='mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr,0.9fr]'>
        <section className='site-shell-card-strong rounded-[32px] p-7 md:p-10'>
          <div className='site-richtext'>
            <p className='site-ui text-sm uppercase tracking-[0.28em] text-[rgba(111,90,69,0.62)]'>
              陪伴计划
            </p>
            <h1 className='mt-4'>{companionPage.title}</h1>
            {companionPage.lead.map(text => (
              <p key={text}>{text}</p>
            ))}
            <div className='mt-8 space-y-6'>
              {companionPage.body.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </section>

        <div className='space-y-6'>
          <section className='site-shell-card rounded-[32px] p-6 md:p-8'>
            <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
              可能会有的内容
            </div>
            <ul className='mt-5 space-y-3 text-[15px] leading-8 text-[rgba(47,36,26,0.76)]'>
              <li>按主题整理的共学内容</li>
              <li>阶段性的答疑与讨论</li>
              <li>只对成员开放的深度文章</li>
              <li>更新提醒和主题资料包</li>
              <li>更适合慢慢交流的空间</li>
            </ul>
          </section>

          <section className='site-shell-card rounded-[32px] p-6 md:p-8'>
            <div className='site-ui text-sm uppercase tracking-[0.24em] text-[rgba(111,90,69,0.62)]'>
              联系作者
            </div>
            <div className='mt-5 flex flex-col items-center gap-4'>
              <div className='relative aspect-square w-full max-w-[260px] overflow-hidden rounded-[28px] border border-[rgba(117,91,56,0.14)] bg-white p-3'>
                <Image
                  src='/images/site-assets/wechat-qr.jpg'
                  alt='微信二维码'
                  fill
                  className='object-contain p-3'
                  sizes='260px'
                />
              </div>
              <p className='text-center text-[14px] leading-7 text-[rgba(47,36,26,0.7)]'>
                如果你想先聊聊，也可以通过微信来找到我。
              </p>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}

CompanionPage.disableThemeLayout = true
