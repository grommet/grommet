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

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TITLE;

var Title = function (_Component) {
  (0, _inherits3.default)(Title, _Component);

  function Title() {
    (0, _classCallCheck3.default)(this, Title);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Title).apply(this, arguments));
  }

  (0, _createClass3.default)(Title, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.responsive) {
        classes.push(CLASS_ROOT + "--responsive");
      }
      if (this.props.onClick) {
        classes.push(CLASS_ROOT + "--interactive");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var a11yTitle = this.props.a11yTitle || _Intl2.default.getMessage(this.context.intl, 'Title');

      var content = void 0;
      if (typeof this.props.children === 'string') {
        content = _react2.default.createElement(
          'span',
          null,
          this.props.children
        );
      } else if (Array.isArray(this.props.children)) {
        content = this.props.children.map(function (child, index) {
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
        content = this.props.children;
      }

      return _react2.default.createElement(
        _Box2.default,
        { align: 'center', direction: 'row', responsive: false,
          className: classes.join(' '), a11yTitle: a11yTitle,
          onClick: this.props.onClick },
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