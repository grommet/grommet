'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var ErrorStatus = (function (_Component) {
  _inherits(ErrorStatus, _Component);

  function ErrorStatus() {
    _classCallCheck(this, ErrorStatus);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ErrorStatus).apply(this, arguments));
  }

  _createClass(ErrorStatus, [{
    key: 'render',
    value: function render() {
      var className = 'status-icon status-icon-error';
      var a11yTitle = this.props.a11yTitle;
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (typeof a11yTitle === "undefined") {
        // this.props.a11yTitle emplty string is an acceptable value. Only if undefined
        // should use the default title value.
        a11yTitle = 'Error';
      }
      var errorTitleId = 'error-title';
      return _react2.default.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', 'aria-labelledby': errorTitleId, role: 'img', version: '1.1' },
        _react2.default.createElement(
          'title',
          { id: errorTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: a11yTitle, defaultMessage: a11yTitle })
        ),
        _react2.default.createElement(
          'g',
          { className: "status-icon__base", stroke: 'none' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M12,0 L24,12 L12,24 L0,12 Z' })
        ),
        _react2.default.createElement(
          'g',
          { className: "status-icon__detail", fill: 'none' },
          _react2.default.createElement('path', { role: 'presentation', d: 'M8,8 L16,16', strokeWidth: '2' }),
          _react2.default.createElement('path', { role: 'presentation', d: 'M8,16 L16,8', strokeWidth: '2' })
        )
      );
    }
  }]);

  return ErrorStatus;
})(_react.Component);

exports.default = ErrorStatus;

ErrorStatus.propTypes = {
  a11yTitle: _react.PropTypes.string
};
module.exports = exports['default'];