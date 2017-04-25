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

var Warning = function (_Component) {
  _inherits(Warning, _Component);

  function Warning() {
    _classCallCheck(this, Warning);

    return _possibleConstructorReturn(this, (Warning.__proto__ || Object.getPrototypeOf(Warning)).apply(this, arguments));
  }

  _createClass(Warning, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'className']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, CLASS_ROOT + '-warning', className);
      // generate an id to avoid duplication in the DOM
      var maskId = 'mask-warning-' + _lastId++;
      return _react2.default.createElement(
        'svg',
        _extends({}, props, { className: classes, viewBox: '0 0 24 24', role: 'img',
          'aria-label': a11yTitle, version: '1.1' }),
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
              _react2.default.createElement(
                'g',
                { strokeWidth: '2', stroke: '#000',
                  transform: 'translate(11.000000, 8.000000)' },
                _react2.default.createElement('path', { role: 'presentation', d: 'M1,0 L1,6', fill: 'none' }),
                _react2.default.createElement('path', { role: 'presentation', d: 'M1,8 L1,10', fill: 'none' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'g',
          { className: CLASS_ROOT + '__base', mask: 'url(#' + maskId + ')' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M12,0 L0,22 L24,22 L12,0 L12,0 Z',
            stroke: 'none' })
        )
      );
    }
  }]);

  return Warning;
}(_react.Component);

Warning.displayName = 'Warning';
exports.default = Warning;


Warning.propTypes = {
  a11yTitle: _propTypes2.default.string,
  className: _propTypes2.default.string
};

Warning.defaultProps = {
  a11yTitle: 'Warning'
};
module.exports = exports['default'];