import React from 'react';
import './App.css';
import {NavbarMobile} from "./navbar/NavbarMobile";
import {PageLoad} from "./PageLoad";
import {HamburgerProps} from "./navbar/Hamburger";


export class App extends React.Component<any, AppState> {
  // @ts-ignore
  constructor(p) {
    super(p);
    this.state = {
      siteReady: false,
      menuActive: false
    }
  }

  toggleMenu = () => {
    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  setPageReady = () => {
    this.setState({
      siteReady: true
    })
  }

  init = () => {
    window.onload = () => {
      this.setPageReady()
    }
  }

  render() {
    this.init()
    let hamburgerProps: HamburgerProps = {
      isActive: this.state.menuActive,
      onclick: this.toggleMenu
    }

    return (
      <div className="App">
        <PageLoad siteReady={this.state.siteReady} />
        <header>
          <NavbarMobile hamburger={hamburgerProps}/>
        </header>
      </div>
    );
  }
}
export interface AppState {
  siteReady: boolean
  menuActive: boolean
}
export default App;
