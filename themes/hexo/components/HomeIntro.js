import SmartLink from '@/components/SmartLink'
import { homePage, paths } from '@/lib/site-pages/content'
import { essayCollection } from '@/lib/site-pages/essay-meta'
import Card from './Card'

export default function HomeIntro() {
  return (
    <div className='space-y-6 px-2'>
      <Card>
        <div className='space-y-5'>
          <div className='text-xs uppercase tracking-[0.28em] text-[#8a6a49] dark:text-[#c5a889]'>
            写在前面
          </div>
          <div className='space-y-4 text-[17px] leading-8 text-[#3a2b1f] dark:text-gray-300'>
            {homePage.note.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <div className='flex flex-wrap gap-3 pt-2'>
            <SmartLink
              href='/about'
              className='inline-flex rounded-full border border-[#d8c4ad] px-5 py-3 text-[15px] text-[#3a2b1f] transition hover:bg-[#f4ece2] dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800'>
              关于田林
            </SmartLink>
            <SmartLink
              href='/companion'
              className='inline-flex rounded-full bg-[#8a6a49] px-5 py-3 text-[15px] text-white transition hover:opacity-90'>
              陪伴计划
            </SmartLink>
          </div>
        </div>
      </Card>

      <Card>
        <div className='space-y-5'>
          <div className='text-xs uppercase tracking-[0.28em] text-[#8a6a49] dark:text-[#c5a889]'>
            四条路径
          </div>
          <p className='text-[16px] leading-8 text-[#4f4033] dark:text-gray-300'>
            {homePage.pathwaysIntro}
          </p>
          <div className='grid gap-4 md:grid-cols-2'>
            {paths.map(section => (
              <SmartLink
                key={section.slug}
                href={`/path/${section.slug}`}
                className='group rounded-2xl border border-[#eadcca] bg-[#fcf8f2] px-5 py-5 transition hover:-translate-y-0.5 hover:border-[#d6b892] dark:border-gray-800 dark:bg-[#121212] dark:hover:border-[#8a6a49]'>
                <div className='text-xl text-[#2f241a] dark:text-white'>
                  {section.title}
                </div>
                <p className='mt-3 text-[15px] leading-8 text-[#5e4d3f] dark:text-gray-300'>
                  {section.body[0]}
                </p>
              </SmartLink>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className='space-y-5'>
          <div className='text-xs uppercase tracking-[0.28em] text-[#8a6a49] dark:text-[#c5a889]'>
            {homePage.featuredTitle}
          </div>
          <p className='text-[16px] leading-8 text-[#4f4033] dark:text-gray-300'>
            {homePage.featuredIntro}
          </p>
          <div className='grid gap-4 md:grid-cols-2'>
            {essayCollection.map(essay => (
              <SmartLink
                key={essay.slug}
                href={`/essay/${essay.slug}`}
                className='group rounded-2xl border border-[#eadcca] bg-[#fcf8f2] px-5 py-5 transition hover:-translate-y-0.5 hover:border-[#d6b892] dark:border-gray-800 dark:bg-[#121212] dark:hover:border-[#8a6a49]'>
                <div className='text-[13px] tracking-[0.18em] text-[rgba(111,90,69,0.62)] dark:text-[#c5a889]'>
                  {essay.pathLabel} · {essay.readTime}
                </div>
                <div className='mt-3 text-xl text-[#2f241a] dark:text-white'>
                  {essay.title}
                </div>
                <p className='mt-3 text-[15px] leading-8 text-[#5e4d3f] dark:text-gray-300'>
                  {essay.summary}
                </p>
              </SmartLink>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
