'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHECK_BOX; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CheckBox = function (_Component) {
  (0, _inherits3.default)(CheckBox, _Component);

  function CheckBox() {
    (0, _classCallCheck3.default)(this, CheckBox);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CheckBox).apply(this, arguments));
  }

  (0, _createClass3.default)(CheckBox, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(CheckBox.propTypes));
      var label = void 0;
      var labelId = CLASS_ROOT + '-label';
      if (this.props.label) {
        label = _react2.default.createElement(
          'span',
          { key: 'label', role: 'label', id: labelId,
            className: CLASS_ROOT + '__label' },
          this.props.label
        );
      }

      if (this.props.toggle) {
        classes.push(CLASS_ROOT + '--toggle');
      }

      var hidden = void 0;
      if (this.props.disabled) {
        classes.push(CLASS_ROOT + '--disabled');
        if (this.props.checked) {
          hidden = _react2.default.createElement('input', { name: this.props.name, type: 'hidden', value: 'true' });
        }
      }

      if (this.props.className) {
        classes.push(this.props.className);
      }

      var children = [_react2.default.createElement(
        'span',
        { key: 'checkbox' },
        _react2.default.createElement('input', { tabIndex: '0', className: CLASS_ROOT + '__input',
          id: this.props.id, name: this.props.name, type: 'checkbox',
          disabled: this.props.disabled,
          checked: this.props.checked,
          defaultChecked: this.props.defaultChecked,
          onChange: this.props.onChange,
          ref: 'input' }),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__control' },
          _react2.default.createElement(
            'svg',
            { className: CLASS_ROOT + '__control-check', viewBox: '0 0 24 24',
              preserveAspectRatio: 'xMidYMid meet' },
            _react2.default.createElement('path', { fill: 'none', d: 'M6,11.3 L10.3,16 L18,6.2' })
          )
        )
      ), label];

      return _react2.default.createElement(
        'label',
        (0, _extends3.default)({}, restProps, {
          className: classes.join(' '),
          'aria-labelledby': labelId }),
        this.props.reverse ? children.reverse() : children,
        hidden
      );
    }
  }, {
    key: 'checked',
    set: function set(value) {
      if ('refs' in this) {
        this.refs.input.checked = !!value;
      }
    },
    get: function get() {
      return 'refs' in this ? this.refs.input.checked : null;
    }
  }]);
  return CheckBox;
}(_react.Component);

CheckBox.displayName = 'CheckBox';
exports.default = CheckBox;


CheckBox.propTypes = {
  checked: _react.PropTypes.bool,
  defaultChecked: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  id: _react.PropTypes.string.isRequired,
  label: _react.PropTypes.node,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  reverse: _react.PropTypes.bool,
  toggle: _react.PropTypes.bool
};
module.exports = exports['default'];