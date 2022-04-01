import React from 'react';
import { Logo } from './icons/Logo';
import BaseProps from './common/interface/BaseProps';
import { wait } from './util/common';

export class PageLoad extends React.Component<PageLoadProps, PageLoadState> {
  private readonly logoRef: React.RefObject<Logo>;

  constructor(p: PageLoadProps | Readonly<PageLoadProps>) {
    super(p);
    this.state = {
      pageDestroyed: false,
      animationDone: false,
    };
    this.logoRef = React.createRef();
  }

  animationDone = () => {
    wait(500).then(() => {
      this.setState({
        animationDone: true,
      });
      this.props.togglePageOverflow(false);
    }).then(() => {
      wait(650).then(() => {
        this.setState({
          pageDestroyed: true,
        });
      });
    });
  };

  render() {
    if (this.state.pageDestroyed) {
      return <></>;
    }
    return (
      <div
        id="page_load"
        style={{
          zIndex: 5000,
        }}
        className={`fixed flex justify-center items-center min-h-screen left-0 right-0 top-0 bg-theme-loader-light dark:bg-theme-loader-dark transform transition-transform duration-500 ${this.props.siteReady && this.state.animationDone ? '-translate-y-full' : ''}`}
      >
        <div>
          <Logo id="load_logo" className="h-28 w-28" wantAnimation={true} animationCallback={this.animationDone}/>
        </div>
      </div>
    );
  }
}

export interface PageLoadProps extends BaseProps {
  siteReady: boolean
  togglePageOverflow: (force?: boolean) => void
}

export interface PageLoadState {
  animationDone: boolean
  pageDestroyed: boolean
}
