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

var _FormattedMessage = require('../../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var Unknown = (function (_Component) {
  _inherits(Unknown, _Component);

  function Unknown() {
    _classCallCheck(this, Unknown);

    _get(Object.getPrototypeOf(Unknown.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Unknown, [{
    key: 'render',
    value: function render() {
      var className = 'status-icon status-icon-unknown';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
        // should use the default title value.
        a11yTitle = 'Unknown';
      }
      var unknownTitleId = 'unknown-title';
      return _react2['default'].createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': unknownTitleId, version: '1.1' },
        _react2['default'].createElement(
          'title',
          { id: unknownTitleId },
          _react2['default'].createElement(_FormattedMessage2['default'], { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2['default'].createElement(
          'g',
          { className: "status-icon__base" },
          _react2['default'].createElement('path', { role: 'presentation', d: 'M12,2 C17.5,2 22,6.5 22,12 C22,17.5 17.5,22 12,22 C6.5,22 2,17.5 2,12 C2,6.5 6.5,2 12,2 L12,2 Z M12,0 C5.4,0 0,5.4 0,12 C0,18.6 5.4,24 12,24 C18.6,24 24,18.6 24,12 C24,5.4 18.6,0 12,0 L12,0 L12,0 Z', stroke: 'none' })
        ),
        _react2['default'].createElement(
          'g',
          { className: "status-icon__detail" },
          _react2['default'].createElement('path', { role: 'presentation', d: 'M9,10.4 C9,8.8 10.4,7.6 12,7.6 C13.6,7.6 14.9,9 15,10.4 C15,11.7 14.1,12.7 12.9,13.1 C12.4,13.2 12,13.7 12,14.2 L12,15.5', fill: 'none', strokeWidth: '2' }),
          _react2['default'].createElement('circle', { role: 'presentation', stroke: 'none', cx: '12', cy: '17.6', r: '1' })
        )
      );
    }
  }]);

  return Unknown;
})(_react.Component);

exports['default'] = Unknown;
module.exports = exports['default'];