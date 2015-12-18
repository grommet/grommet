// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import CalendarIcon from './icons/base/Calendar';
import PreviousIcon from './icons/base/LinkPrevious';
import NextIcon from './icons/base/LinkNext';
import Header from './Header';
import Title from './Title';
import Button from './Button';

const CLASS_ROOT = "calendar";

class Calendar extends Component {

  constructor(props) {
    super(props);

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
    var state = this._stateFromProps(newProps);
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
    if (event.shiftKey) {
      this._onNext(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      var nextDay = moment(this.state.current).add(1, 'days');

      if (! nextDay.isSame(this.state.reference, 'month')) {
        this.setState({reference: this.state.reference.add(1, 'month'), current: nextDay});
      } else {
        this.setState({current: nextDay});
      }
    }
  }

  _onPreviousDayOrMonth (event) {
    if (event.shiftKey) {
      this._onPrevious(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      var previousDay = moment(this.state.current).subtract(1, 'days');
      if (! previousDay.isSame(this.state.reference, 'month')) {
        this.setState({reference: this.state.reference.subtract(1, 'month'), current: previousDay});
      } else {
        this.setState({current: previousDay});
      }
    }
  }

  _onNextWeek (event) {
    event.preventDefault();
    event.stopPropagation();
    var nextWeek = moment(this.state.current).add(1, 'week');

    if (! nextWeek.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.add(1, 'month'), current: nextWeek});
    } else {
      this.setState({current: nextWeek});
    }
  }

  _onPreviousWeek (event) {
    event.preventDefault();
    event.stopPropagation();
    var previousWeek = moment(this.state.current).subtract(1, 'week');
    if (! previousWeek.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.subtract(1, 'month'), current: previousWeek});
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

    var listeners = {
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

      this._drop = Drop.add(ReactDOM.findDOMNode(this.refs.component),
        this._renderDrop(), {top: 'bottom', left: 'left'});

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
    var result = {
      current: null,
      reference: moment().startOf('day')
    };
    var date = moment(props.value);
    if (date.isValid()) {
      result.current = moment(date).startOf('day');
      result.reference = moment(date).startOf('day');
    }
    return result;
  }

  _renderDrop () {
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var headerCells = weekDays.map(function (day) {
      return <th key={day}>{day}</th>;
    });

    var reference = this.state.reference;
    var start = moment(reference).startOf('month').startOf('week');
    var end = moment(reference).endOf('month').endOf('week');
    var date = moment(start);
    var rows = [];

    while (date.valueOf() <= end.valueOf()) {
      var days = [];
      for (var i = 0; i < 7; i += 1) {
        var classes = [CLASS_ROOT + "__day"];
        if (this.state.current && date.isSame(this.state.current)) {
          classes.push(CLASS_ROOT + "__day--active");
        }
        if (! date.isSame(reference, 'month')) {
          classes.push(CLASS_ROOT + "__day--other-month");
        }
        days.push(
          <td key={date.valueOf()}>
            <div className={classes.join(' ')}
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
      <div id={CLASS_ROOT + "-drop"} className={CLASS_ROOT + "__drop"}
        onClick={this._onClose}>
        <Header justify="between">
          <Button className={CLASS_ROOT + "__previous"} type="icon"
            onClick={this._onPrevious}>
            <PreviousIcon />
          </Button>
          <Title className={CLASS_ROOT + "__title"} responsive={false}>
            {this.state.reference.format('MMMM YYYY')}
          </Title>
          <Button className={CLASS_ROOT + "__next"} type="icon"
            onClick={this._onNext}>
            <NextIcon />
          </Button>
        </Header>
        <div className={CLASS_ROOT + "__grid"}>
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
    var classes = [CLASS_ROOT];
    if (this.state.dropActive) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div ref="component" className={classes.join(' ')}>
        <input className={CLASS_ROOT + "__input"}
          id={this.props.id} ref="calendarInput" name={this.props.name}
          value={this.props.value}
          onChange={this._onInputChange} />
        <Button className={CLASS_ROOT + "__control"} type="icon" onClick={this._onOpen}>
          <CalendarIcon />
        </Button>
      </div>
    );
  }

}

Calendar.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

Calendar.defaultProps = {
  value: moment().format('YYYY-MM-DD')
};

module.exports = Calendar;
