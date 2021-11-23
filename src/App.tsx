import React, {SyntheticEvent} from 'react';
import {NavbarMobile} from "./navigation/navbar/NavbarMobile";
import {PageLoad} from "./PageLoad";
import {HamburgerProps} from "./navigation/navbar/Hamburger";
import {MenuProps} from "./navigation/menu/Menu";
import {getItemFromLocalStorage, setItemInLocalStorage} from "./util/LocalStorage";
import {DarkModeToggle} from "./DarkModeToggle";


export default class App extends React.Component<any, AppState> {
  // @ts-ignore
  constructor(p) {
    super(p);
    this.state = {
      siteReady: false,
      menuActive: false,
      darkMode: this.isDarkModeEnabled(),
    }
  }

  componentDidMount() {
    window.onload = () => {
      this.setPageReady()
    }

    this.initDarkMode()
  }

  toggleMenu = () => {
    document.body.classList.toggle('overflow-y-hidden', !this.state.menuActive) // Prevent scrolling when menu is open

    this.setState({
      menuActive: !this.state.menuActive
    })
  }

  initDarkMode() {
    document.body.classList.toggle('dark', this.state.darkMode)
  }

  toggleDarkMode = (e: SyntheticEvent) => {
    let isDark = (e.target as HTMLInputElement).checked
    setItemInLocalStorage(DarkModeToggle.localStorageKey, isDark)
    this.setState({
      darkMode: isDark
    })

    document.body.classList.toggle('dark', isDark)
  }

  setPageReady = () => {
    this.setState({
      siteReady: true
    })
  }

  // Checks localStorage for existing data, else check system preference
  isDarkModeEnabled(): boolean {
    let saved = getItemFromLocalStorage(DarkModeToggle.localStorageKey)
    let system = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    console.log(`isDarkModeEnabled: ${saved ?? system}`)
    return saved ?? system
  }

  render() {
    let hamburgerProps: HamburgerProps = {
      isActive: this.state.menuActive,
      onclick: this.toggleMenu
    }
    let menuProps: MenuProps = {
      isOpen: this.state.menuActive,
      onItemClick: this.toggleMenu,
      darkModeToggle: this.toggleDarkMode,
      darkMode: this.state.darkMode,
    }
    return (
      <div className={"antialiased relative bg-theme-secondary-light dark:bg-theme-secondary-dark"} >
        <PageLoad siteReady={this.state.siteReady} />
        <header>
          <NavbarMobile hamburger={hamburgerProps} menu={menuProps}/>
        </header>
        <main className={`${this.state.menuActive ? 'blur-sm brightness-75' : ''} transition-all ease-in duration-150`}>
          <img
            src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            alt=""
          />
          <footer>
            <div>
              <span>Icons by </span>
              <a href="https://colebemis.com/">Cole Bemis</a>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}

export interface AppState {
  siteReady: boolean
  menuActive: boolean
  darkMode: boolean
}

