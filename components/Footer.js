'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _SkipLinkAnchor = require('./SkipLinkAnchor');

var _SkipLinkAnchor2 = _interopRequireDefault(_SkipLinkAnchor);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'footer';

var Footer = function Footer(props) {
  var _classnames;

  if (!props.size) {
    // Restore size value from deprecated props
    if (props.small) {
      props.size = 'small';
    } else if (props.large) {
      props.size = 'large';
    }
  }

  var classes = (0, _classnames4.default)(CLASS_ROOT, props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + props.size, props.size), _defineProperty(_classnames, CLASS_ROOT + '--float', props.float), _classnames));

  var containerClasses = (0, _classnames4.default)(CLASS_ROOT + '__container', _defineProperty({}, CLASS_ROOT + '__container--float', props.float));

  var footerSkipLink = undefined;
  if (props.primary) {
    footerSkipLink = _react2.default.createElement(_SkipLinkAnchor2.default, { label: 'Footer' });
  }

  var boxProps = _Props2.default.pick(props, _Box2.default);

  return _react2.default.createElement(
    _Box2.default,
    _extends({}, boxProps, { tag: 'footer', className: classes,
      containerClassName: containerClasses }),
    footerSkipLink,
    props.children
  );
};

Footer.propTypes = _extends({
  float: _react.PropTypes.bool,
  large: _react.PropTypes.bool, // Deprecated
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  primary: _react.PropTypes.bool,
  small: _react.PropTypes.bool }, _Box2.default.propTypes);

Footer.defaultProps = {
  direction: 'row',
  responsive: false
};

Footer.displayName = 'Footer';

exports.default = Footer;
module.exports = exports['default'];