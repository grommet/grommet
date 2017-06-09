// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor, isDescendant } from '../utils/DOM';
import Button from './Button';
import ClockIcon from './icons/base/Clock';
import CalendarIcon from './icons/base/Calendar';
import DateTimeDrop from './DateTimeDrop';
import CSSClassnames from '../utils/CSSClassnames';
import Intl from '../utils/Intl';

const CLASS_ROOT = CSSClassnames.DATE_TIME;
const INPUT = CSSClassnames.INPUT;
const FORM_FIELD = CSSClassnames.FORM_FIELD;
const DATE_TIME_DROP = CSSClassnames.DATE_TIME_DROP;

const FORMATS = {
  M: 'months',
  D: 'days',
  Y: 'years',
  H: 'hours',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
};
const TIME_REGEXP = new RegExp('[hmsa]');

export default class DateTime extends Component {

  constructor(props, context) {
    super(props, context);

    this._onInputChange = this._onInputChange.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onForceClose = this._onForceClose.bind(this);
    this._onControlClick = this._onControlClick.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._cursorScope = this._cursorScope.bind(this);
    this._notify = this._notify.bind(this);

    this.state = this._stateFromProps(props);
    this.state.cursor = -1;
    this.state.dropActive = false;
  }

  componentDidMount () {
    this._activation(this.state.dropActive);
  }

  componentWillReceiveProps (newProps) {
    this.setState(this._stateFromProps(newProps));
  }

  componentDidUpdate (prevProps, prevState) {
    const { cursor, dropActive } = this.state;
    // Set up keyboard listeners appropriate to the current state.
    if (prevState.dropActive !== dropActive) {
      this._activation(dropActive);
    }

    if (dropActive) {
      this._drop.render(this._renderDrop());
    }

    if (cursor >= 0) {
      this._inputRef.setSelectionRange(cursor, cursor);
    }
  }

  componentWillUnmount () {
    this._activation(false);
  }

  _stateFromProps (props) {
    const { value, format } = props;
    let result = { current: undefined };
    const date = moment(value, format);
    if (date.isValid()) {
      result.current = date;
      result.textValue = undefined;
    } else {
      result.current = moment().startOf('hour').add(1, 'hour');
    }
    // figure out which scope the step should apply to
    if (format.indexOf('s') !== -1) {
      result.stepScope = 'second';
    } else if (format.indexOf('m') !== -1) {
      result.stepScope = 'minute';
    } else if (format.indexOf('h') !== -1) {
      result.stepScope = 'hour';
    }
    return result;
  }

  _onInputChange (event) {
    const { onChange } = this.props;
    const currentValue = event.target.value;
    // Always set textValue to what the user types.
    // If the user subsequently passes in a value property, we will
    // clear this textValue and use the new value.
    this.setState({ textValue: currentValue });
    if (onChange) {
      onChange(currentValue);
    }
  }

  _notify (date, checkClose) {
    const { format, onChange } = this.props;
    if (onChange) {
      onChange(date);
      if (checkClose && !TIME_REGEXP.test(format)) {
        // check to close the drop only if the user selected a day
        // and the format of the date does not include time
        this.setState({ dropActive: false, cursor: -1 });
      }
    }
  }

  _onControlClick (event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dropActive) {
      this.setState({ dropActive: false, cursor: -1 });
    } else {
      this.setState({ dropActive: true });
    }
  }

  _onForceClose () {
    this.setState({ dropActive: false, cursor: -1 });
  }

  _onOpen (event) {
    event.preventDefault();
    this.setState({ dropActive: true });
  }

  _onClose (event) {
    const dropElement = document.querySelector(`.${DATE_TIME_DROP}`);
    if (! isDescendant(this._containerRef, event.target) &&
      (! dropElement || ! isDescendant(dropElement, event.target))) {
      this.setState({ dropActive: false, cursor: -1 });
    }
  }

  _onNext (event) {
    if (this._inputRef === document.activeElement) {
      const { step } = this.props;
      const { current } = this.state;
      event.preventDefault();
      let date = current.clone();
      const scope = this._cursorScope();
      if ('a' === scope) {
        if (date.hours() < 12) {
          date.add(12, 'hours');
        }
      } else if ('m' === scope) {
        date.add(step, FORMATS[scope]);
      } else {
        date.add(1, FORMATS[scope]);
      }
      this.setState({ current: date }, this._notify(date));
    }
  }

  _onPrevious (event) {
    if (this._inputRef === document.activeElement) {
      const { step } = this.props;
      const { current } = this.state;
      event.preventDefault();
      let date = current.clone();
      const scope = this._cursorScope();
      if ('a' === scope) {
        if (date.hours() >= 12) {
          date.subtract(12, 'hours');
        }
      } else if ('m' === scope) {
        date.subtract(step, FORMATS[scope]);
      } else {
        date.subtract(1, FORMATS[scope]);
      }
      this.setState({ current: date }, this._notify(date));
    }
  }

  _cursorScope () {
    const { format } = this.props;
    const input = this._inputRef;
    const value = input.value;
    const end = input.selectionEnd;
    this.setState({ cursor: end });
    // Figure out which aspect of the date the cursor is on, so we know what
    // to change.
    const preDate = moment(value.slice(0, end+1), format);
    const formatTokens = format.split(/[^A-Za-z]/);
    const unusedTokens = preDate.parsingFlags().unusedTokens;
    let index = -1;
    while (formatTokens[index+1] !== unusedTokens[0]) {
      index += 1;
    }
    return formatTokens[index][0];
  }

  _activation (dropActive) {
    const { onDropChange } =  this.context;

    var listeners = {
      esc: this._onForceClose,
      up: this._onPrevious,
      down: this._onNext
    };

    if (dropActive) {

      document.addEventListener('click', this._onClose);
      KeyboardAccelerators.startListeningToKeyboard(this, listeners);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this._containerRef, `.${FORM_FIELD}`) ||
        this._containerRef;
      this._drop = new Drop(control,
        this._renderDrop(), {
          align: {top: 'bottom', left: 'left'},
          focusControl: true,
          context: this.context
        });

    } else {

      document.removeEventListener('click', this._onClose);
      KeyboardAccelerators.stopListeningToKeyboard(this, listeners);

      if (this._drop) {
        this._drop.remove();
        this._drop = undefined;
      }
    }

    if (onDropChange) {
      onDropChange(dropActive);
    }
  }

  _renderDrop () {
    const { format, step } = this.props;
    const { current } = this.state;
    return (
      <DateTimeDrop format={format} value={current}
        step={step} onChange={this._notify} />
    );
  }

  render () {
    const { className, format, value, ...props } = this.props;
    delete props.onChange;
    delete props.step;
    const { dropActive, textValue } = this.state;
    const { intl } = this.context;
    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--active`]: dropActive
      },
      className
    );

    let inputValue = textValue || value;
    if (value instanceof Date) {
      inputValue = moment(value).format(format);
    } else if (value && typeof value === 'object') {
      inputValue = value.format(format);
    }
    const Icon = (TIME_REGEXP.test(format) ? ClockIcon : CalendarIcon);

    const dateTimeIconMessage = Intl.getMessage(
      intl, 'Date Time Icon'
    );

    return (
      <div ref={(ref) => this._containerRef = ref} className={classes}>
        <input ref={(ref) => this._inputRef = ref} {...props}
          className={`${INPUT} ${CLASS_ROOT}__input`} placeholder={format}
          value={inputValue || ''} onChange={this._onInputChange} />
        <Button className={`${CLASS_ROOT}__control`} icon={<Icon />}
          a11yTitle={dateTimeIconMessage}
          onClick={this._onControlClick} />
      </div>
    );
  }

}

DateTime.contextTypes = {
  intl: PropTypes.object,
  onDropChange: PropTypes.func
};

DateTime.defaultProps = {
  format: 'M/D/YYYY h:mm a',
  step: 1
};

DateTime.propTypes = {
  format: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
