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

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TITLE; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Title = function (_Component) {
  (0, _inherits3.default)(Title, _Component);

  function Title() {
    (0, _classCallCheck3.default)(this, Title);
    return (0, _possibleConstructorReturn3.default)(this, (Title.__proto__ || (0, _getPrototypeOf2.default)(Title)).apply(this, arguments));
  }

  (0, _createClass3.default)(Title, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          children = _props.children,
          className = _props.className,
          responsive = _props.responsive,
          props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'children', 'className', 'responsive']);
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--interactive', props.onClick), _classnames), className);

      var boxTitle = a11yTitle || _Intl2.default.getMessage(intl, 'Title');

      var content = void 0;
      if (typeof children === 'string') {
        content = _react2.default.createElement(
          'span',
          null,
          children
        );
      } else if (Array.isArray(children)) {
        content = children.map(function (child, index) {
          if (child && typeof child === 'string') {
            return _react2.default.createElement(
              'span',
              { key: index },
              child
            );
          }
          return child;
        });
      } else {
        content = children;
      }

      return _react2.default.createElement(
        _Box2.default,
        (0, _extends3.default)({}, props, { align: 'center', direction: 'row', responsive: false,
          className: classes, a11yTitle: boxTitle }),
        content
      );
    }
  }]);
  return Title;
}(_react.Component);

Title.displayName = 'Title';
exports.default = Title;


Title.propTypes = {
  a11yTitle: _react.PropTypes.string,
  onClick: _react.PropTypes.func,
  responsive: _react.PropTypes.bool
};

Title.contextTypes = {
  intl: _react.PropTypes.object
};

Title.defaultProps = {
  responsive: true
};
module.exports = exports['default'];