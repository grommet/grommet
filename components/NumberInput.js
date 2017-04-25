'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Add = require('./icons/base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _Subtract = require('./icons/base/Subtract');

var _Subtract2 = _interopRequireDefault(_Subtract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.NUMBER_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;

var NumberInput = function (_Component) {
  _inherits(NumberInput, _Component);

  function NumberInput(props, context) {
    _classCallCheck(this, NumberInput);

    var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props, context));

    _this._onAdd = _this._onAdd.bind(_this);
    _this._onSubtract = _this._onSubtract.bind(_this);
    return _this;
  }

  _createClass(NumberInput, [{
    key: '_fireChange',
    value: function _fireChange() {
      var event = void 0;
      try {
        event = new Event('change', {
          'bubbles': true,
          'cancelable': true
        });
      } catch (e) {
        // IE11 workaround.
        event = document.createEvent('Event');
        event.initEvent('change', true, true);
      }
      // We use dispatchEvent to have the browser fill out the event fully.
      this._inputRef.dispatchEvent(event);
      // Manually dispatched events aren't delivered by React, so we notify too.
      this.props.onChange(event);
    }
  }, {
    key: '_onAdd',
    value: function _onAdd() {
      var _props = this.props,
          max = _props.max,
          step = _props.step;

      var input = this._inputRef;
      try {
        input.stepUp();
      } catch (e) {
        // IE11 workaround. See known issue #5 at
        // http://caniuse.com/#search=number
        var value = (parseFloat(input.value) || 0) + (step || 1);
        if (max !== undefined) {
          value = Math.min(value, max);
        }
        input.value = value;
      }
      this._fireChange();
    }
  }, {
    key: '_onSubtract',
    value: function _onSubtract() {
      var _props2 = this.props,
          min = _props2.min,
          step = _props2.step;

      var input = this._inputRef;
      try {
        input.stepDown();
      } catch (e) {
        // IE11 workaround. See known issue #5 at
        // http://caniuse.com/#search=number
        var value = (parseFloat(input.value) || 0) - (step || 1);
        if (min !== undefined) {
          value = Math.max(value, min);
        }
        input.value = value;
      }
      this._fireChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          className = _props3.className,
          disabled = _props3.disabled,
          props = _objectWithoutProperties(_props3, ['className', 'disabled']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--disabled', disabled), className);

      var onSubtract = !disabled ? this._onSubtract : undefined;
      var onAdd = !disabled ? this._onAdd : undefined;

      return _react2.default.createElement(
        'span',
        { className: classes },
        _react2.default.createElement('input', _extends({ ref: function ref(_ref) {
            return _this2._inputRef = _ref;
          } }, props, {
          className: INPUT + ' ' + CLASS_ROOT + '__input',
          type: 'number', tabIndex: '0',
          disabled: disabled })),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null),
          className: CLASS_ROOT + '__subtract', onClick: onSubtract }),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null),
          className: CLASS_ROOT + '__add', onClick: onAdd })
      );
    }
  }]);

  return NumberInput;
}(_react.Component);

NumberInput.displayName = 'NumberInput';
exports.default = NumberInput;


NumberInput.propTypes = {
  defaultValue: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  step: _propTypes2.default.number,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};
module.exports = exports['default'];