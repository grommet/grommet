// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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

var _utilsLocale = require('../utils/Locale');

var _SkipLinks = require('./SkipLinks');

var _SkipLinks2 = _interopRequireDefault(_SkipLinks);

var supportedLocales = ['en-US', 'pt-BR'];

function localesSupported() {
  return global.Intl && supportedLocales.every(function (locale) {
    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale && Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
  });
}

if (!localesSupported()) {
  require('intl');
  require('intl/locale-data/jsonp/en-US.js');
  require('intl/locale-data/jsonp/pt-BR.js');
  Intl.NumberFormat = IntlPolyfill.NumberFormat;
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

var App = (function (_Component) {
  _inherits(App, _Component);

  function App(props, context) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props, context);

    this.state = {
      lang: 'en-US'
    };
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var lang = (0, _utilsLocale.getCurrentLocale)();
      if (this.props.lang) {
        lang = this.props.lang;
      }

      if (!document.documentElement.getAttribute('lang')) {
        document.documentElement.setAttribute('lang', lang);
      }

      this.setState({ lang: lang });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = ["app"];
      if (this.props.centered) {
        classes.push("app--centered");
      }
      if (this.props.inline) {
        classes.push("app--inline");
      }

      if (this.props.className) {
        classes.push(this.props.className);
      }

      return _react2['default'].createElement(
        'div',
        { lang: this.state.lang, className: classes.join(' ') },
        _react2['default'].createElement(_SkipLinks2['default'], null),
        this.props.children
      );
    }
  }]);

  return App;
})(_react.Component);

exports['default'] = App;

App.defaultProps = {
  centered: true
};

App.propTypes = {
  centered: _react.PropTypes.bool
};
module.exports = exports['default'];