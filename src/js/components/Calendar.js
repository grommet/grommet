// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var moment = require('moment');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var CalendarIcon = require('./icons/Calendar');
var PreviousIcon = require('./icons/Left');
var NextIcon = require('./icons/Right');
var Header = require('./Header');
var Menu = require('./Menu');
var Title = require('./Title');

var CLASS_ROOT = "calendar";

var Calendar = React.createClass({

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
  },

  mixins: [KeyboardAccelerators],

  getDefaultProps: function () {
    return {
      value: moment().format('YYYY-MM-DD')
    };
  },

  getInitialState: function () {
    var state = this._stateFromProps(this.props);
    state.dropActive = false;
    return state;
  },

  componentDidMount: function () {
    this._activation(this.state.dropActive);
  },

  componentWillReceiveProps: function (newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
  },

  componentDidUpdate: function (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.
    if (! this.state.dropActive && prevState.dropActive) {
      this._activation(this.state.dropActive);
    }
    if (this.state.dropActive && ! prevState.dropActive) {
      this._activation(this.state.dropActive);
    }
    if (this.state.dropActive) {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function () {
    this._activation(false);
  },

  _onInputChange: function (event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({dropActive: true});
  },

  _onClose: function () {
    this.setState({dropActive: false});
  },

  _onClickDay: function (date) {
    if (this.props.onChange) {
      this.props.onChange(moment(date).format('YYYY-MM-DD'));
    }
  },

  _onPrevious: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({
      reference: this.state.reference.subtract(1, 'month'),
      current: this.state.reference
    });
  },

  _onNext: function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({
      reference: this.state.reference.add(1, 'month'),
      current: this.state.reference
    });
  },

  _onNextDay: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var nextDay = moment(this.state.current).add(1, 'days');

    if (! nextDay.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.add(1, 'month'), current: nextDay});
    } else {
      this.setState({current: nextDay});
    }
  },

  _onPreviousDay: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var previousDay = moment(this.state.current).subtract(1, 'days');
    if (! previousDay.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.subtract(1, 'month'), current: previousDay});
    } else {
      this.setState({current: previousDay});
    }
  },

  _onNextWeek: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var nextWeek = moment(this.state.current).add(1, 'week');

    if (! nextWeek.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.add(1, 'month'), current: nextWeek});
    } else {
      this.setState({current: nextWeek});
    }
  },

  _onPreviousWeek: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var previousWeek = moment(this.state.current).subtract(1, 'week');
    if (! previousWeek.isSame(this.state.reference, 'month')) {
      this.setState({reference: this.state.reference.subtract(1, 'month'), current: previousWeek});
    } else {
      this.setState({current: previousWeek});
    }
  },

  _onSelectDate: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this._onClickDay(this.state.current);
    this._onClose();
  },

  _activation: function (dropActive) {

    var listeners = {
      esc: this._onClose,
      tab: this._onClose,
      right: this._onNextDay,
      left: this._onPreviousDay,
      down: this._onNextWeek,
      up: this._onPreviousWeek,
      shiftLeft: this._onPrevious,
      shiftRight: this._onNext,
      enter: this._onSelectDate,
      space: this._onSelectDate
    };

    if (dropActive) {

      document.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(listeners);

      this._drop = Drop.add(this.refs.component.getDOMNode(),
        this._renderDrop(), {top: 'bottom', left: 'left'});

    } else {

      document.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(listeners);

      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }
  },

  _stateFromProps: function (props) {
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
  },

  _renderDrop: function() {
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
          <Menu responsive={false}>
            <span className={CLASS_ROOT + "__previous"} onClick={this._onPrevious}>
              <PreviousIcon />
            </span>
          </Menu>
          <Title className={CLASS_ROOT + "__title"} responsive={false}>
            {this.state.reference.format('MMMM YYYY')}
          </Title>
          <Menu responsive={false}>
            <span className={CLASS_ROOT + "__next"} onClick={this._onNext}>
              <NextIcon />
            </span>
          </Menu>
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
  },

  render: function() {
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
        <div className={CLASS_ROOT + "__control"} onClick={this._onOpen} >
          <CalendarIcon />
        </div>
      </div>
    );
  }

});

module.exports = Calendar;
