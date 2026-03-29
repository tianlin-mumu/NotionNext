import SmartLink from '@/components/SmartLink'
import { paths } from '@/lib/site-pages/content'

/**
 * 首页导航大按钮组件
 * @param {*} props
 * @returns
 */
const NavButtonGroup = () => {
  return (
    <nav id='home-nav-button' className={'w-full z-10 md:h-72 md:mt-6 xl:mt-32 px-5 py-2 mt-8 flex flex-wrap md:max-w-6xl space-y-2 md:space-y-0 md:flex justify-center max-h-80 overflow-auto'}>
      {paths.map(section => {
        return (
          <SmartLink
            key={section.slug}
            title={section.title}
            href={`/path/${section.slug}`}
            passHref
            className='text-center shadow-text w-full sm:w-4/5 md:mx-6 md:w-40 md:h-14 lg:h-20 h-14 justify-center items-center flex border-2 cursor-pointer rounded-lg glassmorphism hover:bg-white hover:text-black duration-200 hover:scale-105 transform'>
               {section.shortTitle}
            </SmartLink>
        )
      })}
    </nav>
  )
}
export default NavButtonGroup
