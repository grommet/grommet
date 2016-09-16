'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var children = _props.children;
      var className = _props.className;
      var onClick = _props.onClick;
      var responsive = _props.responsive;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--interactive', onClick), _classnames));

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
              { key: 'title_' + index },
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
        { align: 'center', direction: 'row', responsive: false,
          className: classes, a11yTitle: boxTitle,
          onClick: onClick },
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