'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Disabled = function (_Component) {
  _inherits(Disabled, _Component);

  function Disabled() {
    _classCallCheck(this, Disabled);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Disabled).apply(this, arguments));
  }

  _createClass(Disabled, [{
    key: 'render',
    value: function render() {
      var className = 'status-icon status-icon-disabled';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof this.props.a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
        // should use the default title value.
        a11yTitle = 'Disabled';
      }
      var disabledTitleId = 'disabled-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', role: 'img', 'aria-labelledby': disabledTitleId, version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: disabledTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: "status-icon__base" },
          _react2.default.createElement('path', { role: 'presentation', stroke: 'none', d: 'M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z' })
        ),
        _react2.default.createElement(
          'g',
          { className: "status-icon__detail", strokeWidth: '2' },
          _react2.default.createElement('path', { d: 'M6,12 L18,12' })
        )
      );
    }
  }]);

  return Disabled;
}(_react.Component);

exports.default = Disabled;

Disabled.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];