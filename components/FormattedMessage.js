'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// NOTE: This component is a temporary wrapper of react-intl FormattedMessage
// to avoid errors being thrown if the context hasn't been wrapped by
// IntlProvider. The hope is that react-intl will change to obviate the
// need for this component.

var GrommetFormattedMessage = (function (_Component) {
  _inherits(GrommetFormattedMessage, _Component);

  function GrommetFormattedMessage() {
    _classCallCheck(this, GrommetFormattedMessage);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GrommetFormattedMessage).apply(this, arguments));
  }

  _createClass(GrommetFormattedMessage, [{
    key: 'render',
    value: function render() {
      var result;
      if (this.context.intl) {
        result = _react2.default.createElement(_reactIntl.FormattedMessage, { id: this.props.id,
          defaultMessage: this.props.defaultMessage });
      } else {
        result = _react2.default.createElement(
          'span',
          { id: this.props.id },
          this.props.defaultMessage || this.props.id
        );
      }

      return result;
    }
  }]);

  return GrommetFormattedMessage;
})(_react.Component);

exports.default = GrommetFormattedMessage;

GrommetFormattedMessage.contextTypes = {
  intl: _react.PropTypes.object
};

GrommetFormattedMessage.propTypes = {
  id: _react.PropTypes.string.isRequired,
  defaultMessage: _react.PropTypes.string
};