'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Twitter = function (_Component) {
  _inherits(Twitter, _Component);

  function Twitter() {
    _classCallCheck(this, Twitter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Twitter).apply(this, arguments));
  }

  _createClass(Twitter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-twitter';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { stroke: 'none' },
          _react2.default.createElement('path', { d: 'M36,16.8 C35.1,17.2 34.2,17.5 33.2,17.6 C34.2,17 35,16 35.4,14.9 C34.4,15.5 33.4,15.9 32.3,16.1 C31.4,15.1 30.1,14.5 28.7,14.5 C26,14.5 23.8,16.7 23.8,19.4 C23.8,19.8 23.8,20.2 23.9,20.5 C19.8,20.3 16.2,18.3 13.8,15.4 C13.2,16.1 13,17 13,17.9 C13,19.6 13.9,21.1 15.2,22 C14.4,22 13.6,21.8 13,21.4 C13,21.4 13,21.4 13,21.5 C13,23.9 14.7,25.9 16.9,26.3 C16.5,26.4 16.1,26.5 15.6,26.5 C15.3,26.5 15,26.5 14.7,26.4 C15.3,28.4 17.1,29.8 19.3,29.8 C17.6,31.1 15.5,31.9 13.2,31.9 C12.8,31.9 12.4,31.9 12,31.8 C14.2,33.2 16.8,34 19.5,34 C28.6,34 33.5,26.5 33.5,20 L33.5,19.4 C34.5,18.7 35.3,17.8 36,16.8 L36,16.8 Z' })
        )
      );
    }
  }]);

  return Twitter;
}(_react.Component);

exports.default = Twitter;
module.exports = exports['default'];