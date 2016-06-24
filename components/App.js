'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Locale = require('../utils/Locale');

var _SkipLinks = require('./SkipLinks');

var _SkipLinks2 = _interopRequireDefault(_SkipLinks);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.APP;

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

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props, context) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, context));

    _this.state = {
      lang: 'en-US'
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var lang = (0, _Locale.getCurrentLocale)();
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
      var _classnames;

      var _props = this.props;
      var centered = _props.centered;
      var children = _props.children;
      var className = _props.className;
      var inline = _props.inline;
      var lang = this.state.lang;


      var classes = (0, _classnames3.default)('grommet', className, CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--centered', centered), _defineProperty(_classnames, CLASS_ROOT + '--inline', inline), _classnames));

      return _react2.default.createElement(
        'div',
        { lang: lang, className: classes },
        children,
        _react2.default.createElement(_SkipLinks2.default, null)
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;


App.defaultProps = {
  centered: true
};

App.propTypes = {
  centered: _react.PropTypes.bool
};
module.exports = exports['default'];