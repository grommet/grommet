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

var LinkedIn = function (_Component) {
  _inherits(LinkedIn, _Component);

  function LinkedIn() {
    _classCallCheck(this, LinkedIn);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LinkedIn).apply(this, arguments));
  }

  _createClass(LinkedIn, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-linked-in';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { stroke: 'none' },
          _react2.default.createElement('path', { d: 'M17.4,36 L12.4,36 L12.4,20 L17.4,20 L17.4,36 L17.4,36 Z M14.9,17.8 C13.3,17.8 12,16.5 12,14.9 C12,13.3 13.3,12 14.9,12 C16.5,12 17.8,13.3 17.8,14.9 C17.8,16.5 16.5,17.8 14.9,17.8 L14.9,17.8 Z M36,36 L31,36 L31,28.2 C31,26.3 31,24 28.4,24 C25.8,24 25.4,26 25.4,28.1 L25.4,36 L20.4,36 L20.4,20 L25.2,20 L25.2,22.2 L25.3,22.2 C26,20.9 27.6,19.6 30,19.6 C35,19.6 36,22.9 36,27.2 L36,36 L36,36 Z' })
        )
      );
    }
  }]);

  return LinkedIn;
}(_react.Component);

exports.default = LinkedIn;
module.exports = exports['default'];