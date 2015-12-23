// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

// NOTE: This component is a temporary wrapper of react-intl FormattedMessage
// to avoid errors being thrown if the context hasn't been wrapped by
// IntlProvider. The hope is that react-intl will change to obviate the
// need for this component.

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

var _reactIntl = require('react-intl');

var GrommetFormattedMessage = (function (_Component) {
  _inherits(GrommetFormattedMessage, _Component);

  function GrommetFormattedMessage() {
    _classCallCheck(this, GrommetFormattedMessage);

    _get(Object.getPrototypeOf(GrommetFormattedMessage.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(GrommetFormattedMessage, [{
    key: 'render',
    value: function render() {
      var result;
      if (this.context.intl) {
        result = _react2['default'].createElement(_reactIntl.FormattedMessage, { id: this.props.id,
          defaultMessage: this.props.defaultMessage });
      } else {
        result = _react2['default'].createElement(
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

exports['default'] = GrommetFormattedMessage;

GrommetFormattedMessage.contextTypes = {
  intl: _react.PropTypes.object
};

GrommetFormattedMessage.propTypes = {
  id: _react.PropTypes.string,
  defaultMessage: _react.PropTypes.string
};
module.exports = exports['default'];