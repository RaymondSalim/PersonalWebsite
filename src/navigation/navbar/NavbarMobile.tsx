import React from "react";
import {Logo} from "../../icons/Logo";
import {Hamburger, HamburgerProps} from "./Hamburger";
import {Menu, MenuProps} from "../menu/Menu";
import BaseProps from "../../common/interface/BaseProps";

export class NavbarMobile extends React.Component<NavbarMobileProps> {
  static elementID = "navbarMobile"
  render() {
    return (
      <div
        className="md:hidden flex justify-between"
      >
        <Logo classList={"text-theme-primary p-1 self-center h-[calc(var(--header-height-scroll)-1rem)] w-[calc(var(--header-height-scroll)-1rem)] ml-3 z-40"}/>
        <Menu isOpen={this.props.menu.isOpen} onItemClick={this.props.menu.onItemClick} darkMode={this.props.menu.darkMode} darkModeToggle={this.props.menu.darkModeToggle}/>
        <Hamburger onclick={this.props.hamburger.onclick} isActive={this.props.hamburger.isActive}/>
      </div>
    );
  }
}

export interface NavbarMobileProps extends BaseProps {
  hamburger: HamburgerProps
  menu: MenuProps
}