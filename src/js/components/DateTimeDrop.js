// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Box from './Box';
import Header from './Header';
import Title from './Title';
import Button from './Button';
import LinkPreviousIcon from './icons/base/LinkPrevious';
import LinkNextIcon from './icons/base/LinkNext';
import AddIcon from './icons/base/Add';
import SubtractIcon from './icons/base/Subtract';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.DATE_TIME_DROP;
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_REGEXP = new RegExp('[MDY]');
const TIME_REGEXP = new RegExp('[hHmsa]');

export default class DateTimeDrop extends Component {

  constructor(props) {
    super(props);

    this._onDay = this._onDay.bind(this);
    this._onToday = this._onToday.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onNext = this._onNext.bind(this);

    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (nextProps) {
    const state = this._stateFromProps(nextProps);
    this.setState(state);
  }

  _stateFromProps (props) {
    const { format } = props;
    let result = {};
    const value = moment(props.value);
    if (value.isValid()) {
      result.value = value;
      result.timeOfDay = {
        hours: value.hours(),
        minutes: value.minutes(),
        seconds: value.seconds()
      };
    } else {
      result.value = moment();
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

  _onDay (date) {
    const { format } = this.props;
    this.props.onChange(date.format(format));
  }

  _onToday () {
    const { format } = this.props;
    const today = moment().startOf('day').add(this.state.timeOfDay);
    this.setState({ value: today });
    this.props.onChange(today.format(format));
  }

  _onPrevious (scope) {
    const { format } = this.props;
    let delta = (scope === this.state.stepScope ? this.props.step : 1);
    if (scope === 'ampm') {
      delta = 12;
      scope = 'hours';
    }
    const value = moment(this.state.value).subtract(delta, scope);
    this.setState({ value: value });
    this.props.onChange(value.format(format));
  }

  _onNext (scope) {
    const { format } = this.props;
    let delta = (scope === this.state.stepScope ? this.props.step : 1);
    if (scope === 'ampm') {
      delta = 12;
      scope = 'hours';
    }
    const value = moment(this.state.value).add(delta, scope);
    this.setState({ value: value });
    this.props.onChange(value.format(format));
  }

  _renderDate () {
    const { value, timeOfDay } = this.state;

    const headerCells = WEEK_DAYS.map(function (day) {
      return <th key={day}>{day}</th>;
    });

    const start = moment(value).startOf('month').startOf('week').add(timeOfDay);
    const end = moment(value).endOf('month').endOf('week').add(timeOfDay);
    let date = moment(start);
    let rows = [];

    while (date.valueOf() <= end.valueOf()) {
      let days = [];
      for (let i = 0; i < 7; i += 1) {
        const classes = [CLASS_ROOT + "__day"];
        if (date.isSame(value, 'day')) {
          classes.push(CLASS_ROOT + "__day--active");
        }
        if (! date.isSame(value, 'month')) {
          classes.push(CLASS_ROOT + "__day--other-month");
        }
        days.push(
          <td key={date.valueOf()}>
            <div className={classes.join(' ')}
              onClick={this._onDay.bind(this, moment(date))}>
              {date.date()}
            </div>
          </td>
        );
        date.add(1, 'days');
      }
      rows.push(<tr key={date.valueOf()}>{days}</tr>);
    }

    return [
      <Header key="header" justify="between" colorIndex="neutral-1">
        <Button className={CLASS_ROOT + "__previous"} icon={<LinkPreviousIcon />}
          onClick={this._onPrevious.bind(this, 'month')} />
        <Title className={CLASS_ROOT + "__title"} responsive={false}>
          {value.format('MMMM YYYY')}
        </Title>
        <Button className={CLASS_ROOT + "__next"} icon={<LinkNextIcon />}
          onClick={this._onNext.bind(this, 'month')} />
      </Header>,
      <div key="grid" className={CLASS_ROOT + "__grid"}>
        <table>
          <thead>
            <tr>{headerCells}</tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>,
      <Box key="today" pad={{vertical: 'small'}}>
        <Button className={CLASS_ROOT + "__today"} label="Today"
          onClick={this._onToday} />
      </Box>
    ];
  }

  _renderTime () {
    const { format } = this.props;
    const { value } = this.state;
    let elements = [];
    if (format.indexOf('h') !== -1) {
      elements.push(
        <Box key="hour" align="center">
          <Button icon={<SubtractIcon />}
            onClick={this._onPrevious.bind(this, 'hour')} />
          {value.format('h')}
          <Button icon={<AddIcon />}
            onClick={this._onNext.bind(this, 'hour')} />
        </Box>
      );
    } else if (format.indexOf('H') !== -1) {
      elements.push(
        <Box key="hour" align="center">
          <Button icon={<SubtractIcon />}
            onClick={this._onPrevious.bind(this, 'hour')} />
          {value.format('H')}
          <Button icon={<AddIcon />}
            onClick={this._onNext.bind(this, 'hour')} />
        </Box>
      );
    }
    if (format.indexOf('m') !== -1) {
      elements.push(
        <Box key="minute" align="center">
          <Button icon={<SubtractIcon />}
            onClick={this._onPrevious.bind(this, 'minute')} />
          {value.format('mm')}
          <Button icon={<AddIcon />}
            onClick={this._onNext.bind(this, 'minute')} />
        </Box>
      );
    }
    if (format.indexOf('s') !== -1) {
      elements.push(
        <Box key="second" align="center">
          <Button icon={<SubtractIcon />}
            onClick={this._onPrevious.bind(this, 'second')} />
          {value.format('ss')}
          <Button icon={<AddIcon />}
            onClick={this._onNext.bind(this, 'second')} />
        </Box>
      );
    }
    if (format.indexOf('a') !== -1) {
      elements.push(
        <Box key="ampm" align="center">
          <Button icon={<SubtractIcon />}
            onClick={this._onPrevious.bind(this, 'ampm')} />
          {value.format('a')}
          <Button icon={<AddIcon />}
            onClick={this._onNext.bind(this, 'ampm')} />
        </Box>
      );
    }
    return (
      <Box direction="row" className={CLASS_ROOT + "__time"}>
        {elements}
      </Box>
    );
  }

  render () {
    const { format } = this.props;

    let date, time;
    if (DATE_REGEXP.test(format)) {
      date = this._renderDate();
    }

    if (TIME_REGEXP.test(format)) {
      time = this._renderTime();
    }

    return (
      <Box id={CLASS_ROOT} className={CLASS_ROOT} align="center"
        onClick={this._onClose}>
        {date}
        {time}
      </Box>
    );
  }

}

DateTimeDrop.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired
};
