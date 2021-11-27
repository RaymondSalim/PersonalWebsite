import {NavbarMobile, NavbarMobileProps} from "./navbar/NavbarMobile";
import React from "react";

export class Header extends React.Component<HeaderProps, HeaderState> {
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
      let navMobile = document.querySelector(`#${NavbarMobile.elementID}`)

      if (this.state.windowY < scrollPos) { // Scrolling down
        navMobile?.classList.toggle('-translate-y-full', true)
      } else {
        navMobile?.classList.toggle('-translate-y-full', false)
      }
      this.setState({
        windowY: window.scrollY
      })
    })
  }

  render() {
    return (
      <header>
        <NavbarMobile hamburger={this.props.navBarMobileProps.hamburger} menu={this.props.navBarMobileProps.menu}/>
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