'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _DOM = require('../utils/DOM');

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Calendar = require('./icons/base/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _LinkPrevious = require('./icons/base/LinkPrevious');

var _LinkPrevious2 = _interopRequireDefault(_LinkPrevious);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CALENDAR;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar(props) {
    (0, _classCallCheck3.default)(this, Calendar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Calendar).call(this, props));

    _this._onInputChange = _this._onInputChange.bind(_this);
    _this._onOpen = _this._onOpen.bind(_this);
    _this._onClose = _this._onClose.bind(_this);
    _this._onClickDay = _this._onClickDay.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onNextDayOrMonth = _this._onNextDayOrMonth.bind(_this);
    _this._onPreviousDayOrMonth = _this._onPreviousDayOrMonth.bind(_this);
    _this._onNextWeek = _this._onNextWeek.bind(_this);
    _this._onPreviousWeek = _this._onPreviousWeek.bind(_this);
    _this._onSelectDate = _this._onSelectDate.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.dropActive = false;
    return _this;
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._activation(this.state.dropActive);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var state = this._stateFromProps(newProps);
      this.setState(state);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // Set up keyboard listeners appropriate to the current state.
      if (prevState.dropActive !== this.state.dropActive) {
        this._activation(this.state.dropActive);
      }

      if (this.state.dropActive) {
        this._drop.render(this._renderDrop());
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._activation(false);
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event.target.value);
      }
    }
  }, {
    key: '_onOpen',
    value: function _onOpen(event) {
      event.preventDefault();
      this.setState({ dropActive: true });
    }
  }, {
    key: '_onClose',
    value: function _onClose() {
      this.setState({ dropActive: false });
    }
  }, {
    key: '_onClickDay',
    value: function _onClickDay(date) {
      if (this.props.onChange) {
        this.props.onChange((0, _moment2.default)(date).format('YYYY-MM-DD'));
      }
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
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
  }, {
    key: '_onNext',
    value: function _onNext(event) {
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
  }, {
    key: '_onNextDayOrMonth',
    value: function _onNextDayOrMonth(event) {
      if (event.shiftKey) {
        this._onNext(event);
      } else {
        event.preventDefault();
        event.stopPropagation();
        var nextDay = (0, _moment2.default)(this.state.current).add(1, 'days');

        if (!nextDay.isSame(this.state.reference, 'month')) {
          this.setState({ reference: this.state.reference.add(1, 'month'), current: nextDay });
        } else {
          this.setState({ current: nextDay });
        }
      }
    }
  }, {
    key: '_onPreviousDayOrMonth',
    value: function _onPreviousDayOrMonth(event) {
      if (event.shiftKey) {
        this._onPrevious(event);
      } else {
        event.preventDefault();
        event.stopPropagation();
        var previousDay = (0, _moment2.default)(this.state.current).subtract(1, 'days');
        if (!previousDay.isSame(this.state.reference, 'month')) {
          this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousDay });
        } else {
          this.setState({ current: previousDay });
        }
      }
    }
  }, {
    key: '_onNextWeek',
    value: function _onNextWeek(event) {
      event.preventDefault();
      event.stopPropagation();
      var nextWeek = (0, _moment2.default)(this.state.current).add(1, 'week');

      if (!nextWeek.isSame(this.state.reference, 'month')) {
        this.setState({ reference: this.state.reference.add(1, 'month'), current: nextWeek });
      } else {
        this.setState({ current: nextWeek });
      }
    }
  }, {
    key: '_onPreviousWeek',
    value: function _onPreviousWeek(event) {
      event.preventDefault();
      event.stopPropagation();
      var previousWeek = (0, _moment2.default)(this.state.current).subtract(1, 'week');
      if (!previousWeek.isSame(this.state.reference, 'month')) {
        this.setState({ reference: this.state.reference.subtract(1, 'month'), current: previousWeek });
      } else {
        this.setState({ current: previousWeek });
      }
    }
  }, {
    key: '_onSelectDate',
    value: function _onSelectDate(event) {
      event.preventDefault();
      event.stopPropagation();
      this._onClickDay(this.state.current);
      this._onClose();
    }
  }, {
    key: '_activation',
    value: function _activation(dropActive) {

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
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, listeners);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.refs.component, '.' + FORM_FIELD) || this.refs.component;
        this._drop = _Drop2.default.add(control, this._renderDrop(), { align: { top: 'bottom', left: 'left' } });
      } else {

        document.removeEventListener('click', this._onClose);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, listeners);

        if (this._drop) {
          this._drop.remove();
          this._drop = null;
        }
      }
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var result = {
        current: null,
        reference: (0, _moment2.default)().startOf('day')
      };
      var date = (0, _moment2.default)(props.value);
      if (date.isValid()) {
        result.current = (0, _moment2.default)(date).startOf('day');
        result.reference = (0, _moment2.default)(date).startOf('day');
      }
      return result;
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var headerCells = weekDays.map(function (day) {
        return _react2.default.createElement(
          'th',
          { key: day },
          day
        );
      });

      var reference = this.state.reference;
      var start = (0, _moment2.default)(reference).startOf('month').startOf('week');
      var end = (0, _moment2.default)(reference).endOf('month').endOf('week');
      var date = (0, _moment2.default)(start);
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
          days.push(_react2.default.createElement(
            'td',
            { key: date.valueOf() },
            _react2.default.createElement(
              'div',
              { className: classes.join(' '),
                onClick: this._onClickDay.bind(this, (0, _moment2.default)(date)) },
              date.date()
            )
          ));
          date.add(1, 'days');
        }
        rows.push(_react2.default.createElement(
          'tr',
          { key: date.valueOf() },
          days
        ));
      }

      return _react2.default.createElement(
        'div',
        { id: CLASS_ROOT + "-drop", className: CLASS_ROOT + "__drop",
          onClick: this._onClose },
        _react2.default.createElement(
          _Header2.default,
          { justify: 'between' },
          _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__previous", icon: _react2.default.createElement(_LinkPrevious2.default, { a11yTitle: 'calendar-previous-title',
              a11yTitleId: 'calendar-previous-title-id' }),
            onClick: this._onPrevious }),
          _react2.default.createElement(
            _Title2.default,
            { className: CLASS_ROOT + "__title", responsive: false },
            this.state.reference.format('MMMM YYYY')
          ),
          _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__next", icon: _react2.default.createElement(_LinkNext2.default, { a11yTitle: 'calendar-next-title',
              a11yTitleId: 'calendar-next-title-id' }),
            onClick: this._onNext })
        ),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + "__grid" },
          _react2.default.createElement(
            'table',
            null,
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
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.state.dropActive) {
        classes.push(CLASS_ROOT + "--active");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      return _react2.default.createElement(
        'div',
        { ref: 'component', className: classes.join(' ') },
        _react2.default.createElement('input', { className: CLASS_ROOT + "__input",
          id: this.props.id, ref: 'calendarInput', name: this.props.name,
          value: this.props.value,
          onChange: this._onInputChange }),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + "__control", icon: _react2.default.createElement(_Calendar2.default, {
            a11yTitle: 'calendar-icon-title',
            a11yTitleId: 'calendar-icon-title-id' }),
          onClick: this._onOpen })
      );
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.displayName = 'Calendar';
exports.default = Calendar;


Calendar.propTypes = {
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string
};

Calendar.defaultProps = {
  value: (0, _moment2.default)().format('YYYY-MM-DD')
};
module.exports = exports['default'];