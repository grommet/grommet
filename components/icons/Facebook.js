'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Facebook = function (_Component) {
  _inherits(Facebook, _Component);

  function Facebook() {
    _classCallCheck(this, Facebook);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Facebook).apply(this, arguments));
  }

  _createClass(Facebook, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-facebook';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { stroke: 'none' },
          _react2.default.createElement('path', { d: 'M26.1,35.9 L26.1,24.9 L29.8,24.9 L30.3,20.6 L26.1,20.6 L26.1,17.9 C26.1,16.7 26.4,15.8 28.2,15.8 L30.5,15.8 L30.5,12 C30.1,11.9 28.8,11.8 27.2,11.8 C23.9,11.8 21.7,13.8 21.7,17.4 L21.7,20.5 L18,20.5 L18,24.8 L21.7,24.8 L21.7,35.7 L26.1,35.7 L26.1,35.9 Z' })
        )
      );
    }
  }]);

  return Facebook;
}(_react.Component);

exports.default = Facebook;
module.exports = exports['default'];