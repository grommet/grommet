// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashObjectPick = require('lodash/object/pick');

var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);

var _lodashObjectKeys = require('lodash/object/keys');

var _lodashObjectKeys2 = _interopRequireDefault(_lodashObjectKeys);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var CLASS_ROOT = "footer";

var Footer = (function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      var containerClasses = [CLASS_ROOT + "__container"];
      var other = (0, _lodashObjectPick2['default'])(this.props, (0, _lodashObjectKeys2['default'])(_Box2['default'].propTypes));
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      } else if (this.props.large) {
        // Deprecated
        classes.push(CLASS_ROOT + "--large");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      if (this.props.float) {
        classes.push(CLASS_ROOT + "--float");
        containerClasses.push(CLASS_ROOT + "__container--float");
      }

      var footerSkipLink;
      if (this.props.primary) {
        footerSkipLink = _react2['default'].createElement(_SkipLinkAnchor2['default'], { label: 'Footer' });
      }

      return _react2['default'].createElement(
        _Box2['default'],
        _extends({ tag: 'footer' }, other, { className: classes.join(' '),
          containerClassName: containerClasses.join(' ') }),
        footerSkipLink,
        this.props.children
      );
    }
  }]);

  return Footer;
})(_react.Component);

exports['default'] = Footer;

Footer.propTypes = _extends({
  primary: _react.PropTypes.bool,
  large: _react.PropTypes.bool, // Deprecated
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  small: _react.PropTypes.bool, // Deprecated
  float: _react.PropTypes.bool
}, _Box2['default'].propTypes);

Footer.defaultProps = {
  pad: 'none',
  direction: 'row',
  responsive: false
};
module.exports = exports['default'];