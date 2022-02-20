import {Switch} from "../../buttons/Switch";
import React, {SyntheticEvent} from "react";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import BaseProps from "../../common/interface/BaseProps";

export class DarkModeToggle extends React.Component<DarkModeToggleProps> {
  static localStorageKey = 'darkMode'

  handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key.trim() || e.code
    if (key == "Space" || key == "Enter") {
      e.preventDefault();
      this.props.onChange(e)
    }
  }

  render() {
    if (this.props.singleIconMode) {
      return (
          <div onKeyDown={this.handleKeyPress} tabIndex={0} className={`relative focus:text-theme-primary dark:focus:text-theme-primary focus:ring-0 hover:text-theme-primary dark:text-white dark:hover:text-theme-primary select-none`} onClick={this.props.onChange}>
            <Moon width={this.props.singleIconDim} height={this.props.singleIconDim} className={`${ this.props.isDarkModeEnabled ? 'opacity-100' : '-translate-y-full opacity-0'} absolute transition-all duration-300 text-inherit`} />
            <Sun width={this.props.singleIconDim} height={this.props.singleIconDim} className={`${ this.props.isDarkModeEnabled ? 'translate-y-full opacity-0' : 'opacity-100'} absolute transition-all duration-300 text-inherit`} />
          </div>
      )
    }

    return (
      <Switch
        isChecked={this.props.isDarkModeEnabled}
        leftIcon={(<Sun className={`mr-5 ${ !this.props.isDarkModeEnabled ? 'text-theme-primary' : 'text-white'}`} />)}
        rightIcon={(<Moon className={`ml-5 ${ this.props.isDarkModeEnabled ? 'text-theme-primary' : 'text-black'}`} />)}
        onChange={this.props.onChange}
        dimension={{}}
      />
    );
  }
}

export interface DarkModeToggleProps extends BaseProps {
  singleIconMode: boolean
  singleIconDim?: number
  isDarkModeEnabled: boolean
  onChange(e: SyntheticEvent): void
}