'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGIN_FORM;

var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginForm).call(this));

    _this._onSubmit = _this._onSubmit.bind(_this);
    return _this;
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
      var rememberMe = this.refs.rememberMe && this.refs.rememberMe.checked;

      if (this.props.onSubmit) {
        this.props.onSubmit({ username: username, password: password, rememberMe: rememberMe });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.align) {
        classes.push(CLASS_ROOT + '--align-' + this.props.align);
      }

      var errors = this.props.errors.map(function (error, index) {
        var errorComponent = undefined;
        if (error) {
          errorComponent = _react2.default.createElement(
            'div',
            { key: index, className: CLASS_ROOT + '__error error' },
            _react2.default.createElement(_FormattedMessage2.default, { id: error, defaultMessage: error })
          );
        }
        return errorComponent;
      });

      var logo = void 0;
      if (this.props.logo) {
        logo = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__logo' },
          this.props.logo
        );
      }

      var title = void 0;
      if (this.props.title) {
        title = _react2.default.createElement(
          'h1',
          { className: CLASS_ROOT + '__title' },
          _react2.default.createElement(
            'strong',
            null,
            this.props.title
          )
        );
      }

      var secondaryText = void 0;
      if (this.props.secondaryText) {
        secondaryText = _react2.default.createElement(
          'p',
          { className: CLASS_ROOT + '__secondary-text secondary' },
          this.props.secondaryText
        );
      }

      var rememberMe = void 0;
      if (this.props.rememberMe) {

        var rememberMeLabel = _react2.default.createElement(_FormattedMessage2.default, { id: 'Remember me', defaultMessage: 'Remember me' });

        rememberMe = _react2.default.createElement(_CheckBox2.default, { className: CLASS_ROOT + '__remember-me',
          id: 'remember-me',
          label: rememberMeLabel,
          defaultChecked: this.props.defaultValues.rememberMe,
          ref: 'rememberMe' });
      }

      var forgot = void 0;
      if (this.props.forgotPassword) {
        forgot = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__forgot' },
          this.props.forgotPassword
        );
      }

      var username = void 0;
      if (this.props.usernameType === 'email') {
        username = _react2.default.createElement(_FormattedMessage2.default, { id: 'Email', defaultMessage: 'Email' });
      } else {
        username = _react2.default.createElement(_FormattedMessage2.default, { id: 'Username', defaultMessage: 'Username' });
      }
      var password = _react2.default.createElement(_FormattedMessage2.default, { id: 'Password', defaultMessage: 'Password' });
      var login = _react2.default.createElement(_FormattedMessage2.default, { id: 'Log In', defaultMessage: 'Log In' });

      return _react2.default.createElement(
        _Form2.default,
        { className: classes.join(' '), onSubmit: this._onSubmit },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__header' },
          logo,
          title,
          secondaryText
        ),
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            _FormField2.default,
            { htmlFor: 'username', label: username },
            _react2.default.createElement('input', { id: 'username', ref: 'username', type: this.props.usernameType,
              defaultValue: this.props.defaultValues.username })
          ),
          _react2.default.createElement(
            _FormField2.default,
            { htmlFor: 'password', label: password },
            _react2.default.createElement('input', { id: 'password', ref: 'password', type: 'password' })
          ),
          errors
        ),
        _react2.default.createElement(
          _Footer2.default,
          { align: this.props.align, size: 'small', direction: 'column',
            pad: { vertical: 'medium', between: 'medium' } },
          rememberMe,
          _react2.default.createElement(_Button2.default, { id: CLASS_ROOT + '__submit', primary: true, strong: true,
            className: CLASS_ROOT + '__submit', type: 'submit', label: login,
            onClick: this.props.onSubmit ? this._onSubmit : null }),
          forgot
        )
      );
    }
  }]);

  return LoginForm;
}(_react.Component);

LoginForm.displayName = 'LoginForm';
exports.default = LoginForm;


LoginForm.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  defaultValues: _react.PropTypes.shape({
    username: _react.PropTypes.string,
    rememberMe: _react.PropTypes.bool
  }),
  errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
  forgotPassword: _react.PropTypes.node,
  logo: _react.PropTypes.node,
  onSubmit: _react.PropTypes.func,
  rememberMe: _react.PropTypes.bool,
  secondaryText: _react.PropTypes.string,
  title: _react.PropTypes.string,
  usernameType: _react.PropTypes.string
};

LoginForm.defaultProps = {
  defaultValues: {
    username: '',
    rememberMe: false
  },
  errors: [],
  usernameType: 'email'
};
module.exports = exports['default'];