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

var SearchPlus = (function (_Component) {
  _inherits(SearchPlus, _Component);

  function SearchPlus() {
    _classCallCheck(this, SearchPlus);

    _get(Object.getPrototypeOf(SearchPlus.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SearchPlus, [{
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-search-plus';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2['default'].createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2['default'].createElement(
          'g',
          { strokeWidth: '4', fill: 'none', fillRule: 'evenodd' },
          _react2['default'].createElement('circle', { strokeWidth: '4', cx: '21', cy: '21', r: '7' }),
          _react2['default'].createElement('path', { d: 'M27.2,27 L34.2,36', strokeWidth: '4', strokeLinecap: 'round' }),
          _react2['default'].createElement('path', { d: 'M34,13 L34,19', strokeWidth: '2', strokeLinecap: 'round' }),
          _react2['default'].createElement('path', { d: 'M37,16 L31,16', strokeWidth: '2', strokeLinecap: 'round' })
        )
      );
    }
  }]);

  return SearchPlus;
})(_react.Component);

exports['default'] = SearchPlus;
module.exports = exports['default'];