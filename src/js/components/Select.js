// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';
import Button from './Button';
import Search from './Search';
import CaretDownIcon from './icons/base/CaretDown';
// import SearchIcon from './icons/base/Search';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SELECT;
const INPUT = CSSClassnames.INPUT;
const FORM_FIELD = CSSClassnames.FORM_FIELD;

export default class Select extends Component {

  constructor(props, context) {
    super(props, context);

    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onNextOption = this._onNextOption.bind(this);
    this._onPreviousOption = this._onPreviousOption.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onClickOption = this._onClickOption.bind(this);

    this.state = {
      activeOptionIndex: -1,
      dropActive: false,
      defaultValue: props.defaultValue,
      searchText: '',
      value: props.value
    };
  }

  componentDidUpdate (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.

    const activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousOption,
      down: this._onNextOption,
      enter: this._onEnter
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this,
        activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this,
        activeKeyboardHandlers);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.componentRef, FORM_FIELD) || this.componentRef;
      this._drop = Drop.add(control,
        this._renderDrop(), { align: {top: 'bottom', left: 'left'} });
    } else if (this.state.dropActive && prevState.dropActive) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._drop) {
      this._drop.remove();
    }
  }

  _onSearchChange (event) {
    this.setState({
      activeOptionIndex: -1,
      dropActive: true,
      searchText: event.target.value
    });
    if (this.props.onSearch) {
      this.props.onSearch(event);
    }
  }

  _onAddDrop (event) {
    const { options, value } = this.props;
    event.preventDefault();
    // Get values of options, so we can highlight selected option
    if (options) {
      const optionValues = options.map((option) => {
        if (typeof option === 'object') {
          return option.value;
        } else {
          return option;
        }
      });
      const activeOptionIndex = optionValues.indexOf(value);
      this.setState({
        dropActive: true,
        activeOptionIndex: activeOptionIndex
      });
    }
  }

  _onRemoveDrop () {
    this.setState({dropActive: false});
  }

  _onNextOption () {
    let index = this.state.activeOptionIndex;
    index = Math.min(index + 1, this.props.options.length - 1);
    this.setState({activeOptionIndex: index});
  }

  _onPreviousOption () {
    let index = this.state.activeOptionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeOptionIndex: index});
  }

  _onEnter (event) {
    const { onChange, options } = this.props;
    const { activeOptionIndex } = this.state;
    this.setState({dropActive: false});
    if (activeOptionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      let option = options[activeOptionIndex];
      this.setState({value: option});
      if (onChange) {
        onChange({target: this.inputRef, option: option});
      }
    }
  }

  _onClickOption (option) {
    this.setState({value: option, dropActive: false});
    if (this.props.onChange) {
      this.props.onChange({target: this.inputRef, option: option});
    }
  }

  _renderLabel (option) {
    if (typeof option === 'object') {
      return option.label || option.value;
    } else {
      return option;
    }
  }

  _renderDrop () {
    const { onSearch, placeHolder, options } = this.props;
    const { activeOptionIndex, searchText } = this.state;
    let search;
    if (onSearch) {
      search = (
        <Search className={`${CLASS_ROOT}__search`}
          inline={true} fill={true} responsive={false} pad="medium"
          placeHolder={placeHolder} initialFocus={true} value={searchText}
          onDOMChange={this._onSearchChange} />
      );
    }

    let items;
    if (options) {
      items = options.map((option, index) => {
        let classes = classnames(
          {
            [`${CLASS_ROOT}__option`]: true,
            [`${CLASS_ROOT}__option--active`]:
              index === activeOptionIndex
          }
        );
        return (
          <li key={index}
            className={classes}
            onClick={this._onClickOption.bind(this, option)}>
            {this._renderLabel(option)}
          </li>
        );
      });
    }

    return (
      <div className={`${CLASS_ROOT}__drop`}>
        {search}
        <ol className={`${CLASS_ROOT}__options`}
          onClick={this._onRemoveDrop}>
          {items}
        </ol>
      </div>
    );
  }

  render () {
    const { className, value } = this.props;
    const { active } = this.state;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: active
      },
      className
    );

    return (
      <div ref={ref => this.componentRef = ref} className={classes}
        onClick={this._onAddDrop}>
        <input className={`${INPUT} ${CLASS_ROOT}__input`}
          value={this._renderLabel(value)} disabled={true} />
        <Button className={`${CLASS_ROOT}__control`} icon={<CaretDownIcon />}
          onClick={this._onAddDrop} />
      </div>
    );
  }

}

Select.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.any
      }),
      PropTypes.string
    ])
  ),
  value: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ])
};
