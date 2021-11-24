import React from 'react';
import {Logo} from "./icons/Logo";
import {GitHub} from "./icons/GitHub";
import {Email} from "./icons/Email";


export default class App extends React.Component<any, AppState> {
  render() {
    return (
      <div className={"flex items-center justify-between flex-col bg-theme-secondary-dark h-screen"} >
        <div></div>
        <div className={"flex flex-col items-center gap-y-4"}>
          <Logo classList={"h-24 w-24"}/>
          <div className={"text-lg text-theme-secondary-light flex flex-col items-center"} style={{
            fontFamily: "Montserrat"
          }}>
            <span className={"block"}>Site under construction.</span>
            <span className={"block"}>Come back soon!</span>
          </div>
          <div className={"flex gap-x-4"}>
            <a href="https://github.com/RaymondSalim" target="_blank" rel="noreferrer noopener" className={"text-white hover:text-theme-primary-hover transition-all hover:scale-125"}>
              <GitHub/>
            </a>
            <a href="mailto:raymond@raymonds.dev" target="_blank" rel="noreferrer noopener" className={"text-white hover:text-theme-primary-hover transition-all hover:scale-125"}>
              <Email/>
            </a>
          </div>
        </div>
        <footer className={"text-sm text-theme-secondary-light "}>
          <div>
            <span>Icons by </span>
            <a target="_blank" rel="noreferrer noopener" href="https://colebemis.com/" className={"text-white hover:text-theme-primary-hover"}>Cole Bemis</a>
          </div>
        </footer>
      </div>
    );
  }
}

export interface AppState {
  siteReady: boolean
  menuActive: boolean
  darkMode: boolean
}

