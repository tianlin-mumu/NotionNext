import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { siteNavigation } from '@/lib/site-pages/content'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

export const MenuListTop = props => {
  const { customMenu } = props
  const { locale } = useGlobal()

  const primaryLinks = siteNavigation
    .filter(item => ['/', '/about', '/companion'].includes(item.href))
    .map((item, index) => ({
      id: index + 100,
      name: item.label,
      href: item.href,
      show: true
    }))

  let links = [
    {
      id: 1,
      name: locale.NAV.INDEX,
      href: '/',
      show: false
    },
    {
      id: 3,
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 4,
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEXO_MENU_SEARCH', null, CONFIG)
    }
  ]

  links = primaryLinks.concat(links)

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i
    }
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      <nav
        id='nav-mobile'
        className='leading-8 justify-center font-light w-full flex'>
        {links?.map(
          (link, index) =>
            link && link.show && <MenuItemDrop key={index} link={link} />
        )}
      </nav>
    </>
  )
}
