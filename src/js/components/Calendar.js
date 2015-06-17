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
    return {value: (new Date()).toISOString()};
  },

  _onInputChange: function (event) {
    this.props.onChange(event.target.value);
  },

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({active: true, activeSuggestionIndex: -1});
  },

  _onClose: function (event) {
    this.setState({active: false});
  },

  _onClickDay: function (date) {
    this.props.onChange(date.toISOString());
  },

  _onPrevious: function (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({reference: this.state.reference.subtract(1, 'month')});
  },

  _onNext: function (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
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

  getInitialState: function () {
    return {
      active: false,
      current: moment(this.props.value).startOf('day'),
      reference: moment(this.props.value).startOf('day')
    };
  },

  componentDidMount: function () {
    if (this.state.active) {
      this._activation(this.state.active);
    }
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
    this.setState({
      current: moment(newProps.value).startOf('day'),
      reference: moment(newProps.value).startOf('day')
    });
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
          id={this.props.id} name={this.props.name}
          value={this.state.current.format('YYYY-M-D')}
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
          if (date.isSame(this.state.current)) {
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
              <span onClick={this._onPrevious}>
                <PreviousIcon />
              </span>
            </Menu>
            <Title className={CLASS_ROOT + "__title"}>
              {this.state.reference.format('MMMM YYYY')}
            </Title>
            <Menu>
              <span onClick={this._onNext}>
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
