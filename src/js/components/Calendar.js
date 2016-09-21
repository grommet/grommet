// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';
import Header from './Header';
import Title from './Title';
import Button from './Button';
import CalendarIcon from './icons/base/Calendar';
import LinkPreviousIcon from './icons/base/LinkPrevious';
import LinkNextIcon from './icons/base/LinkNext';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.CALENDAR;
const FORM_FIELD = CSSClassnames.FORM_FIELD;


export default class Calendar extends Component {

  constructor(props, context) {
    super(props, context);

    console.warn(
      'Calendar: component has been deprecated. Use DateTime instead.'
    );

    this._onInputChange = this._onInputChange.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onClickDay = this._onClickDay.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onNextDayOrMonth = this._onNextDayOrMonth.bind(this);
    this._onPreviousDayOrMonth = this._onPreviousDayOrMonth.bind(this);
    this._onNextWeek = this._onNextWeek.bind(this);
    this._onPreviousWeek = this._onPreviousWeek.bind(this);
    this._onSelectDate = this._onSelectDate.bind(this);

    this.state = this._stateFromProps(props);
    this.state.dropActive = false;
  }

  componentDidMount () {
    this._activation(this.state.dropActive);
  }

  componentWillReceiveProps (newProps) {
    const state = this._stateFromProps(newProps);
    this.setState(state);
  }

  componentDidUpdate (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.
    if (prevState.dropActive !== this.state.dropActive) {
      this._activation(this.state.dropActive);
    }

    if (this.state.dropActive) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    this._activation(false);
  }

  _onInputChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  _onOpen (event) {
    event.preventDefault();
    this.setState({dropActive: true});
  }

  _onClose () {
    this.setState({dropActive: false});
  }

  _onClickDay (date) {
    if (this.props.onChange) {
      this.props.onChange(moment(date).format('YYYY-MM-DD'));
    }
  }

  _onPrevious (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({
      reference: this.state.reference.subtract(1, 'month'),
      current: this.state.reference
    });
  }

  _onNext (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({
      reference: this.state.reference.add(1, 'month'),
      current: this.state.reference
    });
  }

  _onNextDayOrMonth (event) {
    const { current, reference } = this.state;

    if (event.shiftKey) {
      this._onNext(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      const nextDay = moment(current).add(1, 'days');

      if (! nextDay.isSame(reference, 'month')) {
        this.setState({reference: reference.add(1, 'month'), current: nextDay});
      } else {
        this.setState({current: nextDay});
      }
    }
  }

  _onPreviousDayOrMonth (event) {
    const { current, reference } = this.state;

    if (event.shiftKey) {
      this._onPrevious(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      const previousDay = moment(current).subtract(1, 'days');

      if (! previousDay.isSame(reference, 'month')) {
        this.setState({
          reference: reference.subtract(1, 'month'),
          current: previousDay
        });
      } else {
        this.setState({current: previousDay});
      }
    }
  }

  _onNextWeek (event) {
    event.preventDefault();
    event.stopPropagation();
    const { current, reference } = this.state;
    const nextWeek = moment(current).add(1, 'week');

    if (! nextWeek.isSame(reference, 'month')) {
      this.setState({reference: reference.add(1, 'month'), current: nextWeek});
    } else {
      this.setState({current: nextWeek});
    }
  }

  _onPreviousWeek (event) {
    event.preventDefault();
    event.stopPropagation();
    const { current, reference } = this.state;
    const previousWeek = moment(current).subtract(1, 'week');

    if (! previousWeek.isSame(reference, 'month')) {
      this.setState({
        reference: reference.subtract(1, 'month'),
        current: previousWeek
      });
    } else {
      this.setState({current: previousWeek});
    }
  }

  _onSelectDate (event) {
    event.preventDefault();
    event.stopPropagation();
    this._onClickDay(this.state.current);
    this._onClose();
  }

  _activation (dropActive) {

    const listeners = {
      esc: this._onClose,
      tab: this._onClose,
      right: this._onNextDayOrMonth,
      left: this._onPreviousDayOrMonth,
      down: this._onNextWeek,
      up: this._onPreviousWeek,
      enter: this._onSelectDate,
      space: this._onSelectDate
    };

    if (dropActive) {

      document.addEventListener('click', this._onClose);
      KeyboardAccelerators.startListeningToKeyboard(this, listeners);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.componentRef, `.${FORM_FIELD}`) ||
          this.componentRef;
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

  _stateFromProps (props) {
    const result = {
      current: null,
      reference: moment().startOf('day')
    };
    const date = moment(props.value);
    if (date.isValid()) {
      result.current = moment(date).startOf('day');
      result.reference = moment(date).startOf('day');
    }
    return result;
  }

  _renderDrop () {
    const { current, reference } = this.state;
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerCells = weekDays.map(function (day) {
      return <th key={day}>{day}</th>;
    });

    const start = moment(reference).startOf('month').startOf('week');
    const end = moment(reference).endOf('month').endOf('week');
    const date = moment(start);
    const rows = [];

    while (date.valueOf() <= end.valueOf()) {
      const days = [];
      for (var i = 0; i < 7; i += 1) {
        const classes = classnames(
          `${CLASS_ROOT}__day`,
          {
            [`${CLASS_ROOT}__day--active`]: current && date.isSame(current),
            [`${CLASS_ROOT}__day--other-month`]:
              !date.isSame(reference, 'month')
          }
        );
        days.push(
          <td key={date.valueOf()}>
            <div className={classes}
              onClick={this._onClickDay.bind(this, moment(date))}>
              {date.date()}
            </div>
          </td>
        );
        date.add(1, 'days');
      }
      rows.push(<tr key={date.valueOf()}>{days}</tr>);
    }

    return (
      <div id={`${CLASS_ROOT}-drop`} className={`${CLASS_ROOT}__drop`}
        onClick={this._onClose}>
        <Header justify="between">
          <Button
            className={`${CLASS_ROOT}__previous`}
            icon={
              <LinkPreviousIcon a11yTitle="calendar-previous-title"
                a11yTitleId="calendar-previous-title-id" />
            }
            onClick={this._onPrevious}
          />
          <Title className={`${CLASS_ROOT}__title`} responsive={false}>
            {reference.format('MMMM YYYY')}
          </Title>
          <Button
            className={`${CLASS_ROOT}__next`}
            icon={
              <LinkNextIcon a11yTitle="calendar-next-title"
                a11yTitleId="calendar-next-title-id" />
            }
            onClick={this._onNext}
          />
        </Header>
        <div className={`${CLASS_ROOT}__grid`}>
          <table>
            <thead>
              <tr>{headerCells}</tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render () {
    const {
      className,
      id,
      name,
      value,
      onChange, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--active`]: this.state.dropActive
      }
    );

    return (
      <div ref={ref => this.componentRef = ref} className={classes}>
        <input className={`${CLASS_ROOT}__input`}
          id={id} name={name} value={value} onChange={this._onInputChange}
          {...props} />
        <Button
          className={`${CLASS_ROOT}__control`}
          icon={
            <CalendarIcon
              a11yTitle="calendar-icon-title"
              a11yTitleId="calendar-icon-title-id"
            />
          }
          onClick={this._onOpen}
        />
      </div>
    );
  }

}

Calendar.propTypes = { // remove in 1.0, use DateTime
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

Calendar.defaultProps = {
  value: moment().format('YYYY-MM-DD')
};
