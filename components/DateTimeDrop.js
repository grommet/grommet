'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _Add = require('./icons/base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _Subtract = require('./icons/base/Subtract');

var _Subtract2 = _interopRequireDefault(_Subtract);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Locale = require('../utils/Locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DATE_TIME_DROP;
var locale = (0, _Locale.getCurrentLocale)();
_moment2.default.locale(locale);
var WEEK_DAYS = _moment2.default.weekdaysShort(true) || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const DATE_REGEXP = new RegExp('[DMY]');
var DAY_REGEXP = new RegExp('[D]');
var MONTHYEAR_REGEXP = new RegExp('[MY]');
var TIME_REGEXP = new RegExp('[hHmsa]');
var UNITS = {
  M: 'month',
  D: 'day',
  Y: 'year',
  h: 'hour',
  H: 'hour',
  m: 'minute',
  s: 'second',
  a: 'ampm',
  A: 'ampm'
};

var DateTimeDrop = function (_Component) {
  _inherits(DateTimeDrop, _Component);

  function DateTimeDrop(props, context) {
    _classCallCheck(this, DateTimeDrop);

    var _this = _possibleConstructorReturn(this, (DateTimeDrop.__proto__ || Object.getPrototypeOf(DateTimeDrop)).call(this, props, context));

    _this._announceActiveCell = _this._announceActiveCell.bind(_this);
    _this._buildDateRows = _this._buildDateRows.bind(_this);
    _this._onDay = _this._onDay.bind(_this);
    _this._onToday = _this._onToday.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onPreviousDay = _this._onPreviousDay.bind(_this);
    _this._onPreviousRow = _this._onPreviousRow.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onNextDay = _this._onNextDay.bind(_this);
    _this._onNextRow = _this._onNextRow.bind(_this);
    _this._onSelectDay = _this._onSelectDay.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.mouseActive = false;

    _this._buildDateRows(_this.state);
    return _this;
  }

  _createClass(DateTimeDrop, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._keyboardHandlers = {
        up: this._onPreviousRow,
        left: this._onPreviousDay,
        down: this._onNextRow,
        right: this._onNextDay,
        enter: this._onSelectDay
      };
      _KeyboardAccelerators2.default.startListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = this._stateFromProps(nextProps);
      this._buildDateRows(state);
      this.setState(state);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this, this._keyboardHandlers);
    }
  }, {
    key: '_buildDateRows',
    value: function _buildDateRows(state) {
      var timeOfDay = state.timeOfDay,
          value = state.value;

      var start = (0, _moment2.default)(value).startOf('month').startOf('week').add(timeOfDay);
      // Always display 6 weeks in the calendar, to keep the date/time
      // change controls from jumping around.
      var end = (0, _moment2.default)(start).add(41, 'days').add(timeOfDay);
      var date = (0, _moment2.default)(start);
      var dateRows = [];
      var activeCell = void 0;

      var rowIndex = 0;
      while (date.valueOf() <= end.valueOf()) {
        var days = [];
        for (var i = 0; i < 7; i += 1) {
          if (date.isSame(value, 'day')) {
            activeCell = [rowIndex, i];
          }
          days.push((0, _moment2.default)(date));
          date = date.add(1, 'days');
        }
        dateRows.push(days);
        rowIndex++;
      }

      state.dateRows = dateRows;
      state.activeCell = activeCell;
      state.originalActiveCell = activeCell.slice();
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var format = props.format;

      var result = {};
      var value = (0, _moment2.default)(props.value);
      if (value.isValid()) {
        result.value = value;
        result.timeOfDay = {
          hours: value.hours(),
          minutes: value.minutes(),
          seconds: value.seconds()
        };
      } else {
        result.value = (0, _moment2.default)();
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
  }, {
    key: '_announceActiveCell',
    value: function _announceActiveCell() {
      var _state = this.state,
          activeCell = _state.activeCell,
          dateRows = _state.dateRows;
      var intl = this.context.intl;

      var weekDay = WEEK_DAYS[activeCell[1]];
      var day = dateRows[activeCell[0]][activeCell[1]].date();
      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      (0, _Announcer.announce)(weekDay + ', ' + day + ' (' + enterSelectMessage + ')');
    }
  }, {
    key: '_onPreviousRow',
    value: function _onPreviousRow(event) {
      event.preventDefault();
      var activeCell = this.state.activeCell;

      if (this.tableRef.contains(document.activeElement)) {
        if (activeCell[0] - 1 >= 0) {
          activeCell[0] = activeCell[0] - 1;
          this.setState({ activeCell: activeCell }, this._announceActiveCell);
        }
      }
    }
  }, {
    key: '_onPreviousDay',
    value: function _onPreviousDay(event) {
      event.preventDefault();
      var activeCell = this.state.activeCell;

      if (this.tableRef.contains(document.activeElement)) {
        if (activeCell[1] - 1 >= 0) {
          activeCell[1] = activeCell[1] - 1;
          this.setState({ activeCell: activeCell }, this._announceActiveCell);
        }
      }
    }
  }, {
    key: '_onNextRow',
    value: function _onNextRow(event) {
      event.preventDefault();
      var _state2 = this.state,
          dateRows = _state2.dateRows,
          activeCell = _state2.activeCell;

      if (this.tableRef.contains(document.activeElement)) {
        if (activeCell[0] + 1 <= dateRows.length - 1) {
          activeCell[0] = activeCell[0] + 1;
          this.setState({ activeCell: activeCell }, this._announceActiveCell);
        }
      }
    }
  }, {
    key: '_onNextDay',
    value: function _onNextDay(event) {
      event.preventDefault();
      var activeCell = this.state.activeCell;

      if (this.tableRef.contains(document.activeElement)) {
        if (activeCell[1] + 1 <= WEEK_DAYS.length - 1) {
          activeCell[1] = activeCell[1] + 1;
          this.setState({ activeCell: activeCell }, this._announceActiveCell);
        }
      }
    }
  }, {
    key: '_onSelectDay',
    value: function _onSelectDay() {
      var _state3 = this.state,
          activeCell = _state3.activeCell,
          dateRows = _state3.dateRows;

      if (this.tableRef.contains(document.activeElement)) {
        var date = dateRows[activeCell[0]][activeCell[1]];
        this._onDay(date);
      }
    }
  }, {
    key: '_onDay',
    value: function _onDay(date, event) {
      if (event) {
        event.stopPropagation();
        // using native event to avoid document click in DateTime to be invoked
        event.nativeEvent.stopImmediatePropagation();
      }
      var _props = this.props,
          format = _props.format,
          onChange = _props.onChange;
      var intl = this.context.intl;

      this.setState({
        value: (0, _moment2.default)(date)
      }, function () {
        var dateFormatted = date.format(format);
        onChange(dateFormatted, true);
        var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
        (0, _Announcer.announce)(dateFormatted + ' ' + selectedMessage);
      });
    }
  }, {
    key: '_onToday',
    value: function _onToday() {
      var _props2 = this.props,
          format = _props2.format,
          onChange = _props2.onChange;
      var timeOfDay = this.state.timeOfDay;
      var intl = this.context.intl;

      var today = (0, _moment2.default)().startOf('day').add(timeOfDay);
      this.setState({ value: today }, function () {
        var dateFormatted = today.format(format);
        onChange(dateFormatted, true);
        var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
        (0, _Announcer.announce)(dateFormatted + ' ' + selectedMessage);
      });
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(scope) {
      var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _props3 = this.props,
          format = _props3.format,
          step = _props3.step,
          onChange = _props3.onChange;
      var _state4 = this.state,
          stepScope = _state4.stepScope,
          timeOfDay = _state4.timeOfDay,
          value = _state4.value;

      var delta = scope === stepScope ? step : 1;
      if (scope === 'ampm') {
        delta = 12;
        scope = 'hours';
      }
      var newValue = (0, _moment2.default)(value).subtract(delta, scope);
      this.setState({ value: newValue }, function () {
        if (scope === 'month') {
          (0, _Announcer.announce)(newValue.format('MMMM YYYY'));
        } else {
          (0, _Announcer.announce)(newValue.format(format));
        }
      });
      if (notify) {
        onChange(newValue.format(format));
      } else {
        // rebuild grid
        var state = { timeOfDay: timeOfDay, value: newValue };
        this._buildDateRows(state);
        this.setState(state);
      }
    }
  }, {
    key: '_onNext',
    value: function _onNext(scope) {
      var notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var _props4 = this.props,
          format = _props4.format,
          step = _props4.step,
          onChange = _props4.onChange;
      var _state5 = this.state,
          stepScope = _state5.stepScope,
          timeOfDay = _state5.timeOfDay,
          value = _state5.value;

      var delta = scope === stepScope ? step : 1;
      if (scope === 'ampm') {
        delta = 12;
        scope = 'hours';
      }
      var newValue = (0, _moment2.default)(value).add(delta, scope);
      this.setState({ value: newValue }, function () {
        if (scope === 'month') {
          (0, _Announcer.announce)(newValue.format('MMMM YYYY'));
        } else {
          (0, _Announcer.announce)(newValue.format(format));
        }
      });
      if (notify) {
        onChange(newValue.format(format));
      } else {
        // rebuild grid
        var state = { timeOfDay: timeOfDay, value: newValue };
        this._buildDateRows(state);
        this.setState(state);
      }
    }
  }, {
    key: '_renderGrid',
    value: function _renderGrid() {
      var _this2 = this;

      var propsValue = this.props.value;
      var _state6 = this.state,
          activeCell = _state6.activeCell,
          dateRows = _state6.dateRows,
          focus = _state6.focus,
          mouseActive = _state6.mouseActive,
          value = _state6.value;
      var intl = this.context.intl;


      var dateSelectorMessage = _Intl2.default.getMessage(intl, 'Date Selector');
      var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');

      var headerCells = WEEK_DAYS.map(function (day) {
        return _react2.default.createElement(
          'th',
          { key: day },
          day
        );
      });

      var rows = dateRows.map(function (row, rowIndex) {
        var days = row.map(function (date, columnIndex) {
          var _classnames;

          var classes = (0, _classnames4.default)(CLASS_ROOT + '__day', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__day--active', date.isSame(propsValue, 'day')), _defineProperty(_classnames, CLASS_ROOT + '__day--hover', !date.isSame(value, 'day') && [rowIndex, columnIndex].toString() === activeCell.toString()), _defineProperty(_classnames, CLASS_ROOT + '__day--other-month', !date.isSame(value, 'month')), _classnames));
          var weekDay = WEEK_DAYS[columnIndex];
          var day = dateRows[rowIndex][columnIndex].date();
          return _react2.default.createElement(
            'td',
            { key: date.valueOf() },
            _react2.default.createElement(
              'div',
              { className: classes, tabIndex: '-1',
                onClick: _this2._onDay.bind(_this2, (0, _moment2.default)(date)),
                'aria-label': weekDay + ' ' + day,
                role: 'button',
                onFocus: function onFocus() {
                  return _this2.setState({
                    activeCell: [rowIndex, columnIndex]
                  });
                },
                onBlur: function onBlur() {
                  return _this2.setState({
                    activeCell: _this2.state.originalActiveCell
                  });
                } },
              date.date()
            )
          );
        });

        return _react2.default.createElement(
          'tr',
          { key: 'date_row_' + rowIndex },
          days
        );
      });

      var gridClasses = (0, _classnames4.default)(CLASS_ROOT + '__grid', _defineProperty({}, CLASS_ROOT + '__grid--focus', focus));

      return _react2.default.createElement(
        'div',
        { key: 'grid', className: gridClasses },
        _react2.default.createElement(
          'table',
          { ref: function ref(_ref) {
              return _this2.tableRef = _ref;
            }, tabIndex: '0',
            'aria-label': dateSelectorMessage + ' (' + navigationHelpMessage + ')',
            onMouseDown: function onMouseDown() {
              return _this2.setState({ mouseActive: true });
            },
            onMouseUp: function onMouseUp() {
              return _this2.setState({ mouseActive: false });
            },
            onFocus: function onFocus() {
              if (mouseActive === false) {
                _this2.setState({ focus: true });
              }
            },
            onBlur: function onBlur() {
              return _this2.setState({
                activeCell: _this2.state.originalActiveCell,
                focus: false
              });
            } },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              headerCells
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            rows
          )
        )
      );
    }
  }, {
    key: '_renderCalendar',
    value: function _renderCalendar() {
      var format = this.props.format;
      var value = this.state.value;
      var intl = this.context.intl;


      var previousMonthMessage = _Intl2.default.getMessage(intl, 'Previous Month');
      var nextMonthMessage = _Intl2.default.getMessage(intl, 'Next Month');
      var todayMessage = _Intl2.default.getMessage(intl, 'Today');

      var grid = format.match(/D/) ? this._renderGrid() : _react2.default.createElement('span', { key: 'grid' });

      return [_react2.default.createElement(
        _Header2.default,
        { key: 'header', justify: 'between', colorIndex: 'neutral-1' },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__previous',
          icon: _react2.default.createElement(_LinkPrevious2.default, null),
          a11yTitle: previousMonthMessage,
          onClick: this._onPrevious.bind(this, 'month', false) }),
        _react2.default.createElement(
          _Title2.default,
          { className: CLASS_ROOT + '__title', responsive: false },
          value.format('MMMM YYYY')
        ),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__next', icon: _react2.default.createElement(_LinkNext2.default, null),
          a11yTitle: nextMonthMessage,
          onClick: this._onNext.bind(this, 'month', false) })
      ), grid, _react2.default.createElement(
        _Box2.default,
        { key: 'today', alignSelf: 'center', pad: { vertical: 'small' } },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__today', label: todayMessage,
          onClick: this._onToday })
      )];
    }
  }, {
    key: '_renderCounters',
    value: function _renderCounters(includeDate) {
      var _this3 = this;

      var format = this.props.format;
      var value = this.state.value;
      var intl = this.context.intl;

      // break the format up into chunks

      var chunks = [];
      var index = 0;
      while (index < format.length) {
        var chunk = format[index];
        index += 1;
        while (format[index] === chunk[0]) {
          chunk += format[index];
          index += 1;
        }
        chunks.push(chunk);
      }

      var addMessage = _Intl2.default.getMessage(intl, 'Add');
      var subtractMessage = _Intl2.default.getMessage(intl, 'Subtract');

      var elements = chunks.map(function (chunk, index) {
        var unit = UNITS[chunk[0]];
        if (unit) {
          var unitMessage = _Intl2.default.getMessage(intl, unit);
          return _react2.default.createElement(
            _Box2.default,
            { key: index, align: 'center' },
            _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
              a11yTitle: subtractMessage + ' ' + unitMessage,
              onClick: _this3._onPrevious.bind(_this3, unit) }),
            value.format('M' === chunk ? 'MMM' : chunk),
            _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
              a11yTitle: addMessage + ' ' + unitMessage,
              onClick: _this3._onNext.bind(_this3, unit) })
          );
        } else {
          return _react2.default.createElement(
            _Box2.default,
            { key: index, align: 'center', justify: 'center',
              className: 'secondary' },
            chunk
          );
        }
      });

      return _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT + '__time', direction: 'row', alignSelf: 'center',
          responsive: false },
        elements
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var format = this.props.format;


      var calendar = void 0,
          counters = void 0;
      if (DAY_REGEXP.test(format)) {
        calendar = this._renderCalendar();
      }

      if (TIME_REGEXP.test(format) || MONTHYEAR_REGEXP.test(format) && !DAY_REGEXP.test(format)) {
        counters = this._renderCounters(!DAY_REGEXP.test(format));
      }

      return _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT },
        calendar,
        counters
      );
    }
  }]);

  return DateTimeDrop;
}(_react.Component);

DateTimeDrop.displayName = 'DateTimeDrop';
exports.default = DateTimeDrop;


DateTimeDrop.contextTypes = {
  intl: _propTypes2.default.object
};

DateTimeDrop.propTypes = {
  format: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  step: _propTypes2.default.number.isRequired,
  value: _propTypes2.default.object.isRequired
};
module.exports = exports['default'];