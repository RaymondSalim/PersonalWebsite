import React from "react";
import {Hamburger, HamburgerProps} from "./Hamburger";
import {Menu, MenuProps} from "../menu/Menu";
import BaseProps from "../../common/interface/BaseProps";

export class NavbarMobile extends React.Component<NavbarMobileProps> {
  render() {
    return (
      <div
        className="md:hidden"
      >
        <Hamburger onclick={this.props.hamburger.onclick} isActive={this.props.hamburger.isActive}/>
        <Menu isOpen={this.props.menu.isOpen} onItemClick={this.props.menu.onItemClick} darkMode={this.props.menu.darkMode} darkModeToggle={this.props.menu.darkModeToggle}/>
      </div>
    );
  }
}

export interface NavbarMobileProps extends BaseProps {
  hamburger: HamburgerProps
  menu: MenuProps
}