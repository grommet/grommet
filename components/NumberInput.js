'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.NUMBER_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;

var NumberInput = function (_Component) {
  (0, _inherits3.default)(NumberInput, _Component);

  function NumberInput(props, context) {
    (0, _classCallCheck3.default)(this, NumberInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberInput.__proto__ || (0, _getPrototypeOf2.default)(NumberInput)).call(this, props, context));

    _this._onAdd = _this._onAdd.bind(_this);
    _this._onSubtract = _this._onSubtract.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(NumberInput, [{
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
          props = (0, _objectWithoutProperties3.default)(_props3, ['className', 'disabled']);


      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--disabled', disabled), className);

      var onSubtract = !disabled ? this._onSubtract : undefined;
      var onAdd = !disabled ? this._onAdd : undefined;

      return _react2.default.createElement(
        'span',
        { className: classes },
        _react2.default.createElement('input', (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2._inputRef = _ref;
          } }, props, {
          className: INPUT + ' ' + CLASS_ROOT + '__input',
          type: 'number', tabIndex: '0',
          disabled: disabled })),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null), className: CLASS_ROOT + '__subtract',
          onClick: onSubtract }),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null), className: CLASS_ROOT + '__add',
          onClick: onAdd })
      );
    }
  }]);
  return NumberInput;
}(_react.Component);

NumberInput.displayName = 'NumberInput';
exports.default = NumberInput;


NumberInput.propTypes = {
  defaultValue: _react.PropTypes.number,
  disabled: _react.PropTypes.bool,
  id: _react.PropTypes.string,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  step: _react.PropTypes.number,
  value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};
module.exports = exports['default'];