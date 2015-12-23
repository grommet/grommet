// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var LinkedIn = (function (_Component) {
  _inherits(LinkedIn, _Component);

  function LinkedIn() {
    _classCallCheck(this, LinkedIn);

    _get(Object.getPrototypeOf(LinkedIn.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LinkedIn, [{
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-linked-in';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2['default'].createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2['default'].createElement(
          'g',
          { stroke: 'none' },
          _react2['default'].createElement('path', { d: 'M17.4,36 L12.4,36 L12.4,20 L17.4,20 L17.4,36 L17.4,36 Z M14.9,17.8 C13.3,17.8 12,16.5 12,14.9 C12,13.3 13.3,12 14.9,12 C16.5,12 17.8,13.3 17.8,14.9 C17.8,16.5 16.5,17.8 14.9,17.8 L14.9,17.8 Z M36,36 L31,36 L31,28.2 C31,26.3 31,24 28.4,24 C25.8,24 25.4,26 25.4,28.1 L25.4,36 L20.4,36 L20.4,20 L25.2,20 L25.2,22.2 L25.3,22.2 C26,20.9 27.6,19.6 30,19.6 C35,19.6 36,22.9 36,27.2 L36,36 L36,36 Z' })
        )
      );
    }
  }]);

  return LinkedIn;
})(_react.Component);

exports['default'] = LinkedIn;
module.exports = exports['default'];