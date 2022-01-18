import {Switch} from "../../buttons/Switch";
import React, {SyntheticEvent} from "react";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";
import BaseProps from "../../common/interface/BaseProps";

export class DarkModeToggle extends React.Component<DarkModeToggleProps> {
  static localStorageKey = 'darkMode'

  render() {
    if (this.props.singleIconMode) {
      return (
          <div className={"relative"} onClick={this.props.onChange}>
            <Moon width={this.props.singleIconDim} height={this.props.singleIconDim} className={`${ this.props.isDarkModeEnabled ? 'opacity-100' : '-translate-y-full opacity-0'} absolute transition-all duration-300 hover:text-theme-primary dark:text-white dark:hover:text-theme-primary select-none`} />
            <Sun width={this.props.singleIconDim} height={this.props.singleIconDim} className={`${ this.props.isDarkModeEnabled ? 'translate-y-full opacity-0' : 'opacity-100'} absolute transition-all duration-300 hover:text-theme-primary dark:text-white dark:hover:text-theme-primary select-none`} />
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