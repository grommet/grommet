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

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TITLE;

var Title = function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          children = _props.children,
          className = _props.className,
          responsive = _props.responsive,
          truncate = _props.truncate,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'children', 'className', 'responsive', 'truncate']);

      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, CLASS_ROOT + '--truncate', truncate), _defineProperty(_classnames, CLASS_ROOT + '--interactive', props.onClick), _classnames), className);

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
        _extends({}, props, { align: 'center', direction: 'row', responsive: false,
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
  a11yTitle: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  responsive: _propTypes2.default.bool,
  truncate: _propTypes2.default.bool
};

Title.contextTypes = {
  intl: _propTypes2.default.object
};

Title.defaultProps = {
  responsive: true,
  truncate: true
};
module.exports = exports['default'];