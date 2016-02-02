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

var Edit = function (_Component) {
  _inherits(Edit, _Component);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Edit).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-edit';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { fill: 'none' },
          _react2.default.createElement('circle', { strokeWidth: '2', cx: '24', cy: '24', r: '9' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '24', y1: '11', x2: '24', y2: '15' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '14.8', x2: '30.3', y2: '17.6' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '37', y1: '24', x2: '33', y2: '24' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '33.2', y1: '33.2', x2: '30.3', y2: '30.4' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '24', y1: '37', x2: '24', y2: '33' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '33.2', x2: '17.7', y2: '30.4' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '11', y1: '24', x2: '15.2', y2: '24' }),
          _react2.default.createElement('line', { strokeWidth: '2', x1: '14.8', y1: '14.8', x2: '17.7', y2: '17.6' })
        )
      );
    }
  }]);

  return Edit;
}(_react.Component);

exports.default = Edit;
module.exports = exports['default'];