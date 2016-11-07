// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';
import Button from './Button';
import CheckBox from './CheckBox';
import RadioButton from './RadioButton';
import Search from './Search';
import CaretDownIcon from './icons/base/CaretDown';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';

const CLASS_ROOT = CSSClassnames.SELECT;
const INPUT = CSSClassnames.INPUT;
const FORM_FIELD = CSSClassnames.FORM_FIELD;

export default class Select extends Component {

  constructor(props, context) {
    super(props, context);

    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onForceClose = this._onForceClose.bind(this);
    this._onSearchChange = this._onSearchChange.bind(this);
    this._onNextOption = this._onNextOption.bind(this);
    this._onPreviousOption = this._onPreviousOption.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._stopPropagation = this._stopPropagation.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._announceOptions = this._announceOptions.bind(this);

    this.state = {
      announceChange: false,
      activeOptionIndex: -1,
      dropActive: false,
      searchText: '',
      value: this._normalizeValue(props, {})
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasOwnProperty('value')) {
      this.setState({ value: this._normalizeValue(nextProps, this.state) });
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { inline, options } = this.props;
    const { announceChange, dropActive } = this.state;
    const { intl } = this.context;

    // Set up keyboard listeners appropriate to the current state.
    let activeKeyboardHandlers = {
      up: this._onPreviousOption,
      down: this._onNextOption,
      enter: this._onEnter,
      left: this._stopPropagation,
      right: this._stopPropagation
    };

    if (! inline) {
      activeKeyboardHandlers.esc = this._onForceClose;
      activeKeyboardHandlers.tab = this._onForceClose;
    }

    // the order here is important, need to turn off keys before turning on
    if (! dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this,
        activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = undefined;
      }
    }

    if ((inline && ! prevProps.inline) ||
      (dropActive && ! prevState.dropActive)) {

      if (! inline) {
        document.addEventListener('click', this._onRemoveDrop);
      }

      KeyboardAccelerators.startListeningToKeyboard(this,
        activeKeyboardHandlers);

      if (! inline) {
        // If this is inside a FormField, place the drop in reference to it.
        const control =
          findAncestor(this.componentRef, FORM_FIELD) || this.componentRef;
        this._drop = Drop.add(control,
          this._renderOptions(`${CLASS_ROOT}__drop`), {
            align: {top: 'bottom', left: 'left'},
            context: this.context
          });
      }

      if (this._searchRef) {
        this._searchRef.focus();
        this._searchRef._inputRef.select();
      }

    } else if (dropActive && prevState.dropActive) {
      this._drop.render(this._renderOptions(`${CLASS_ROOT}__drop`));
    }

    if (announceChange && options) {
      const matchResultsMessage = Intl.getMessage(
        intl, 'Match Results', {
          count: options.length
        }
      );
      let navigationHelpMessage = '';
      if (options.length) {
        navigationHelpMessage = `(${Intl.getMessage(intl, 'Navigation Help')})`;
      }
      announce(`${matchResultsMessage} ${navigationHelpMessage}`);
      this.setState({ announceChange: false });
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._drop) {
      this._drop.remove();
    }
  }

  _normalizeValue (props, state) {
    const { multiple, value } = props;
    let normalizedValue = value;
    if (multiple) {
      if (value) {
        if (! Array.isArray(value)) {
          normalizedValue = [value];
        }
      } else {
        normalizedValue = [];
      }
    }
    return normalizedValue;
  }

  _announceOptions (index) {
    const { intl } = this.context;
    const labelMessage = this._renderLabel(this.props.options[index], true);
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${labelMessage} ${enterSelectMessage}`);
  }

  _onInputKeyDown (event) {
    const up = 38;
    const down = 40;
    if (event.keyCode === up || event.keyCode === down) {
      // stop the input to move the cursor when options are present
      event.preventDefault();
    }
  }

  _onSearchChange (event) {
    const { inline } = this.props;
    this.setState({
      announceChange: true,
      activeOptionIndex: -1,
      dropActive: ! inline,
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

  _onRemoveDrop (event) {
    if (!this._searchRef ||
      !findDOMNode(this._searchRef).contains(event.target)) {
      this.setState({dropActive: false});
    }
  }

  _onForceClose () {
    this.setState({dropActive: false});
  }

  _onNextOption (event) {
    event.preventDefault();
    let index = this.state.activeOptionIndex;
    index = Math.min(index + 1, this.props.options.length - 1);
    this.setState({activeOptionIndex: index},
      this._announceOptions.bind(this, index));
  }

  _onPreviousOption (event) {
    event.preventDefault();
    let index = this.state.activeOptionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeOptionIndex: index},
      this._announceOptions.bind(this, index));
  }

  _onEnter (event) {
    const { onChange, options } = this.props;
    const { activeOptionIndex } = this.state;
    const { intl } = this.context;
    this.setState({dropActive: false});
    if (activeOptionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      let option = options[activeOptionIndex];
      this.setState({value: option}, () => {
        const optionMessage = this._renderLabel(option, true);
        const selectedMessage = Intl.getMessage(intl, 'Selected');
        announce(`${optionMessage} ${selectedMessage}`);
      });
      if (onChange) {
        onChange({target: this.inputRef, option: option});
      }
    }
  }

  _stopPropagation () {
    if (findDOMNode(this._searchRef).contains(document.activeElement)) {
      return true;
    }
  }

  _onClickOption (option) {
    const { multiple } = this.props;
    const { value } = this.state;
    let nextValue;
    if (multiple) {
      nextValue = value.slice(0);
      let index;
      for (index = 0; index < nextValue.length; index += 1) {
        if (this._valueEqualsOption(nextValue[index], option)) {
          break;
        }
      }
      if (index < nextValue.length) {
        // already existing, remove
        nextValue.splice(index, 1);
      } else {
        // not there, add
        nextValue.push(option);
      }
    } else {
      nextValue = option;
    }
    this.setState({ value: nextValue, dropActive: false });
    if (this.props.onChange) {
      this.props.onChange({
        target: this.inputRef, option: option, value: nextValue
      });
    }
  }

  _renderLabel (option, announce) {
    if (typeof option === 'object') {
      // revert for announce as label is often a complex object
      return announce ? option.value || option.label || '' :
        option.label || option.value || '';
    } else {
      return option || '';
    }
  }

  _valueEqualsOption (value, option) {
    let result = false;
    if (typeof value === 'object') {
      if (typeof option === 'object') {
        result = (value.value === option.value);
      } else {
        result = (value.value === option);
      }
    } else {
      if (typeof option === 'object') {
        result = (value === option.value);
      } else {
        result = (value === option);
      }
    }
    return result;
  }

  _optionSelected (option, value) {
    let result = false;
    if (value && Array.isArray(value)) {
      result = value.some(val => this._valueEqualsOption(val, option));
    } else {
      result = this._valueEqualsOption(value, option);
    }
    return result;
  }

  _renderOptions (className, restProps={}) {
    const {
      id, inline, multiple, options, onSearch, placeHolder, value
    } = this.props;
    const { activeOptionIndex, searchText } = this.state;

    let search;
    if (onSearch) {
      search = (
        <Search className={`${CLASS_ROOT}__search`}
          ref={(ref) => this._searchRef = ref}
          inline={true} fill={true} responsive={false} pad="medium"
          placeHolder={placeHolder} value={searchText}
          onDOMChange={this._onSearchChange}
          onKeyDown={this._onInputKeyDown} />
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

        let content = this._renderLabel(option);
        if (option.icon) {
          content = (
            <span>{option.icon} {content}</span>
          );
        }

        let itemOnClick;
        if (inline) {
          const itemId = `${id}-${option.value || option}`;
          const checked = this._optionSelected(option, value);
          const Type = (multiple ? CheckBox : RadioButton );
          content = (
            <Type key={itemId} id={itemId} label={content} checked={checked}
              onChange={this._onClickOption.bind(this, option)} />
          );
        } else {
          itemOnClick = this._onClickOption.bind(this, option);
        }

        return (
          <li key={index} className={classes} onClick={itemOnClick}>
            {content}
          </li>
        );
      });
    }

    let onClick;
    if (! inline) {
      onClick = this._onRemoveDrop;
    }

    return (
      <div {...restProps} className={className}>
        {search}
        <ol className={`${CLASS_ROOT}__options`} onClick={onClick}>
          {items}
        </ol>
      </div>
    );
  }

  render () {
    const { className, inline, value } = this.props;
    const { active } = this.state;
    const { intl } = this.context;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: active,
        [`${CLASS_ROOT}--inline`]: inline
      },
      className
    );
    const restProps = Props.omit(this.props, Object.keys(Select.propTypes));

    if (inline) {
      return this._renderOptions(classes, restProps);
    } else {
      return (
        <div ref={ref => this.componentRef = ref} className={classes}
          onClick={this._onAddDrop}>
          <input {...restProps} ref={ref => this.inputRef = ref}
            className={`${INPUT} ${CLASS_ROOT}__input`}
            disabled={true} value={this._renderLabel(value)} />
          <Button className={`${CLASS_ROOT}__control`}
            a11yTitle={Intl.getMessage(intl, 'Select Icon')}
            icon={<CaretDownIcon />} onClick={this._onAddDrop} />
        </div>
      );
    }

    return (
      <div ref={ref => this.componentRef = ref} className={classes}
        onClick={onClick}>
        <input {...restProps} ref={ref => this.inputRef = ref}
          className={`${INPUT} ${CLASS_ROOT}__input`}
          disabled={true} value={this._renderLabel(value)} />
        {button}
        {drop}
      </div>
    );
  }

}

const valueType = PropTypes.oneOfType([
  PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.any
  }),
  PropTypes.string
]);

Select.propTypes = {
  inline: PropTypes.bool,
  multiple: PropTypes.bool,
  onSearch: PropTypes.func,
  onChange: PropTypes.func, // (value(s))
  placeHolder: PropTypes.string,
  options: PropTypes.arrayOf(valueType).isRequired,
  value: PropTypes.oneOfType([valueType, PropTypes.arrayOf(valueType)])
};

Select.contextTypes = {
  intl: PropTypes.object
};
