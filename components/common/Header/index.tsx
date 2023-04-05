import Navigation from '../Navigation'
import Logo from '../../../assets/logo.svg'
import Search from '../../../assets/search.svg'
import Menu from '../../../assets/menu.svg'
import Close from '../../../assets/close.svg'
import GlobalState, {
  changeMenuState,
  changeSearchState,
} from '../../../stores/GlobalState'
import { observer } from 'mobx-react'
import { useWindowDimensions } from '../../../hooks/getWindowDimensions'
import { useContentState } from '../../../hooks/RootStoreProvider'
import Link from 'next/link'

const Header = observer(() => {
  const { width } = useWindowDimensions()

  const { menu, links } = useContentState()
  let main = ''
  if (links) {
    main = links?.find((l: any) => l.id == 2)?.link
  }

  return (
    <header className="header">
      <div className="header__func">
        {!GlobalState.isMenuOpen ? (
          <Menu onClick={changeMenuState} />
        ) : (
          <Close onClick={changeMenuState} className="header__menu-but" />
        )}
      </div>
      <a href={`${main.includes('/') ? main : '/' + main}`}>
        <Logo className="header__logo" />
      </a>
      <Navigation />
      <div className="header__search">
        {GlobalState.isSearchOpen && width <= 1024 ? (
          <Close onClick={changeSearchState} className="header__menu-but" />
        ) : (
          <Search onClick={changeSearchState} />
        )}
      </div>
      <a
        className="button black-border p15p40 f14"
        href={(menu as any).bookLink}
        target="__blank"
      >
        <div className="button__text">{(menu as any).bookTitle}</div>
      </a>
    </header>
  )
})

export default Header
