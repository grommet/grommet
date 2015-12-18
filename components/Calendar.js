// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilsKeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _utilsKeyboardAccelerators2 = _interopRequireDefault(_utilsKeyboardAccelerators);

var _utilsDrop = require('../utils/Drop');

var _utilsDrop2 = _interopRequireDefault(_utilsDrop);

var _iconsBaseCalendar = require('./icons/base/Calendar');

var _iconsBaseCalendar2 = _interopRequireDefault(_iconsBaseCalendar);

var _iconsBaseLinkPrevious = require('./icons/base/LinkPrevious');

var _iconsBaseLinkPrevious2 = _interopRequireDefault(_iconsBaseLinkPrevious);

var _iconsBaseLinkNext = require('./icons/base/LinkNext');

var _iconsBaseLinkNext2 = _interopRequireDefault(_iconsBaseLinkNext);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var CLASS_ROOT = "calendar";

var Calendar = (function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);

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

  _createClass(Calendar, [{
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
        this.props.onChange((0, _moment2['default'])(date).format('YYYY-MM-DD'));
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
        var nextDay = (0, _moment2['default'])(this.state.current).add(1, 'days');

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
        var previousDay = (0, _moment2['default'])(this.state.current).subtract(1, 'days');
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
      var nextWeek = (0, _moment2['default'])(this.state.current).add(1, 'week');

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
      var previousWeek = (0, _moment2['default'])(this.state.current).subtract(1, 'week');
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
        _utilsKeyboardAccelerators2['default'].startListeningToKeyboard(this, listeners);

        this._drop = _utilsDrop2['default'].add(_reactDom2['default'].findDOMNode(this.refs.component), this._renderDrop(), { top: 'bottom', left: 'left' });
      } else {

        document.removeEventListener('click', this._onClose);
        _utilsKeyboardAccelerators2['default'].stopListeningToKeyboard(this, listeners);

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
        reference: (0, _moment2['default'])().startOf('day')
      };
      var date = (0, _moment2['default'])(props.value);
      if (date.isValid()) {
        result.current = (0, _moment2['default'])(date).startOf('day');
        result.reference = (0, _moment2['default'])(date).startOf('day');
      }
      return result;
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var headerCells = weekDays.map(function (day) {
        return _react2['default'].createElement(
          'th',
          { key: day },
          day
        );
      });

      var reference = this.state.reference;
      var start = (0, _moment2['default'])(reference).startOf('month').startOf('week');
      var end = (0, _moment2['default'])(reference).endOf('month').endOf('week');
      var date = (0, _moment2['default'])(start);
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
          days.push(_react2['default'].createElement(
            'td',
            { key: date.valueOf() },
            _react2['default'].createElement(
              'div',
              { className: classes.join(' '),
                onClick: this._onClickDay.bind(this, (0, _moment2['default'])(date)) },
              date.date()
            )
          ));
          date.add(1, 'days');
        }
        rows.push(_react2['default'].createElement(
          'tr',
          { key: date.valueOf() },
          days
        ));
      }

      return _react2['default'].createElement(
        'div',
        { id: CLASS_ROOT + "-drop", className: CLASS_ROOT + "__drop",
          onClick: this._onClose },
        _react2['default'].createElement(
          _Header2['default'],
          { justify: 'between' },
          _react2['default'].createElement(
            _Button2['default'],
            { className: CLASS_ROOT + "__previous", type: 'icon',
              onClick: this._onPrevious },
            _react2['default'].createElement(_iconsBaseLinkPrevious2['default'], null)
          ),
          _react2['default'].createElement(
            _Title2['default'],
            { className: CLASS_ROOT + "__title", responsive: false },
            this.state.reference.format('MMMM YYYY')
          ),
          _react2['default'].createElement(
            _Button2['default'],
            { className: CLASS_ROOT + "__next", type: 'icon',
              onClick: this._onNext },
            _react2['default'].createElement(_iconsBaseLinkNext2['default'], null)
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__grid" },
          _react2['default'].createElement(
            'table',
            null,
            _react2['default'].createElement(
              'thead',
              null,
              _react2['default'].createElement(
                'tr',
                null,
                headerCells
              )
            ),
            _react2['default'].createElement(
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

      return _react2['default'].createElement(
        'div',
        { ref: 'component', className: classes.join(' ') },
        _react2['default'].createElement('input', { className: CLASS_ROOT + "__input",
          id: this.props.id, ref: 'calendarInput', name: this.props.name,
          value: this.props.value,
          onChange: this._onInputChange }),
        _react2['default'].createElement(
          _Button2['default'],
          { className: CLASS_ROOT + "__control", type: 'icon', onClick: this._onOpen },
          _react2['default'].createElement(_iconsBaseCalendar2['default'], null)
        )
      );
    }
  }]);

  return Calendar;
})(_react.Component);

Calendar.propTypes = {
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  value: _react.PropTypes.string
};

Calendar.defaultProps = {
  value: (0, _moment2['default'])().format('YYYY-MM-DD')
};

module.exports = Calendar;