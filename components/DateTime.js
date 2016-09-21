'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Clock = require('./icons/base/Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _Calendar = require('./icons/base/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DateTimeDrop = require('./DateTimeDrop');

var _DateTimeDrop2 = _interopRequireDefault(_DateTimeDrop);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DATE_TIME;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;
var DATE_TIME_DROP = _CSSClassnames2.default.DATE_TIME_DROP;
var FORMATS = {
  M: 'months',
  D: 'days',
  Y: 'years',
  H: 'hours',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
};
var TIME_REGEXP = new RegExp('[hmsa]');

var DateTime = function (_Component) {
  (0, _inherits3.default)(DateTime, _Component);

  function DateTime(props, context) {
    (0, _classCallCheck3.default)(this, DateTime);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf2.default)(DateTime)).call(this, props, context));

    _this._onInputChange = _this._onInputChange.bind(_this);
    _this._onOpen = _this._onOpen.bind(_this);
    _this._onForceClose = _this._onForceClose.bind(_this);
    _this._onControlClick = _this._onControlClick.bind(_this);
    _this._onClose = _this._onClose.bind(_this);
    _this._onCloseDrop = _this._onCloseDrop.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._cursorScope = _this._cursorScope.bind(_this);
    _this._notify = _this._notify.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.cursor = -1;
    _this.state.dropActive = false;
    return _this;
  }

  (0, _createClass3.default)(DateTime, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._activation(this.state.dropActive);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(this._stateFromProps(newProps));
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

      if (this.state.cursor >= 0) {
        this.inputRef.setSelectionRange(this.state.cursor, this.state.cursor);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._activation(false);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var value = props.value;
      var format = props.format;

      var result = { current: undefined };
      var date = (0, _moment2.default)(value, format);
      if (date.isValid()) {
        result.current = date;
      } else {
        result.current = (0, _moment2.default)().startOf('hour').add(1, 'hour');
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
    key: '_onInputChange',
    value: function _onInputChange(event) {
      var _props = this.props;
      var format = _props.format;
      var onChange = _props.onChange;

      var value = event.target.value;
      if (value.length > 0) {
        var date = (0, _moment2.default)(value, format);
        // Only notify if the value looks valid
        if (date.isValid() && !date.parsingFlags().charsLeftOver) {
          if (onChange) {
            onChange(value);
          }
        } else if (typeof this.props.value === 'string' && value.length < this.props.value.length) {
          // or if the user is removing characters
          if (onChange) {
            onChange(value);
          }
        }
      } else if (onChange) {
        onChange(value);
      }
    }
  }, {
    key: '_notify',
    value: function _notify(date) {
      if (this.props.onChange) {
        this.props.onChange(date);
      }
    }
  }, {
    key: '_onControlClick',
    value: function _onControlClick(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.dropActive) {
        this.setState({ dropActive: false, cursor: -1 });
      } else {
        this.setState({ dropActive: true });
      }
    }
  }, {
    key: '_onForceClose',
    value: function _onForceClose() {
      this.setState({ dropActive: false, cursor: -1 });
    }
  }, {
    key: '_onOpen',
    value: function _onOpen(event) {
      event.preventDefault();
      this.setState({ dropActive: true });
    }
  }, {
    key: '_onClose',
    value: function _onClose(event) {
      var drop = document.getElementById(DATE_TIME_DROP);
      var isCalendarOnly = !TIME_REGEXP.test(this.props.format);
      if (!(0, _DOM.isDescendant)(this.containerRef, event.target) && !(0, _DOM.isDescendant)(drop, event.target) || isCalendarOnly) {
        this.setState({ dropActive: false, cursor: -1 });
      }
    }
  }, {
    key: '_onCloseDrop',
    value: function _onCloseDrop(event) {
      var drop = document.getElementById(DATE_TIME_DROP);
      if (!(0, _DOM.isDescendant)(drop, event.target)) {
        this.setState({ dropActive: false, cursor: -1 });
      }
    }
  }, {
    key: '_onNext',
    value: function _onNext(event) {
      event.preventDefault();
      var date = this.state.current.clone();
      var scope = this._cursorScope();
      if ('a' === scope) {
        if (date.hours() < 12) {
          date.add(12, 'hours');
        }
      } else if ('m' === scope) {
        date.add(this.props.step, FORMATS[scope]);
      } else {
        date.add(1, FORMATS[scope]);
      }
      this.setState({ current: date }, this._notify(date));
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
      event.preventDefault();
      var date = this.state.current.clone();
      var scope = this._cursorScope();
      if ('a' === scope) {
        if (date.hours() >= 12) {
          date.subtract(12, 'hours');
        }
      } else if ('m' === scope) {
        date.subtract(this.props.step, FORMATS[scope]);
      } else {
        date.subtract(1, FORMATS[scope]);
      }
      this.setState({ current: date }, this._notify(date));
    }
  }, {
    key: '_cursorScope',
    value: function _cursorScope() {
      var format = this.props.format;

      var input = this.inputRef;
      var value = input.value;
      var end = input.selectionEnd;
      this.setState({ cursor: end });
      // Figure out which aspect of the date the cursor is on, so we know what
      // to change.
      var preDate = (0, _moment2.default)(value.slice(0, end + 1), format);
      var formatTokens = format.split(/[^A-Za-z]/);
      var unusedTokens = preDate.parsingFlags().unusedTokens;
      var index = -1;
      while (formatTokens[index + 1] !== unusedTokens[0]) {
        index += 1;
      }
      return formatTokens[index][0];
    }
  }, {
    key: '_activation',
    value: function _activation(dropActive) {
      var listeners = {
        esc: this._onForceClose,
        tab: this._onCloseDrop,
        enter: this._onSelectDate,
        up: this._onPrevious,
        down: this._onNext
      };

      if (dropActive) {

        document.addEventListener('click', this._onClose);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, listeners);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.containerRef, '.' + FORM_FIELD) || this.containerRef;
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
    key: '_renderDrop',
    value: function _renderDrop() {
      return _react2.default.createElement(_DateTimeDrop2.default, { format: this.props.format, value: this.state.current,
        step: this.props.step, onChange: this._notify });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props;
      var className = _props2.className;
      var format = _props2.format;
      var id = _props2.id;
      var name = _props2.name;
      var dropActive = this.state.dropActive;
      var value = this.props.value;

      var classes = [CLASS_ROOT];
      if (dropActive) {
        classes.push(CLASS_ROOT + '--active');
      }
      if (className) {
        classes.push(className);
      }
      if (value instanceof Date) {
        value = (0, _moment2.default)(value).format(format);
      } else if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        value = value.format(format);
      }
      var Icon = TIME_REGEXP.test(format) ? _Clock2.default : _Calendar2.default;

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this2.containerRef = _ref2;
          }, className: classes.join(' ') },
        _react2.default.createElement('input', { ref: function ref(_ref) {
            return _this2.inputRef = _ref;
          }, placeholder: format,
          className: CLASS_ROOT + '__input', id: id, name: name,
          value: value || '', onChange: this._onInputChange }),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', icon: _react2.default.createElement(Icon, null),
          onClick: this._onControlClick })
      );
    }
  }]);
  return DateTime;
}(_react.Component);

DateTime.displayName = 'DateTime';
exports.default = DateTime;


DateTime.propTypes = {
  format: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  step: _react.PropTypes.number,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object])
};

DateTime.defaultProps = {
  format: 'M/D/YYYY h:mm a',
  step: 1
};
module.exports = exports['default'];