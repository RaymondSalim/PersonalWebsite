import React, {SyntheticEvent} from "react";
import './Hamburger.css'
import BaseProps from "../../common/interface/BaseProps";

export class Hamburger extends React.Component<HamburgerProps> {
  constructor(props: HamburgerProps | Readonly<HamburgerProps>) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e: SyntheticEvent) {
    e.preventDefault();
    this.props.onclick()
  }
  render() {
    return (
      <button
        onClick={this.handleClick} // Using custom function for future uses
        className={`hamburger hamburger--spring h-full z-40 ${this.props.class ?? ''} ${this.props.isActive ? 'is-active' : ''}`}
        style={{outline: 'none'}}
        type="button">
      <span className={"hamburger-box"}>
        <span className={"hamburger-inner"} />
      </span>
  </button>
    )
  }
}

export interface HamburgerProps extends BaseProps {
  class?: string
  isActive: boolean
  onclick: () => void
}