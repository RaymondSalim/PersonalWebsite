import {NavbarMobile, NavbarMobileProps} from "./navbar/NavbarMobile";
import React from "react";
import {Logo} from "../icons/Logo";

export class Header extends React.Component<HeaderProps, HeaderState> {
  static elementID = "header"
  constructor(props: HeaderProps) {
    super(props);
    this.state =  {
      windowY: Number.MIN_SAFE_INTEGER
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

      // Limit scroll event to trigger only when change is greater than 5px
      if (Math.abs(this.state.windowY - scrollPos) < 10) {
        return
      }

      let navMobile = document.querySelector(`#${Header.elementID}`)

      let yLessThan90 = scrollPos < 90
      navMobile?.classList.toggle('h-header', yLessThan90)
      navMobile?.classList.toggle('h-header-scroll', !yLessThan90)


      if (this.state.windowY < scrollPos && scrollPos > 150) { // Scrolling down
        navMobile?.classList.toggle('-translate-y-full', true)
      } else {
        navMobile?.classList.toggle('-translate-y-full', false)
      }

      this.setState({
        windowY: window.scrollY
      })
    })
    window.scroll()
  }

  render() {
    return (
      <header
        id={Header.elementID}
        className="bg-theme-secondary-light dark:bg-theme-secondary-dark z-50 fixed w-full top-0  h-header flex justify-between transform transition-all duration-[250ms] px-4"
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
}