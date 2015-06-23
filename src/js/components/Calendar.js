// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var moment = require('moment');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
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

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay],

  getDefaultProps: function () {
    return {value: (new Date()).toISOString().slice(0, 10)};
  },

  _onInputChange: function (event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({active: true, activeSuggestionIndex: -1});
  },

  _onClose: function (event) {
    this.setState({active: false});
  },

  _onClickDay: function (date) {
    if (this.props.onChange) {
      this.props.onChange(date.toISOString().slice(0, 10));
    }
  },

  _onPrevious: function (event) {
    event.stopPropagation();
    if (event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({reference: this.state.reference.subtract(1, 'month')});
  },

  _onNext: function (event) {
    event.stopPropagation();
    if (event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }
    this.setState({reference: this.state.reference.add(1, 'month')});
  },

  _activation: function (active) {

    var listeners = {
      esc: this._onClose,
      tab: this._onClose
    };

    if (active) {

      document.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(listeners);

      var element = this.refs.component.getDOMNode();
      var layerElement = document.getElementById(CLASS_ROOT + '-layer');
      this.startOverlay(element, layerElement, 'below');

    } else {

      document.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(listeners);
      this.stopOverlay();

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

  getInitialState: function () {
    var state = this._stateFromProps(this.props);
    state.active = false;
    return state;
  },

  componentDidMount: function () {
    this._activation(this.state.active);
  },

  componentDidUpdate: function (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.
    if (! this.state.active && prevState.active) {
      this._activation(this.state.active);
    }
    if (this.state.active && ! prevState.active) {
      this._activation(this.state.active);
    }
  },

  componentWillReceiveProps: function (newProps) {
    var state = this._stateFromProps(newProps);
    this.setState(state);
  },

  componentWillUnmount: function () {
    this._activation(false);
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.state.active) {
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
  },

  renderLayer: function() {
    if (this.state.active) {
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
        <div id={CLASS_ROOT + "-layer"} className={CLASS_ROOT + "__layer"}
          onClick={this._onClose}>
          <Header>
            <Menu>
              <span className={CLASS_ROOT + "__previous"} onClick={this._onPrevious}>
                <PreviousIcon />
              </span>
            </Menu>
            <Title className={CLASS_ROOT + "__title"}>
              {this.state.reference.format('MMMM YYYY')}
            </Title>
            <Menu>
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
    } else {
      return (<span />);
    }
  }

});

module.exports = Calendar;
