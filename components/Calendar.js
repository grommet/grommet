// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var moment = require('moment');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var CalendarIcon = require('./icons/base/Calendar');
var PreviousIcon = require('./icons/Left');
var NextIcon = require('./icons/Right');
var Header = require('./Header');
var Menu = require('./Menu');
var Title = require('./Title');

var CLASS_ROOT = "calendar";

var Calendar = React.createClass({
  displayName: 'Calendar',

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.string
  },

  mixins: [KeyboardAccelerators],

  getDefaultProps: function getDefaultProps() {
    return {
      value: moment().format('YYYY-MM-DD')
    };
  },

  getInitialState: function getInitialState() {
    var state = this._stateFromProps(this.props);
    state.dropActive = false;
    return state;
  },

  componentDidMount: function componentDidMount() {
    this._activation(this.state.dropActive);
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.
    if (!this.state.dropActive && prevState.dropActive) {
      this._activation(this.state.dropActive);
    }
    if (this.state.dropActive && !prevState.dropActive) {
      this._activation(this.state.dropActive);
    }
    if (this.state.dropActive) {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._activation(false);
  },

  _onInputChange: function _onInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onOpen: function _onOpen(event) {
    event.preventDefault();
    this.setState({ dropActive: true });
  },

  _onClose: function _onClose() {
    this.setState({ dropActive: false });
  },

  _onClickDay: function _onClickDay(date) {
    if (this.props.onChange) {
      this.props.onChange(moment(date).format('YYYY-MM-DD'));
    }
  },

  _onPrevious: function _onPrevious(event) {
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

  _onNext: function _onNext(event) {
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

  _onNextDayOrMonth: function _onNextDayOrMonth(event) {
    if (event.shiftKey) {
      this._onNext(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      var nextDay = moment(this.state.current).add(1, 'days');

      if (!nextDay.isSame(this.state.reference, 'month')) {
        this.setState({ reference: this.state.reference.add(1, 'month'), current: nextDay });
      } else {
        this.setState({ current: nextDay });
      }
    }
  },

  _onPreviousDayOrMonth: function _onPreviousDayOrMonth(event) {
    if (event.shiftKey) {
      this._onPrevious(event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      var previousDay = moment(this.state.current).subtract(1, 'days');
      if (!previousDay.isSame(this.state.reference, 'month')) {
        this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousDay });
      } else {
        this.setState({ current: previousDay });
      }
    }
  },

  _onNextWeek: function _onNextWeek(event) {
    event.preventDefault();
    event.stopPropagation();
    var nextWeek = moment(this.state.current).add(1, 'week');

    if (!nextWeek.isSame(this.state.reference, 'month')) {
      this.setState({ reference: this.state.reference.add(1, 'month'), current: nextWeek });
    } else {
      this.setState({ current: nextWeek });
    }
  },

  _onPreviousWeek: function _onPreviousWeek(event) {
    event.preventDefault();
    event.stopPropagation();
    var previousWeek = moment(this.state.current).subtract(1, 'week');
    if (!previousWeek.isSame(this.state.reference, 'month')) {
      this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousWeek });
    } else {
      this.setState({ current: previousWeek });
    }
  },

  _onSelectDate: function _onSelectDate(event) {
    event.preventDefault();
    event.stopPropagation();
    this._onClickDay(this.state.current);
    this._onClose();
  },

  _activation: function _activation(dropActive) {

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
      this.startListeningToKeyboard(listeners);

      this._drop = Drop.add(this.refs.component.getDOMNode(), this._renderDrop(), { top: 'bottom', left: 'left' });
    } else {

      document.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(listeners);

      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }
  },

  _stateFromProps: function _stateFromProps(props) {
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

  _renderDrop: function _renderDrop() {
    var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var headerCells = weekDays.map(function (day) {
      return React.createElement(
        'th',
        { key: day },
        day
      );
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
        if (!date.isSame(reference, 'month')) {
          classes.push(CLASS_ROOT + "__day--other-month");
        }
        days.push(React.createElement(
          'td',
          { key: date.valueOf() },
          React.createElement(
            'div',
            { className: classes.join(' '),
              onClick: this._onClickDay.bind(this, moment(date)) },
            date.date()
          )
        ));
        date.add(1, 'days');
      }
      rows.push(React.createElement(
        'tr',
        { key: date.valueOf() },
        days
      ));
    }

    return React.createElement(
      'div',
      { id: CLASS_ROOT + "-drop", className: CLASS_ROOT + "__drop",
        onClick: this._onClose },
      React.createElement(
        Header,
        { justify: 'between' },
        React.createElement(
          Menu,
          { responsive: false },
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__previous", onClick: this._onPrevious },
            React.createElement(PreviousIcon, null)
          )
        ),
        React.createElement(
          Title,
          { className: CLASS_ROOT + "__title", responsive: false },
          this.state.reference.format('MMMM YYYY')
        ),
        React.createElement(
          Menu,
          { responsive: false },
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__next", onClick: this._onNext },
            React.createElement(NextIcon, null)
          )
        )
      ),
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__grid" },
        React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              headerCells
            )
          ),
          React.createElement(
            'tbody',
            null,
            rows
          )
        )
      )
    );
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.state.dropActive) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      'div',
      { ref: 'component', className: classes.join(' ') },
      React.createElement('input', { className: CLASS_ROOT + "__input",
        id: this.props.id, ref: 'calendarInput', name: this.props.name,
        value: this.props.value,
        onChange: this._onInputChange }),
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__control", onClick: this._onOpen },
        React.createElement(CalendarIcon, null)
      )
    );
  }

});

module.exports = Calendar;