import {Switch} from "./buttons/Switch";
import React, {SyntheticEvent} from "react";
import Sun from "./icons/Sun";
import Moon from "./icons/Moon";
import BaseProps from "./common/interface/BaseProps";

export class DarkModeToggle extends React.Component<DarkModeToggleProps> {
  static localStorageKey = 'darkMode'

  render() {
    return (
      <Switch
        isChecked={this.props.initialState}
        leftIcon={(<Sun classList={`mr-5 ${ !this.props.initialState ? 'text-theme-primary' : 'text-white'}`} darkMode={this.props.initialState}/>)}
        rightIcon={(<Moon classList={`ml-5 ${ this.props.initialState ? 'text-theme-primary' : 'text-black'}`} darkMode={this.props.initialState}/>)}
        onChange={this.props.onChange}
        dimension={{}}
      />
    );
  }
}

export interface DarkModeToggleProps extends BaseProps {
  initialState: boolean
  onChange(e: SyntheticEvent): void
}