import React from "react";
import {Icon} from "./Icon";

export class PageLoad extends React.Component<PageLoadProps, PageLoadState> {
  constructor(p: PageLoadProps | Readonly<PageLoadProps>) {
    super(p);
    this.state = {
      animationDone: false
    }
  }

  animationDone = () => {
    console.log("animationDone() called")
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
        className={`absolute flex justify-center items-center min-h-screen left-0 right-0 top-0 bg-body-light dark:bg-body-dark transform transition-transform duration-500 ${this.props.siteReady && this.state.animationDone ? '-translate-y-full' : ''}`}
      >
          <div>
            <Icon class="h-28 w-28" wantAnimation={true} animationCallback={this.animationDone}/>
          </div>
      </div>
    );
  }
}

export interface PageLoadProps {
  siteReady: boolean
}

export interface PageLoadState {
  animationDone: boolean
}