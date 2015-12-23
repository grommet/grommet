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

var CriticalStatus = (function (_Component) {
  _inherits(CriticalStatus, _Component);

  function CriticalStatus() {
    _classCallCheck(this, CriticalStatus);

    _get(Object.getPrototypeOf(CriticalStatus.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CriticalStatus, [{
    key: 'render',
    value: function render() {
      var className = 'status-icon status-icon-critical';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value.
        // only if undefined should use the default title value.
        a11yTitle = 'Critical';
      }
      var criticalTitleId = 'critical-title';
      return _react2['default'].createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24',
          'aria-labelledby': criticalTitleId, role: 'img', version: '1.1' },
        _react2['default'].createElement(
          'title',
          { id: criticalTitleId },
          _react2['default'].createElement(_FormattedMessage2['default'], { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2['default'].createElement(
          'g',
          { className: "status-icon__base", stroke: 'none' },
          _react2['default'].createElement('path', { role: 'presentation', d: 'M12,0 L24,12 L12,24 L0,12 Z' })
        ),
        _react2['default'].createElement(
          'g',
          { className: "status-icon__detail", fill: 'none' },
          _react2['default'].createElement('path', { role: 'presentation', d: 'M8,8 L16,16', strokeWidth: '2' }),
          _react2['default'].createElement('path', { role: 'presentation', d: 'M8,16 L16,8', strokeWidth: '2' })
        )
      );
    }
  }]);

  return CriticalStatus;
})(_react.Component);

exports['default'] = CriticalStatus;

CriticalStatus.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];