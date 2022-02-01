import React, {SyntheticEvent} from 'react';
import {NavbarMobileProps} from "./navigation/navbar/mobile/NavBar";
import {PageLoad} from "./PageLoad";
import {getItemFromLocalStorage, setItemInLocalStorage} from "./util/LocalStorage";
import {DarkModeToggle} from "./util/darkmode/DarkModeToggle";
import {Header} from "./navigation/Header";
import {Button} from "./buttons/Button";


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
    let isDark = (e.target as HTMLInputElement).checked ?? !this.isDarkModeEnabled()
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
    return saved ?? system
  }

  render() {
    let navbarMobileProps: NavbarMobileProps = {
      hamburger: {
        isActive: this.state.menuActive,
        onclick: this.toggleMenu
      },
      menu: {
        isOpen: this.state.menuActive,
        onItemClick: this.toggleMenu,
        darkModeToggle: this.toggleDarkMode,
        darkMode: this.state.darkMode,
      }
    }
    return (
      <div className={"antialiased relative bg-theme-secondary-light dark:bg-theme-secondary-dark"} >
        <PageLoad siteReady={this.state.siteReady} />
        <Header navBarMobileProps={navbarMobileProps}/>
        <main className={`${this.state.menuActive ? 'blur-sm brightness-75' : ''} transition-all ease-in duration-150 mx-8 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24`}>
          <section id="section-home">
            <div id="home-content">
                <h1>Hi, my<br/>name is <span><strong>Raymond</strong></span>.</h1>
                <p>I'm a software engineer specializing in backend development.</p>
                <Button text={"Hire me!"} className={"px-8 py-4 mt-4"} href={"#contact"}/>
            </div>
          </section>
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

