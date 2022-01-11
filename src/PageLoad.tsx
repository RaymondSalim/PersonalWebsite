import React from "react";
import {Logo} from "./icons/Logo";
import BaseProps from "./common/interface/BaseProps";

export class PageLoad extends React.Component<PageLoadProps, PageLoadState> {
  constructor(p: PageLoadProps | Readonly<PageLoadProps>) {
    super(p);
    this.state = {
      animationDone: false
    }
  }

  animationDone = () => {
    this.setState({
      animationDone: true
    })
  }

  render() {
    return (
      <div
        id="page_load"
        style={{
          zIndex: 5000
        }}
        className={`fixed flex justify-center items-center min-h-screen left-0 right-0 top-0 bg-theme-loader-light dark:bg-theme-loader-dark transform transition-transform duration-500 ${this.props.siteReady && this.state.animationDone ? '-translate-y-full' : ''}`}
      >
          <div>
            <Logo classList="h-28 w-28" wantAnimation={true} animationCallback={this.animationDone}/>
          </div>
      </div>
    );
  }
}

export interface PageLoadProps extends BaseProps {
  siteReady: boolean
}

export interface PageLoadState {
  animationDone: boolean
}