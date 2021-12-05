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
        aria-label="Menu"
        onClick={this.handleClick} // Using custom function for future uses
        className={`h-full z-40 flex items-center relative ${this.props.class ?? ''} ${this.props.isActive ? 'active' : 'inactive'}`}
        style={{outline: 'none'}}
        type="button">
        <div className="burger-container">
          <div className="burger">
            <div/>
          </div>
        </div>
  </button>
    )
  }
}

export interface HamburgerProps extends BaseProps {
  class?: string
  isActive: boolean
  onclick: () => void
}