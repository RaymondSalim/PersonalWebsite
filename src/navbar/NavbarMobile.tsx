import React from "react";
import {Icon} from "../Icon";
import {Hamburger, HamburgerProps} from "./Hamburger";

export class NavbarMobile extends React.Component<NavbarMobileProps> {
  constructor(props: NavbarMobileProps) {
    super(props);
  }

  render() {
    return (
      <nav
        id="navbarMobile"
        className="md:hidden bg-white dark:bg-header-dark z-50 fixed w-full top-0  h-header flex justify-between transform transition-all duration-250 px-4"
      >
        <Icon class="p-2 self-center h-w-header-scroll" />
        <Hamburger onclick={this.props.hamburger.onclick} isActive={this.props.hamburger.isActive}/>
      </nav>
    );
  }
}

export interface NavbarMobileProps {
  hamburger: HamburgerProps
}