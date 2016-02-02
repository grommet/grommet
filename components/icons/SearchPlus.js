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

var SearchPlus = function (_Component) {
  _inherits(SearchPlus, _Component);

  function SearchPlus() {
    _classCallCheck(this, SearchPlus);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SearchPlus).apply(this, arguments));
  }

  _createClass(SearchPlus, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.warn('This icon has been deprecated. Please check http://www.grommet.io/docs/develop/icon for the new set of icons.');
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'control-icon control-icon-search-plus';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 48 48', version: '1.1' },
        _react2.default.createElement(
          'g',
          { strokeWidth: '4', fill: 'none', fillRule: 'evenodd' },
          _react2.default.createElement('circle', { strokeWidth: '4', cx: '21', cy: '21', r: '7' }),
          _react2.default.createElement('path', { d: 'M27.2,27 L34.2,36', strokeWidth: '4', strokeLinecap: 'round' }),
          _react2.default.createElement('path', { d: 'M34,13 L34,19', strokeWidth: '2', strokeLinecap: 'round' }),
          _react2.default.createElement('path', { d: 'M37,16 L31,16', strokeWidth: '2', strokeLinecap: 'round' })
        )
      );
    }
  }]);

  return SearchPlus;
}(_react.Component);

exports.default = SearchPlus;
module.exports = exports['default'];