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

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var CLASS_ROOT = "login-form";

var LoginForm = (function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    _get(Object.getPrototypeOf(LoginForm.prototype), 'constructor', this).call(this);

    this._onSubmit = this._onSubmit.bind(this);
  }

  _createClass(LoginForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.username.focus();
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(event) {
      event.preventDefault();
      var username = this.refs.username.value.trim();
      var password = this.refs.password.value.trim();
      if (this.props.onSubmit) {
        this.props.onSubmit({ username: username, password: password });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];

      var errors = this.props.errors.map(function (error, index) {
        if (error) {
          return _react2['default'].createElement(
            'div',
            { key: index, className: CLASS_ROOT + "__error" },
            _react2['default'].createElement(_FormattedMessage2['default'], { id: error, defaultMessage: error })
          );
        }
      });

      var logo;
      if (this.props.logo) {
        logo = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__logo" },
          this.props.logo
        );
      }

      var title;
      if (this.props.title) {
        title = _react2['default'].createElement(
          'h1',
          { className: CLASS_ROOT + "__title" },
          _react2['default'].createElement(
            'strong',
            null,
            this.props.title
          )
        );
      }

      var secondaryText;
      if (this.props.secondaryText) {
        secondaryText = _react2['default'].createElement(
          'p',
          { className: CLASS_ROOT + "__secondary-text" },
          this.props.secondaryText
        );
      }

      var rememberMe;
      if (this.props.rememberMe) {

        rememberMe = _react2['default'].createElement(_CheckBox2['default'], { className: CLASS_ROOT + "__remember-me",
          id: 'remember-me',
          label: _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Remember me', defaultMessage: 'Remember me' }) });
      }

      var footer;
      if (this.props.forgotPassword) {
        footer = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__footer" },
          this.props.forgotPassword
        );
      }

      var username;
      if (this.props.usernameType === 'email') {
        username = _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Email', defaultMessage: 'Email' });
      } else {
        username = _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Username', defaultMessage: 'Username' });
      }
      var password = _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Password', defaultMessage: 'Password' });
      var login = _react2['default'].createElement(_FormattedMessage2['default'], { id: 'Log In', defaultMessage: 'Log In' });

      return _react2['default'].createElement(
        _Form2['default'],
        { className: classes.join(' '), onSubmit: this._onSubmit },
        logo,
        title,
        secondaryText,
        _react2['default'].createElement(
          'fieldset',
          null,
          _react2['default'].createElement(
            _FormField2['default'],
            { htmlFor: 'username', label: username },
            _react2['default'].createElement('input', { id: 'username', ref: 'username', type: this.props.usernameType })
          ),
          _react2['default'].createElement(
            _FormField2['default'],
            { htmlFor: 'password', label: password },
            _react2['default'].createElement('input', { id: 'password', ref: 'password', type: 'password' })
          )
        ),
        errors,
        rememberMe,
        _react2['default'].createElement(_Button2['default'], { id: CLASS_ROOT + "__submit", className: CLASS_ROOT + "__submit",
          primary: true, strong: true, type: 'submit', label: login,
          onClick: this.props.onSubmit ? this._onSubmit : null }),
        footer
      );
    }
  }]);

  return LoginForm;
})(_react.Component);

exports['default'] = LoginForm;

LoginForm.propTypes = {
  logo: _react.PropTypes.node,
  title: _react.PropTypes.string,
  secondaryText: _react.PropTypes.string,
  usernameType: _react.PropTypes.string,
  rememberMe: _react.PropTypes.bool,
  forgotPassword: _react.PropTypes.node,
  errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
  onSubmit: _react.PropTypes.func
};

LoginForm.defaultProps = {
  errors: [],
  usernameType: 'email'
};
module.exports = exports['default'];