import {NavbarMobile, NavbarMobileProps} from "./navbar/NavbarMobile";
import React from "react";
import {Logo} from "../icons/Logo";

export class Header extends React.Component<HeaderProps, HeaderState> {
  static elementID = "header"
  expandYLimit = 90
  hiddenYStart = 150

  constructor(props: HeaderProps) {
    super(props);
    this.state =  {
      windowY: Number.MIN_SAFE_INTEGER,
    }
  }

  componentDidMount() {
    this.setState({
      windowY: window.scrollY
    })
    this.toggleOnScroll()
  }

  toggleOnScroll() {
    document.addEventListener('scroll', () => {
      let scrollPos = window.scrollY

      // Limit scroll event to trigger only when change is greater than 10px
      if (Math.abs(this.state.windowY - scrollPos) < 10) {
        return
      }

      let yLessThan90 = scrollPos < this.expandYLimit

      let hidden = this.state.windowY < scrollPos && scrollPos > this.hiddenYStart

      this.setState({
        windowY: window.scrollY,
        expanded: yLessThan90,
        hidden: hidden
      })
    })
    window.scroll()
  }

  render() {
    return (
      <header
        id={Header.elementID}
        className={`bg-theme-secondary-light dark:bg-theme-secondary-dark z-50 fixed w-full top-0  h-header flex justify-between transform transition-all duration-[250ms] px-4
          ${ (this.state.expanded ?? true) ? 'h-header' : 'h-header-scroll' }
          ${ this.state.hidden ? '-translate-y-full' : '' }
        `}
      >
        <Logo classList={"text-theme-primary p-1 h-[calc(var(--header-height-scroll)-1rem)] w-[calc(var(--header-height-scroll)-1rem)] my-auto ml-3 z-40"}/>
        <nav className={"h-[fit-content] my-auto"}>
          <NavbarMobile hamburger={this.props.navBarMobileProps.hamburger} menu={this.props.navBarMobileProps.menu}/>
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
}