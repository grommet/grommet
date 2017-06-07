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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.STATUS_ICON;

var _lastId = 0;

var CriticalStatus = function (_Component) {
  _inherits(CriticalStatus, _Component);

  function CriticalStatus() {
    _classCallCheck(this, CriticalStatus);

    return _possibleConstructorReturn(this, (CriticalStatus.__proto__ || Object.getPrototypeOf(CriticalStatus)).apply(this, arguments));
  }

  _createClass(CriticalStatus, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'className']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, CLASS_ROOT + '-critical', className);
      // generate an id to avoid duplication in the DOM
      var maskId = 'mask-critical-' + _lastId++;
      return _react2.default.createElement(
        'svg',
        _extends({}, props, { className: classes, viewBox: '0 0 24 24', role: 'img',
          version: '1.1', 'aria-label': a11yTitle }),
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'mask',
            { id: maskId },
            _react2.default.createElement(
              'g',
              { className: CLASS_ROOT + '__detail' },
              _react2.default.createElement('rect', { x: '0', y: '0', width: '24', height: '24', fill: '#fff' }),
              _react2.default.createElement('path', { d: 'M8,8 L16,16', strokeWidth: '2', stroke: '#000', fill: 'none' }),
              _react2.default.createElement('path', { d: 'M8,16 L16,8', strokeWidth: '2', stroke: '#000', fill: 'none' })
            )
          )
        ),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__base', mask: 'url(#' + maskId + ')' },
          _react2.default.createElement('path', { d: 'M12,0 L24,12 L12,24 L0,12 Z', stroke: 'none' })
        )
      );
    }
  }]);

  return CriticalStatus;
}(_react.Component);

CriticalStatus.displayName = 'CriticalStatus';
exports.default = CriticalStatus;


CriticalStatus.propTypes = {
  a11yTitle: _propTypes2.default.string,
  className: _propTypes2.default.string
};

CriticalStatus.defaultProps = {
  a11yTitle: 'Critical'
};
module.exports = exports['default'];