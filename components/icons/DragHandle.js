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

var DragHandle = function (_Component) {
  _inherits(DragHandle, _Component);

  function DragHandle() {
    _classCallCheck(this, DragHandle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DragHandle).apply(this, arguments));
  }

  _createClass(DragHandle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-drag-handle';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { stroke: 'none', strokeWidth: '1', fill: '#cccccc', fillRule: 'evenodd' },
          _react2.default.createElement('rect', { x: '12', y: '12', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '18', y: '12', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '12', y: '18', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '18', y: '18', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '12', y: '24', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '18', y: '24', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '12', y: '30', width: '3', height: '3' }),
          _react2.default.createElement('rect', { x: '18', y: '30', width: '3', height: '3' })
        )
      );
    }
  }]);

  return DragHandle;
}(_react.Component);

exports.default = DragHandle;
module.exports = exports['default'];