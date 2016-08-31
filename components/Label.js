'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LABEL;

var Label = function (_Component) {
  (0, _inherits3.default)(Label, _Component);

  function Label() {
    (0, _classCallCheck3.default)(this, Label);
    return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).apply(this, arguments));
  }

  (0, _createClass3.default)(Label, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var margin = _props.margin;
      var size = _props.size;

      margin = margin ? margin : 'small' === size ? 'none' : 'medium';
      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--uppercase', this.props.uppercase), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--margin-' + margin, margin), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), _classnames));
      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Label.propTypes));

      return _react2.default.createElement(
        'label',
        (0, _extends3.default)({}, restProps, { className: classes, htmlFor: this.props.labelFor }),
        this.props.children
      );
    }
  }]);
  return Label;
}(_react.Component);

Label.displayName = 'Label';
exports.default = Label;
;

Label.propTypes = {
  labelFor: _react.PropTypes.string,
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium']),
  uppercase: _react.PropTypes.bool
};

Label.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];