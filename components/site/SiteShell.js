import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SiteHead from './SiteHead'
import { siteMeta, siteNavigation } from '@/lib/site-pages/content'

function NavLink({ href, label, pathname, onClick }) {
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`site-link rounded-full px-4 py-2 text-sm md:text-[15px] ${
        active
          ? 'bg-[rgba(138,105,72,0.13)] text-[#2f241a]'
          : 'text-[rgba(47,36,26,0.72)] hover:bg-[rgba(138,105,72,0.08)]'
      }`}>
      {label}
    </Link>
  )
}

export default function SiteShell({
  title,
  description,
  eyebrow,
  children
}) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className='site-surface min-h-screen'>
      <SiteHead title={title} description={description} />

      <header className='site-ui sticky top-0 z-30 px-4 pt-4 md:px-6'>
        <div className='site-shell-card mx-auto flex max-w-6xl items-center justify-between rounded-[28px] px-4 py-3 md:px-6 md:py-4'>
          <Link href='/' className='flex items-center gap-3'>
            <div className='relative h-11 w-11 overflow-hidden rounded-full border border-[rgba(117,91,56,0.18)] bg-white/70'>
              <Image
                src='/images/site-assets/tianlin.png'
                alt='田林'
                fill
                className='object-cover'
                sizes='44px'
              />
            </div>
            <div>
              <div className='text-[13px] uppercase tracking-[0.26em] text-[rgba(111,90,69,0.65)]'>
                {eyebrow || 'AI 时代不焦虑'}
              </div>
              <div className='text-[17px] text-[#2f241a]'>{siteMeta.title}</div>
            </div>
          </Link>

          <button
            type='button'
            onClick={() => setMenuOpen(!menuOpen)}
            className='site-link rounded-full border border-[rgba(117,91,56,0.18)] px-4 py-2 text-sm text-[rgba(47,36,26,0.78)] md:hidden'>
            {menuOpen ? '收起' : '菜单'}
          </button>

          <nav className='hidden items-center gap-1 md:flex'>
            {siteNavigation.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                pathname={router.pathname}
              />
            ))}
          </nav>
        </div>

        {menuOpen && (
          <div className='site-shell-card mx-auto mt-3 max-w-6xl rounded-[24px] p-3 md:hidden'>
            <nav className='flex flex-col gap-1'>
              {siteNavigation.map(item => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  pathname={router.pathname}
                  onClick={() => setMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className='px-4 pb-20 pt-8 md:px-6 md:pt-10'>{children}</main>

      <footer className='site-ui px-4 pb-8 md:px-6'>
        <div className='site-shell-card mx-auto flex max-w-6xl flex-col gap-5 rounded-[28px] px-6 py-6 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            <div className='text-sm uppercase tracking-[0.22em] text-[rgba(111,90,69,0.62)]'>
              AI 时代不焦虑
            </div>
            <p className='mt-3 text-[15px] leading-8 text-[rgba(47,36,26,0.78)]'>
              这里会继续整理那些真正帮过人的书、故事、经验和方法，也会慢慢记录它们是怎样走进现实生活的。
            </p>
          </div>
          <div className='text-sm leading-7 text-[rgba(111,90,69,0.72)]'>
            <div>作者：田林</div>
            <div>常住地：深圳</div>
            <div>联系作者：页面内二维码</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
