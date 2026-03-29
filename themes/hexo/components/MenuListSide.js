import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { siteNavigation } from '@/lib/site-pages/content'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
/**
 * 侧拉抽屉菜单
 * @param {*} props
 * @returns
 */
export const MenuListSide = props => {
  const { customMenu } = props
  const { locale } = useGlobal()

  const primaryLinks = siteNavigation.map((item, index) => ({
    id: index + 100,
    name: item.label,
    href: item.href,
    show: true
  }))

  let links = [
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEXO_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('HEXO_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('HEXO_MENU_TAG', null, CONFIG)
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
    <nav>
      {links?.map((link, index) => (
        <MenuItemCollapse key={index} link={link} />
      ))}
    </nav>
  )
}
