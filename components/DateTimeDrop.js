'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.DATE_TIME_DROP; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var DATE_REGEXP = new RegExp('[MDY]');
var TIME_REGEXP = new RegExp('[hHmsa]');

var DateTimeDrop = function (_Component) {
  (0, _inherits3.default)(DateTimeDrop, _Component);

  function DateTimeDrop(props, context) {
    (0, _classCallCheck3.default)(this, DateTimeDrop);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTimeDrop.__proto__ || (0, _getPrototypeOf2.default)(DateTimeDrop)).call(this, props, context));

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

    _this._buildDateRows();
    return _this;
  }

  (0, _createClass3.default)(DateTimeDrop, [{
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
      state = state || this.state;
      var _state = state,
          timeOfDay = _state.timeOfDay,
          value = _state.value;

      var start = (0, _moment2.default)(value).startOf('month').startOf('week').add(timeOfDay);
      var end = (0, _moment2.default)(value).endOf('month').endOf('week').add(timeOfDay);
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
      var _state2 = this.state,
          activeCell = _state2.activeCell,
          dateRows = _state2.dateRows;
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
      var _state3 = this.state,
          dateRows = _state3.dateRows,
          activeCell = _state3.activeCell;

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
      var _state4 = this.state,
          activeCell = _state4.activeCell,
          dateRows = _state4.dateRows;

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
      var _props3 = this.props,
          format = _props3.format,
          step = _props3.step,
          onChange = _props3.onChange;
      var _state5 = this.state,
          stepScope = _state5.stepScope,
          value = _state5.value;

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
      onChange(newValue.format(format));
    }
  }, {
    key: '_onNext',
    value: function _onNext(scope) {
      var _props4 = this.props,
          format = _props4.format,
          step = _props4.step,
          onChange = _props4.onChange;
      var _state6 = this.state,
          stepScope = _state6.stepScope,
          value = _state6.value;

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
      onChange(newValue.format(format));
    }
  }, {
    key: '_renderDate',
    value: function _renderDate() {
      var _this2 = this;

      var _state7 = this.state,
          activeCell = _state7.activeCell,
          dateRows = _state7.dateRows,
          focus = _state7.focus,
          mouseActive = _state7.mouseActive,
          value = _state7.value;
      var intl = this.context.intl;


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

          var classes = (0, _classnames4.default)(CLASS_ROOT + '__day', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__day--active', date.isSame(value, 'day')), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__day--hover', !date.isSame(value, 'day') && [rowIndex, columnIndex].toString() === activeCell.toString()), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__day--other-month', !date.isSame(value, 'month')), _classnames));
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

      var previousMonthMessage = _Intl2.default.getMessage(intl, 'Previous Month');
      var nextMonthMessage = _Intl2.default.getMessage(intl, 'Next Month');
      var todayMessage = _Intl2.default.getMessage(intl, 'Today');
      var dateSelectorMessage = _Intl2.default.getMessage(intl, 'Date Selector');
      var navigationHelpMessage = _Intl2.default.getMessage(intl, 'Navigation Help');

      var gridClasses = (0, _classnames4.default)(CLASS_ROOT + '__grid', (0, _defineProperty3.default)({}, CLASS_ROOT + '__grid--focus', focus));
      return [_react2.default.createElement(
        _Header2.default,
        { key: 'header', justify: 'between', colorIndex: 'neutral-1' },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__previous',
          icon: _react2.default.createElement(_LinkPrevious2.default, null), a11yTitle: previousMonthMessage,
          onClick: this._onPrevious.bind(this, 'month') }),
        _react2.default.createElement(
          _Title2.default,
          { className: CLASS_ROOT + '__title', responsive: false },
          value.format('MMMM YYYY')
        ),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__next', icon: _react2.default.createElement(_LinkNext2.default, null),
          a11yTitle: nextMonthMessage,
          onClick: this._onNext.bind(this, 'month') })
      ), _react2.default.createElement(
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
      ), _react2.default.createElement(
        _Box2.default,
        { key: 'today', pad: { vertical: 'small' } },
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__today', label: todayMessage,
          onClick: this._onToday })
      )];
    }
  }, {
    key: '_renderTime',
    value: function _renderTime() {
      var format = this.props.format;
      var value = this.state.value;
      var intl = this.context.intl;

      var addMessage = _Intl2.default.getMessage(intl, 'Add');
      var subtractMessage = _Intl2.default.getMessage(intl, 'Subtract');
      var hourMessage = _Intl2.default.getMessage(intl, 'hour');
      var minuteMessage = _Intl2.default.getMessage(intl, 'minute');
      var secondMessage = _Intl2.default.getMessage(intl, 'second');
      var elements = [];
      if (format.indexOf('h') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'hour', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            a11yTitle: subtractMessage + ' ' + hourMessage,
            onClick: this._onPrevious.bind(this, 'hour') }),
          value.format('h'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            a11yTitle: addMessage + ' ' + hourMessage,
            onClick: this._onNext.bind(this, 'hour') })
        ));
      } else if (format.indexOf('H') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'hour', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            a11yTitle: subtractMessage + ' ' + hourMessage,
            onClick: this._onPrevious.bind(this, 'hour') }),
          value.format('H'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            a11yTitle: addMessage + ' ' + hourMessage,
            onClick: this._onNext.bind(this, 'hour') })
        ));
      }
      if (format.indexOf('m') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'minute', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            a11yTitle: subtractMessage + ' ' + minuteMessage,
            onClick: this._onPrevious.bind(this, 'minute') }),
          value.format('mm'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            a11yTitle: addMessage + ' ' + minuteMessage,
            onClick: this._onNext.bind(this, 'minute') })
        ));
      }
      if (format.indexOf('s') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'second', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            a11yTitle: subtractMessage + ' ' + secondMessage,
            onClick: this._onPrevious.bind(this, 'second') }),
          value.format('ss'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            a11yTitle: addMessage + ' ' + secondMessage,
            onClick: this._onNext.bind(this, 'second') })
        ));
      }
      if (format.indexOf('a') !== -1) {
        elements.push(_react2.default.createElement(
          _Box2.default,
          { key: 'ampm', align: 'center' },
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
            a11yTitle: subtractMessage + ' am, pm',
            onClick: this._onPrevious.bind(this, 'ampm') }),
          value.format('a'),
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
            a11yTitle: addMessage + ' am, pm',
            onClick: this._onNext.bind(this, 'ampm') })
        ));
      }
      return _react2.default.createElement(
        _Box2.default,
        { direction: 'row', className: CLASS_ROOT + '__time',
          responsive: false },
        elements
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var format = this.props.format;


      var date = void 0,
          time = void 0;
      if (DATE_REGEXP.test(format)) {
        date = this._renderDate();
      }

      if (TIME_REGEXP.test(format)) {
        time = this._renderTime();
      }

      return _react2.default.createElement(
        _Box2.default,
        { className: CLASS_ROOT, align: 'center' },
        date,
        time
      );
    }
  }]);
  return DateTimeDrop;
}(_react.Component);

DateTimeDrop.displayName = 'DateTimeDrop';
exports.default = DateTimeDrop;


DateTimeDrop.contextTypes = {
  intl: _react.PropTypes.object
};

DateTimeDrop.propTypes = {
  format: _react.PropTypes.string,
  onChange: _react.PropTypes.func.isRequired,
  step: _react.PropTypes.number.isRequired,
  value: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];