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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VALUE; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Value = function (_Component) {
  (0, _inherits3.default)(Value, _Component);

  function Value() {
    (0, _classCallCheck3.default)(this, Value);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Value).apply(this, arguments));
  }

  (0, _createClass3.default)(Value, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.announce) {
        (0, _Announcer.announce)(this.refs.value.textContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.align) {
        classes.push(CLASS_ROOT + '--align-' + this.props.align);
      }
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + '--interactive');
      }
      if (this.props.colorIndex) {
        classes.push(COLOR_INDEX + '-' + this.props.colorIndex);
      }
      if (this.props.active) {
        classes.push(CLASS_ROOT + '--active');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var units = void 0;
      if (this.props.units) {
        units = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__units' },
          this.props.units
        );
      }

      var label = void 0;
      if (this.props.label) {
        label = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          this.props.label
        );
      }

      return _react2.default.createElement(
        'div',
        { ref: 'value', className: classes.join(' '),
          onClick: this.props.onClick },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__annotated' },
          this.props.icon,
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__value' },
            this.props.value
          ),
          units,
          this.props.trendIcon
        ),
        label
      );
    }
  }]);
  return Value;
}(_react.Component);

Value.displayName = 'Value';
exports.default = Value;


Value.propTypes = {
  active: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  announce: _react.PropTypes.bool,
  colorIndex: _react.PropTypes.string,
  icon: _react.PropTypes.node,
  label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
  onClick: _react.PropTypes.func,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  trendIcon: _react.PropTypes.node,
  value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string, _react.PropTypes.node]),
  units: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node])
};

Value.defaultProps = {
  align: 'center',
  announce: false
};
module.exports = exports['default'];