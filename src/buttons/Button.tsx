import React from "react";
import BaseProps from "../common/interface/BaseProps";
import './Button.css'

export class Button extends React.Component<ButtonProps> {
    constructor(prop: ButtonProps) {
        super(prop);
    }
    render() {
        return (
            <a
                href={this.props.href}
                onClick={this.props.onclick}
                className={`btn ${this.props.className}`}
            >{this.props.text}</a>
        );
    }
}

export interface ButtonProps extends BaseProps {
    href?:      string
    onclick?:   () => void
    text:       string
}