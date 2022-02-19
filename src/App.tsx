import React, {SyntheticEvent} from 'react';
import {NavbarMobileProps} from "./navigation/navbar/mobile/NavBar";
import {PageLoad} from "./PageLoad";
import {getItemFromLocalStorage, setItemInLocalStorage} from "./util/LocalStorage";
import {DarkModeToggle} from "./util/darkmode/DarkModeToggle";
import {Header} from "./navigation/Header";
import {Button} from "./buttons/Button";
import {Gopher} from "./icons/Gopher";
import {Typescript} from "./icons/Typescript";
import {Jenkins} from "./icons/Jenkins";
import {Python} from "./icons/Python";
import {Kotlin} from "./icons/Kotlin";
import {Java} from "./icons/Java";
import {PostgreSQL} from "./icons/PostgreSQL";
import {HTML} from "./icons/HTML";
import {Skill} from "./icons/Skill";


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

    let skills: {icon: JSX.Element, label: string, padding: string}[] = [
      {"icon": <Gopher/>, label: "Gopher", "padding": "p-4"},
      {"icon": <Typescript/>, label: "Typescript", "padding": "p-5"},
      {"icon": <Python/>, label: "Python", "padding": "p-4"},
      {"icon": <Kotlin/>, label: "Kotlin", "padding": "p-5"},
      {"icon": <Java/>, label: "Java", "padding": "p-4"},
      {"icon": <PostgreSQL/>, label: "PostgreSQL", "padding": "p-5"},
      {"icon": <HTML/>, label: "HTML", "padding": "p-5"},
      {"icon": <Jenkins/>, label: "Jenkins", "padding": "p-4"},
    ]
    return (
        <div className={"antialiased relative bg-theme-secondary-light dark:bg-theme-secondary-dark"} >
          <PageLoad siteReady={this.state.siteReady} />
          <Header navBarMobileProps={navbarMobileProps}/>
          <main className={`transition-all ease-in duration-150`}>
            <section id="home" >
              <div id="home-content" className={"content"}>
                <h1>Hi, my<br/>name is <span><strong>Raymond</strong></span>.</h1>
                <p>I'm a software engineer specializing in backend development.</p>
                <Button text={"Hire me!"} className={"px-8 py-4 mt-4"} href={"#contact"}/>
              </div>
            </section>
            {/*Using div as applying filter to the main tag will cause position:fixed element to be relative to the main tag (why???)*/}
            {/*See https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed*/}
            <div id={"menu-blur-layer"} className={`${this.state.menuActive ? '-translate-x-full' : ''}`}/>
            <section id="about-me">
              {/*TODO! fix w-screen overlapping with scrollbar, causing it to overflow*/}
              <div id={"section-curve-start"}>
                <svg
                    className={"fill-current w-screen"}
                    viewBox="0 0 1440 145.68176"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M 0,132.29692 84.485809,105.64055 C 190.92453,72.057753 239.56437,71.31983 360,90 486.54269,109.20909 660,43.000003 780,53.300003 c 120,10.7 240,42.7 360,37.4 C 1260,85.000003 1320,50 1380,21.3 L 1440,0 V 145.68176 H 1380 1080 720 360 60 0 Z"                />
                </svg>
              </div>
              <div id={"about-me-content"} className={"content"}>
                <h2>About me</h2>
                <div id={"about-me-grid"}>
                  <div className={"row-start-1 md:col-start-1"}>
                    <div className={"multiple-p"}>
                      <p>I am passionate about creating software that improves and simplifies lives of those around me. My interest in software development started back in 2019 when I stumbled upon a youtube tutorial on building an android application.</p>
                      {/*TODO! Replace company name with links*/}
                      <p className={"after:content-none md:after:p-after"}>Fast forward to today, I have developed software for clients ranging from individuals to large enterprise corporations such as Tokopedia, Kalbe Farma, and Mandiri.</p>
                    </div>
                  </div>
                  <div className={"-mt-10 md:mt-0 row-start-2 md:row-start-1 md:col-start-2"}>
                    <p className={"before:content-none md:before:p-before"}>When I am not coding, you can find me doing any of the following:</p>
                    <ul className={"list-disc list-inside mt-8 ml-2 marker:text-theme-primary"}>
                      <li>Badminton</li>
                      <li>Ultimate Frisbee</li>
                      <li>Watching/playing video games</li>
                      <li>Brainstorming the next billion dollar startup idea (haha..)</li>
                    </ul>
                  </div>
                  <div className="row-start-3 md:row-start-2 md:col-span-full">
                    <p>Here are a few technologies I've been working with recently:</p>
                    <div className={"skills-flex-container"}>
                      {/*TODO! On mobile scroll animation*/}
                      {skills.map(v => <Skill label={v.label} icon={v.icon} iconClassName={v.padding}/> )}
                    </div>
                  </div>
                </div>
              </div>
              <div id="section-curve-end">
                <svg
                    className={"fill-current w-screen"}
                    viewBox="0 0 1440 197.57188"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="m 0,197.57189 34.3,-32 c 34.3,-32 102.7,-96.000002 171.7,-96.000002 68.3,0 137,64.000002 205,74.700002 69,10.3 138,-31.7 206,-64.000002 68.7,-31.7 137,-53.7 206,-37.4 68.4,15.7 137,69.700002 206,58.700002 94.4653,-6.347816 143.7223,-45.494867 220.5845,-69.268819 C 1315.9249,14.100715 1376.1797,14.46226 1440,14.593227 V 0 H 1405.7 1234 1029 823 617 411 206 34 0 Z"
                  />
                </svg>
              </div>
            </section>
            <footer>
              <div>
                <span>Icons by </span>
                <a href="https://colebemis.com/" target={"_blank"}>Cole Bemis</a>
                <span>, </span>
                <a href=" https://icons.grommet.io/" target={"_blank"}>grommet-icons</a>
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

