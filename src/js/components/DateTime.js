// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor, isDescendant } from '../utils/DOM';
import Button from './Button';
import ClockIcon from './icons/base/Clock';
import CalendarIcon from './icons/base/Calendar';
import DateTimeDrop from './DateTimeDrop';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.DATE_TIME;
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
    this._onCloseDrop = this._onCloseDrop.bind(this);
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
    // Set up keyboard listeners appropriate to the current state.
    if (prevState.dropActive !== this.state.dropActive) {
      this._activation(this.state.dropActive);
    }

    if (this.state.dropActive) {
      this._drop.render(this._renderDrop());
    }

    if (this.state.cursor >= 0) {
      this.inputRef.setSelectionRange(this.state.cursor,this.state.cursor);
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
    const { format, onChange } = this.props;
    const value = event.target.value;
    if (value.length > 0) {
      const date = moment(value, format);
      // Only notify if the value looks valid
      if (date.isValid() && ! date.parsingFlags().charsLeftOver) {
        if (onChange) {
          onChange(value);
        }
      } else if (typeof this.props.value === 'string' &&
        value.length < this.props.value.length) {
        // or if the user is removing characters
        if (onChange) {
          onChange(value);
        }
      }
    } else if (onChange) {
      onChange(value);
    }
  }

  _notify (date) {
    if (this.props.onChange) {
      this.props.onChange(date);
    }
  }

  _onControlClick (event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dropActive) {
      this.setState({dropActive: false, cursor: -1});
    } else {
      this.setState({dropActive: true});
    }
  }

  _onForceClose () {
    this.setState({dropActive: false, cursor: -1});
  }

  _onOpen (event) {
    event.preventDefault();
    this.setState({dropActive: true});
  }

  _onClose (event) {
    const drop = document.getElementById(DATE_TIME_DROP);
    const isCalendarOnly = !TIME_REGEXP.test(this.props.format);
    if (! isDescendant(this.containerRef, event.target) &&
      ! isDescendant(drop, event.target) || isCalendarOnly) {
      this.setState({dropActive: false, cursor: -1});
    }
  }

  _onCloseDrop (event) {
    const drop = document.getElementById(DATE_TIME_DROP);
    if (! isDescendant(drop, event.target)) {
      this.setState({dropActive: false, cursor: -1});
    }
  }

  _onNext (event) {
    event.preventDefault();
    let date = this.state.current.clone();
    const scope = this._cursorScope();
    if ('a' === scope) {
      if (date.hours() < 12) {
        date.add(12, 'hours');
      }
    } else if ('m' === scope) {
      date.add(this.props.step, FORMATS[scope]);
    } else {
      date.add(1, FORMATS[scope]);
    }
    this.setState({ current: date }, this._notify(date));
  }

  _onPrevious (event) {
    event.preventDefault();
    let date = this.state.current.clone();
    const scope = this._cursorScope();
    if ('a' === scope) {
      if (date.hours() >= 12) {
        date.subtract(12, 'hours');
      }
    } else if ('m' === scope) {
      date.subtract(this.props.step, FORMATS[scope]);
    } else {
      date.subtract(1, FORMATS[scope]);
    }
    this.setState({ current: date }, this._notify(date));
  }

  _cursorScope () {
    const { format } = this.props;
    const input = this.inputRef;
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
    var listeners = {
      esc: this._onForceClose,
      tab: this._onCloseDrop,
      enter: this._onSelectDate,
      up: this._onPrevious,
      down: this._onNext
    };

    if (dropActive) {

      document.addEventListener('click', this._onClose);
      KeyboardAccelerators.startListeningToKeyboard(this, listeners);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.containerRef, `.${FORM_FIELD}`) ||
        this.containerRef;
      this._drop = Drop.add(control,
        this._renderDrop(), { align: {top: 'bottom', left: 'left'} });

    } else {

      document.removeEventListener('click', this._onClose);
      KeyboardAccelerators.stopListeningToKeyboard(this, listeners);

      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }
  }

  _renderDrop () {
    return (
      <DateTimeDrop format={this.props.format} value={this.state.current}
        step={this.props.step} onChange={this._notify} />
    );
  }

  render () {
    const { className, format, id, name } = this.props;
    const { dropActive } = this.state;
    let { value } = this.props;
    let classes = [CLASS_ROOT];
    if (dropActive) {
      classes.push(`${CLASS_ROOT}--active`);
    }
    if (className) {
      classes.push(className);
    }
    if (value instanceof Date) {
      value = moment(value).format(format);
    } else if (value && typeof value === 'object') {
      value = value.format(format);
    }
    const Icon = (TIME_REGEXP.test(format) ? ClockIcon : CalendarIcon);

    return (
      <div ref={(ref) => this.containerRef = ref} className={classes.join(' ')}>
        <input ref={(ref) => this.inputRef = ref} placeholder={format}
          className={`${CLASS_ROOT}__input`} id={id} name={name}
          value={value || ''} onChange={this._onInputChange} />
        <Button className={`${CLASS_ROOT}__control`} icon={<Icon />}
          onClick={this._onControlClick} />
      </div>
    );
  }

}

DateTime.propTypes = {
  format: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

DateTime.defaultProps = {
  format: 'M/D/YYYY h:mm a',
  step: 1
};
