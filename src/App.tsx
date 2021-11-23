import React from 'react';
import {Logo} from "./icons/Logo";


export default class App extends React.Component<any, AppState> {
  render() {
    return (
      <div className={"flex items-center justify-center flex-col gap-y-4 bg-theme-secondary-dark h-screen"} >
        <Logo classList={"h-24 w-24"}/>
        <div className={"text-lg text-theme-secondary-light flex flex-col items-center"}>
          <span className={"block"}>Site under construction.</span>
          <span className={"block"}>Come back soon!</span>
        </div>
        <div className={"flex gap-x-4"}>

        </div>
      </div>
    );
  }
}

export interface AppState {
  siteReady: boolean
  menuActive: boolean
  darkMode: boolean
}

