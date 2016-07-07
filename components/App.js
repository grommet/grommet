'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var CLASS_ROOT = _CSSClassnames2.default.APP; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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
  (0, _inherits3.default)(App, _Component);

  function App(props, context) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).call(this, props, context));

    _this.state = {
      lang: 'en-US'
    };
    return _this;
  }

  (0, _createClass3.default)(App, [{
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


      var classes = (0, _classnames3.default)('grommet', className, CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--centered', centered), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--inline', inline), _classnames));

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

App.displayName = 'App';
exports.default = App;


App.defaultProps = {
  centered: true
};

App.propTypes = {
  centered: _react.PropTypes.bool
};
module.exports = exports['default'];