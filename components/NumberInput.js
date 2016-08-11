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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Add = require('./icons/base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _Subtract = require('./icons/base/Subtract');

var _Subtract2 = _interopRequireDefault(_Subtract);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.NUMBER_INPUT; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var NumberInput = function (_Component) {
  (0, _inherits3.default)(NumberInput, _Component);

  function NumberInput(props, context) {
    (0, _classCallCheck3.default)(this, NumberInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NumberInput).call(this, props, context));

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
      this.refs.input.dispatchEvent(event);
      // Manually dispatched events aren't delivered by React, so we notify too.
      this.props.onChange(event);
    }
  }, {
    key: '_onAdd',
    value: function _onAdd() {
      var input = this.refs.input;
      try {
        input.stepUp();
      } catch (e) {
        // IE11 workaround. See known issue #5 at
        // http://caniuse.com/#search=number
        var value = (parseInt(input.value, 10) || 0) + (this.props.step || 1);
        if (this.props.max !== undefined) {
          value = Math.min(value, this.props.max);
        }
        input.value = value;
      }
      this._fireChange();
    }
  }, {
    key: '_onSubtract',
    value: function _onSubtract() {
      var input = this.refs.input;
      try {
        input.stepDown();
      } catch (e) {
        // IE11 workaround. See known issue #5 at
        // http://caniuse.com/#search=number
        var value = (parseInt(input.value, 10) || 0) - (this.props.step || 1);
        if (this.props.min !== undefined) {
          value = Math.max(value, this.props.min);
        }
        input.value = value;
      }
      this._fireChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var labelId = 'number-label';
      if (this.props.disabled) {
        classes.push(CLASS_ROOT + "--disabled");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var onSubtract = !this.props.disabled ? this._onSubtract : undefined;
      var onAdd = !this.props.disabled ? this._onAdd : undefined;

      return _react2.default.createElement(
        'span',
        { className: classes.join(' '),
          'aria-describedby': this.props.ariaDescribedby,
          'aria-labelledby': labelId },
        _react2.default.createElement('input', { ref: 'input', tabIndex: '0', className: CLASS_ROOT + "__input",
          id: this.props.id, name: this.props.name, type: 'number',
          disabled: this.props.disabled,
          value: this.props.value,
          defaultValue: this.props.defaultValue,
          min: this.props.min,
          max: this.props.max,
          step: this.props.step,
          onChange: this.props.onChange }),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Subtract2.default, null), className: CLASS_ROOT + "__subtract",
          onClick: onSubtract }),
        _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null), className: CLASS_ROOT + "__add",
          onClick: onAdd })
      );
    }
  }]);
  return NumberInput;
}(_react.Component);

NumberInput.displayName = 'NumberInput';
exports.default = NumberInput;


NumberInput.propTypes = {
  ariaDescribedby: _react.PropTypes.string,
  defaultValue: _react.PropTypes.number,
  disabled: _react.PropTypes.bool,
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  onChange: _react.PropTypes.func,
  step: _react.PropTypes.number,
  value: _react.PropTypes.number
};
module.exports = exports['default'];