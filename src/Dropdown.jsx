import React, { Component } from "react";
import PropTypes from 'prop-types';
import DropdownItem from "./Components/DropdownItem";
import { createStyleObject } from './helper';
import './styles/Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  onBlur = e => {
    const target = e.nativeEvent.relatedTarget;
    if (!target) {
      this.setState({ open: false });
      return;
    }
    const classValue = target.classList.value;
    if(classValue.indexOf('dropdown') === -1) {
      this.setState({ open: false });
    }
  }

  onDropdownClick = e => {
    !this.props.disabled && this.setState(p => ({ open: !p.open}));
  }

  onOptionClicked = e => {
    this.props.setSelected(e);
    this.setState(p => ({ open: !p.open}));
  }

  renderOptions = () => {
    return this.props.options.map((option, index) =>{
      const selected = option.name === this.props.selectedOption;
      return <DropdownItem key={ option.name + index } selected={ selected } onOptionClicked={ this.onOptionClicked } option={ option } />;
    });
  }

  render() {
    const displayedValue = this.props.selectedOption || this.props.placeholder || '';
    const dropdownButtonClass = this.props.className ? `${this.props.className} dropdown-select` : 'dropdown-select'
    const displayedValueClass = !!this.props.selectedOption ? 'displayed-value' : 'displayed-value grey';
    const contentClass = this.state.open ? 'dropdown-content dropdown-content-open' : 'dropdown-content';
    const arrowClass = this.state.open ? 'dropdown-arrow up' : 'dropdown-arrow down';
    const listStyle = this.props.maxContentHeight ? { maxHeight: this.props.maxContentHeight, overflowY: 'scroll' } : {};

    return (
      <div className='dropdown' onBlur={ this.onBlur } style={ createStyleObject(this.props.width, this.props.height) }>
        <button className={ dropdownButtonClass } onClick={ this.onDropdownClick } disabled={ this.props.disabled } aria-label={ displayedValue }>
          <div className={ displayedValueClass }>{ displayedValue }</div>
          <div className={ arrowClass } />
        </button>
        <ul className={ contentClass } style={ listStyle }>{ this.renderOptions() }</ul>
      </div>
    );
  }
}

Dropdown.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  maxContentHeight: PropTypes.number,
};

export default Dropdown;
