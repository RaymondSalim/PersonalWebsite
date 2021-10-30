import React, {SyntheticEvent} from "react";
import './Hamburger.css'

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
        onClick={this.handleClick}
        className={`hamburger hamburger--spring h-full ${this.props.class} ${this.props.isActive ? 'is-active' : ''}`}
        style={{outline: 'none'}}
        type="button">
      <span className={"hamburger-box"}>
        <span className={"hamburger-inner"} />
      </span>
  </button>
    )
  }
}

export interface HamburgerProps {
  class?: string
  isActive: boolean
  onclick: () => void
}