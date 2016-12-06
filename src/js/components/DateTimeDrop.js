// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
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
import { announce } from '../utils/Announcer';
import Intl from '../utils/Intl';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';

const CLASS_ROOT = CSSClassnames.DATE_TIME_DROP;
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_REGEXP = new RegExp('[MDY]');
const TIME_REGEXP = new RegExp('[hHmsa]');

export default class DateTimeDrop extends Component {

  constructor(props, context) {
    super(props, context);

    this._announceActiveCell = this._announceActiveCell.bind(this);
    this._buildDateRows = this._buildDateRows.bind(this);
    this._onDay = this._onDay.bind(this);
    this._onToday = this._onToday.bind(this);
    this._onPrevious = this._onPrevious.bind(this);
    this._onPreviousDay = this._onPreviousDay.bind(this);
    this._onPreviousRow = this._onPreviousRow.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onNextDay = this._onNextDay.bind(this);
    this._onNextRow = this._onNextRow.bind(this);
    this._onSelectDay = this._onSelectDay.bind(this);

    this.state = this._stateFromProps(props);
    this.state.mouseActive = false;

    this._buildDateRows();
  }

  componentDidMount () {
    this._keyboardHandlers = {
      up: this._onPreviousRow,
      left: this._onPreviousDay,
      down: this._onNextRow,
      right: this._onNextDay,
      enter: this._onSelectDay
    };
    KeyboardAccelerators.startListeningToKeyboard(this, this._keyboardHandlers);
  }

  componentWillReceiveProps (nextProps) {
    const state = this._stateFromProps(nextProps);
    this._buildDateRows(state);
    this.setState(state);
  }

  componentWillUnmount () {
    KeyboardAccelerators.stopListeningToKeyboard(this, this._keyboardHandlers);
  }

  _buildDateRows (state) {
    state = state || this.state;
    const { timeOfDay, value } = state;
    const start = moment(value).startOf('month').startOf('week').add(timeOfDay);
    const end = moment(value).endOf('month').endOf('week').add(timeOfDay);
    let date = moment(start);
    const dateRows = [];
    let activeCell;

    let rowIndex = 0;
    while (date.valueOf() <= end.valueOf()) {
      const days = [];
      for (let i = 0; i < 7; i += 1) {
        if (date.isSame(value, 'day')) {
          activeCell = [rowIndex, i];
        }
        days.push(moment(date));
        date = date.add(1, 'days');
      }
      dateRows.push(days);
      rowIndex++;
    }

    state.dateRows = dateRows;
    state.activeCell = activeCell;
    state.originalActiveCell = activeCell.slice();
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

  _announceActiveCell () {
    const { activeCell, dateRows } = this.state;
    const { intl } = this.context;
    const weekDay = WEEK_DAYS[activeCell[1]];
    const day = dateRows[activeCell[0]][activeCell[1]].date();
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${weekDay}, ${day} (${enterSelectMessage})`);
  }

  _onPreviousRow (event) {
    event.preventDefault();
    const { activeCell } = this.state;
    if (this.tableRef.contains(document.activeElement)) {
      if (activeCell[0] - 1 >= 0) {
        activeCell[0] = activeCell[0] - 1;
        this.setState({ activeCell: activeCell }, this._announceActiveCell);
      }
    }
  }

  _onPreviousDay (event) {
    event.preventDefault();
    const { activeCell } = this.state;
    if (this.tableRef.contains(document.activeElement)) {
      if (activeCell[1] - 1 >= 0) {
        activeCell[1] = activeCell[1] - 1;
        this.setState({ activeCell: activeCell }, this._announceActiveCell);
      }
    }
  }

  _onNextRow (event) {
    event.preventDefault();
    const { dateRows, activeCell } = this.state;
    if (this.tableRef.contains(document.activeElement)) {
      if (activeCell[0] + 1 <= dateRows.length - 1) {
        activeCell[0] = activeCell[0] + 1;
        this.setState({ activeCell: activeCell }, this._announceActiveCell);
      }
    }
  }

  _onNextDay (event) {
    event.preventDefault();
    const { activeCell } = this.state;
    if (this.tableRef.contains(document.activeElement)) {
      if (activeCell[1] + 1 <= WEEK_DAYS.length - 1) {
        activeCell[1] = activeCell[1] + 1;
        this.setState({ activeCell: activeCell }, this._announceActiveCell);
      }
    }
  }

  _onSelectDay () {
    const { activeCell, dateRows } = this.state;
    if (this.tableRef.contains(document.activeElement)) {
      const date = dateRows[activeCell[0]][activeCell[1]];
      this._onDay(date);
    }
  }

  _onDay (date, event) {
    if (event) {
      event.stopPropagation();
      // using native event to avoid document click in DateTime to be invoked
      event.nativeEvent.stopImmediatePropagation();
    }
    const { format, onChange } = this.props;
    const { intl } = this.context;
    this.setState({
      value: moment(date)
    }, () => {
      const dateFormatted = date.format(format);
      onChange(dateFormatted, true);
      const selectedMessage = Intl.getMessage(intl, 'Selected');
      announce(`${dateFormatted} ${selectedMessage}`);
    });
  }

  _onToday () {
    const { format, onChange } = this.props;
    const { timeOfDay } = this.state;
    const { intl } = this.context;
    const today = moment().startOf('day').add(timeOfDay);
    this.setState({ value: today }, () => {
      const dateFormatted = today.format(format);
      onChange(dateFormatted, true);
      const selectedMessage = Intl.getMessage(intl, 'Selected');
      announce(`${dateFormatted} ${selectedMessage}`);
    });
  }

  _onPrevious (scope) {
    const { format, step, onChange } = this.props;
    const { stepScope, value } = this.state;
    let delta = (scope === stepScope ? step : 1);
    if (scope === 'ampm') {
      delta = 12;
      scope = 'hours';
    }
    const newValue = moment(value).subtract(delta, scope);
    this.setState({ value: newValue }, () => {
      if (scope === 'month') {
        announce(newValue.format('MMMM YYYY'));
      } else {
        announce(newValue.format(format));
      }
    });
    onChange(newValue.format(format));
  }

  _onNext (scope) {
    const { format, step, onChange } = this.props;
    const { stepScope, value } = this.state;
    let delta = (scope === stepScope ? step : 1);
    if (scope === 'ampm') {
      delta = 12;
      scope = 'hours';
    }
    const newValue = moment(value).add(delta, scope);
    this.setState({ value: newValue }, () => {
      if (scope === 'month') {
        announce(newValue.format('MMMM YYYY'));
      } else {
        announce(newValue.format(format));
      }
    });
    onChange(newValue.format(format));
  }

  _renderDate () {
    const { activeCell, dateRows, focus, mouseActive, value } = this.state;
    const { intl } = this.context;

    const headerCells = WEEK_DAYS.map((day) => {
      return <th key={day}>{day}</th>;
    });

    const rows = dateRows.map((row, rowIndex) => {
      const days = row.map((date, columnIndex) => {
        const classes = classnames(
          `${CLASS_ROOT}__day`, {
            [`${CLASS_ROOT}__day--active`]: date.isSame(value, 'day'),
            [`${CLASS_ROOT}__day--hover`]: (
              !date.isSame(value, 'day') &&
              [rowIndex, columnIndex].toString() === activeCell.toString()
            ),
            [`${CLASS_ROOT}__day--other-month`]: !date.isSame(value, 'month')
          }
        );
        const weekDay = WEEK_DAYS[columnIndex];
        const day = dateRows[rowIndex][columnIndex].date();
        return (
          <td key={date.valueOf()}>
            <div className={classes} tabIndex='-1'
              onClick={this._onDay.bind(this, moment(date))}
              aria-label={`${weekDay} ${day}`}
              role='button'
              onFocus={() => this.setState({
                activeCell: [rowIndex, columnIndex]
              })}
              onBlur={() => this.setState({
                activeCell: this.state.originalActiveCell
              })}>
              {date.date()}
            </div>
          </td>
        );
      });

      return <tr key={`date_row_${rowIndex}`}>{days}</tr>;
    });

    const previousMonthMessage = Intl.getMessage(intl, 'Previous Month');
    const nextMonthMessage = Intl.getMessage(intl, 'Next Month');
    const todayMessage = Intl.getMessage(intl, 'Today');
    const dateSelectorMessage = Intl.getMessage(intl, 'Date Selector');
    const navigationHelpMessage = Intl.getMessage(intl, 'Navigation Help');

    const gridClasses = classnames(
      `${CLASS_ROOT}__grid`, {
        [`${CLASS_ROOT}__grid--focus`]: focus
      }
    );
    return [
      <Header key='header' justify='between' colorIndex='neutral-1'>
        <Button className={`${CLASS_ROOT}__previous`}
          icon={<LinkPreviousIcon />} a11yTitle={previousMonthMessage}
          onClick={this._onPrevious.bind(this, 'month')} />
        <Title className={`${CLASS_ROOT}__title`} responsive={false}>
          {value.format('MMMM YYYY')}
        </Title>
        <Button className={`${CLASS_ROOT}__next`} icon={<LinkNextIcon />}
          a11yTitle={nextMonthMessage}
          onClick={this._onNext.bind(this, 'month')} />
      </Header>,
      <div key='grid' className={gridClasses}>
        <table ref={(ref) => this.tableRef = ref} tabIndex='0'
          aria-label={`${dateSelectorMessage} (${navigationHelpMessage})`}
          onMouseDown={() => this.setState({ mouseActive: true })}
          onMouseUp={() => this.setState({ mouseActive: false })}
          onFocus={() => {
            if (mouseActive === false) {
              this.setState({ focus: true });
            }
          }}
          onBlur={() => this.setState({
            activeCell: this.state.originalActiveCell,
            focus: false
          })}>
          <thead>
            <tr>{headerCells}</tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>,
      <Box key='today' alignSelf='center' pad={{vertical: 'small'}}>
        <Button className={`${CLASS_ROOT}__today`} label={todayMessage}
          onClick={this._onToday} />
      </Box>
    ];
  }

  _renderTime () {
    const { format } = this.props;
    const { value } = this.state;
    const { intl } = this.context;
    const addMessage = Intl.getMessage(intl, 'Add');
    const subtractMessage = Intl.getMessage(intl, 'Subtract');
    const hourMessage = Intl.getMessage(intl, 'hour');
    const minuteMessage = Intl.getMessage(intl, 'minute');
    const secondMessage = Intl.getMessage(intl, 'second');
    let elements = [];
    if (format.indexOf('h') !== -1) {
      elements.push(
        <Box key='hour' align='center'>
          <Button icon={<SubtractIcon />}
            a11yTitle={`${subtractMessage} ${hourMessage}`}
            onClick={this._onPrevious.bind(this, 'hour')} />
          {value.format('h')}
          <Button icon={<AddIcon />}
            a11yTitle={`${addMessage} ${hourMessage}`}
            onClick={this._onNext.bind(this, 'hour')} />
        </Box>
      );
    } else if (format.indexOf('H') !== -1) {
      elements.push(
        <Box key='hour' align='center'>
          <Button icon={<SubtractIcon />}
            a11yTitle={`${subtractMessage} ${hourMessage}`}
            onClick={this._onPrevious.bind(this, 'hour')} />
          {value.format('H')}
          <Button icon={<AddIcon />}
            a11yTitle={`${addMessage} ${hourMessage}`}
            onClick={this._onNext.bind(this, 'hour')} />
        </Box>
      );
    }
    if (format.indexOf('m') !== -1) {
      elements.push(
        <Box key='minute' align='center'>
          <Button icon={<SubtractIcon />}
            a11yTitle={`${subtractMessage} ${minuteMessage}`}
            onClick={this._onPrevious.bind(this, 'minute')} />
          {value.format('mm')}
          <Button icon={<AddIcon />}
            a11yTitle={`${addMessage} ${minuteMessage}`}
            onClick={this._onNext.bind(this, 'minute')} />
        </Box>
      );
    }
    if (format.indexOf('s') !== -1) {
      elements.push(
        <Box key='second' align='center'>
          <Button icon={<SubtractIcon />}
            a11yTitle={`${subtractMessage} ${secondMessage}`}
            onClick={this._onPrevious.bind(this, 'second')} />
          {value.format('ss')}
          <Button icon={<AddIcon />}
            a11yTitle={`${addMessage} ${secondMessage}`}
            onClick={this._onNext.bind(this, 'second')} />
        </Box>
      );
    }
    if (format.indexOf('a') !== -1) {
      elements.push(
        <Box key='ampm' align='center'>
          <Button icon={<SubtractIcon />}
            a11yTitle={`${subtractMessage} am, pm`}
            onClick={this._onPrevious.bind(this, 'ampm')} />
          {value.format('a')}
          <Button icon={<AddIcon />}
            a11yTitle={`${addMessage} am, pm`}
            onClick={this._onNext.bind(this, 'ampm')} />
        </Box>
      );
    }
    return (
      <Box className={`${CLASS_ROOT}__time`} direction='row' alignSelf='center'
        responsive={false}>
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
      <Box className={CLASS_ROOT}>
        {date}
        {time}
      </Box>
    );
  }

}

DateTimeDrop.contextTypes = {
  intl: PropTypes.object
};

DateTimeDrop.propTypes = {
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired
};
