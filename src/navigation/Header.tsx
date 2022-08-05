import React from 'react';
import { NavBar as NavBarMobile, NavbarMobileProps } from './navbar/mobile/NavBar';
import { NavBar as NavBarDesktop } from './navbar/desktop/NavBar';
import { Logo } from '../icons/Logo';

export class Header extends React.Component<HeaderProps, HeaderState> {
  static elementID = 'header';

  expandYLimit = 90;

  hiddenYStart = 150;

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      windowY: Number.MIN_SAFE_INTEGER,
    };
  }

  componentDidMount() {
    this.setState({
      windowY: window.scrollY,
    });
    this.toggleOnScroll();
  }

  forceHeaderState(visible?: boolean) {
    this.setState({
      forceNotHidden: visible,
    });
  }

  toggleOnScroll() {
    document.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Limit scroll event to trigger only when change is greater than 10px
      if (Math.abs(this.state.windowY - scrollPos) < 10) {
        return;
      }

      const yLessThan90 = scrollPos < this.expandYLimit;

      const hidden = this.state.windowY < scrollPos && scrollPos > this.hiddenYStart;

      this.setState({
        windowY: window.scrollY,
        expanded: yLessThan90,
        hidden,
        forceNotHidden: undefined,
      });
    });
    window.scroll();
  }

  render() {
    return (
      <header
        id={Header.elementID}
        className={`bg-gray-lightest dark:bg-gray-dark z-50 fixed max-w-[100vw] w-full top-0  h-header flex justify-between transition-all duration-[250ms] px-4
          ${(this.state.expanded ?? true) ? 'h-header' : '!bg-opacity-50 shadow-md backdrop-blur-md h-header-scroll'}
          ${(this.state.forceNotHidden ?? !this.state.hidden) ? '' : '-translate-y-full'}
        `}
      >
        <Logo
          className={'text-blue-sapphire p-1 h-[calc(var(--header-height-scroll)-1rem)] w-[calc(var(--header-height-scroll)-1rem)] my-auto ml-3 z-40'}/>
        <nav
          className={'h-[fit-content] my-auto'}
          onFocus={() => {
            this.forceHeaderState(true);
          }}
          onBlur={() => {
            this.forceHeaderState(undefined);
          }}
        >
          <NavBarMobile hamburger={this.props.navBarMobileProps.hamburger} menu={this.props.navBarMobileProps.menu}/>
          <NavBarDesktop darkMode={this.props.navBarMobileProps.menu.darkMode}
                         darkModeToggle={this.props.navBarMobileProps.menu.darkModeToggle}/>
        </nav>
      </header>
    );
  }
}

export interface HeaderProps {
  navBarMobileProps: NavbarMobileProps
}

export interface HeaderState {
  windowY: number
  expanded?: boolean
  hidden?: boolean
  forceNotHidden?: boolean
}
