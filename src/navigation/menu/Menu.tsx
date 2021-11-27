import React, {SyntheticEvent} from "react";
import './Menu.css'
import {User} from "../../icons/User";
import {Work} from "../../icons/Work";
import {Project} from "../../icons/Project";
import {Contact} from "../../icons/Contact";
import {DarkModeToggle} from "../../DarkModeToggle";
import BaseProps from "../../common/interface/BaseProps";

export class Menu extends React.Component<MenuProps> {
  render() {
    let cls;
    if (this.props.isOpen) {
      cls = '-translate-x-full'
    } else {
      cls = ''
    }

    return (
      <>
        <div
          id="mobileMenu"
          className={cls}
        >
          <ul>
            <li>
              <a href="#about_me" onClick={this.props.onItemClick}>
                <User />
                <span>About Me</span>
              </a>
            </li>
            <li>
              <a href="#skills_experiences" onClick={this.props.onItemClick}>
                <Work />
                <span>Skills & Experience</span>
              </a>
            </li>
            <li>
              <a href="#projects" onClick={this.props.onItemClick}>
                <Project />
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a href="#contact" onClick={this.props.onItemClick}>
                <Contact />
                <span>Contact</span>
              </a>
            </li>
          </ul>
          <div className={'mt-auto'}>
            <DarkModeToggle initialState={this.props.darkMode} onChange={this.props.darkModeToggle}/>
          </div>
        </div>
      </>
    );
  }
}

export interface MenuProps extends BaseProps {
  isOpen: boolean
  onItemClick: () => void
  darkMode: boolean
  darkModeToggle: (e: SyntheticEvent) => void
}