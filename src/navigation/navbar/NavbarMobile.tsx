import React from "react";
import {Logo} from "../../icons/Logo";
import {Hamburger, HamburgerProps} from "./Hamburger";
import {Menu, MenuProps} from "../menu/Menu";
import BaseProps from "../../common/interface/BaseProps";

export class NavbarMobile extends React.Component<NavbarMobileProps> {
  render() {
    return (
      <nav
        id="navbarMobile"
        className="md:hidden bg-theme-secondary-light dark:bg-theme-secondary-dark z-50 fixed w-full top-0  h-header flex justify-between transform transition-all duration-[250ms] px-4"
      >
        <Logo classList={"text-theme-primary p-1 self-center h-w-header-scroll ml-3 z-40"}/>
        <Menu isOpen={this.props.menu.isOpen} onItemClick={this.props.menu.onItemClick} darkMode={this.props.menu.darkMode} darkModeToggle={this.props.menu.darkModeToggle}/>
        <Hamburger onclick={this.props.hamburger.onclick} isActive={this.props.hamburger.isActive}/>
      </nav>
    );
  }
}

export interface NavbarMobileProps extends BaseProps {
  hamburger: HamburgerProps
  menu: MenuProps
}