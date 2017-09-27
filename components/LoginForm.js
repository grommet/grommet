'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _CheckBox = require('./CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGIN_FORM;

var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm(props, context) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props, context));

    _this._onSubmit = _this._onSubmit.bind(_this);
    _this._onUsernameChange = _this._onUsernameChange.bind(_this);
    _this._onPasswordChange = _this._onPasswordChange.bind(_this);
    _this._onRememberMeChange = _this._onRememberMeChange.bind(_this);
    _this._onChange = _this._onChange.bind(_this);

    _this.state = {
      timestamp: new Date().getTime(),
      password: '',
      rememberMe: props.defaultValues.rememberMe,
      username: props.defaultValues.username
    };
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.usernameRef) {
        this.usernameRef.focus();
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(args) {
      var onChange = this.props.onChange;


      if (onChange) {
        onChange(args);
      }
    }
  }, {
    key: '_onUsernameChange',
    value: function _onUsernameChange(event) {
      var username = event.target.value;
      this.setState({ username: username });
      this._onChange({ event: event, username: username });
    }
  }, {
    key: '_onPasswordChange',
    value: function _onPasswordChange(event) {
      var password = event.target.value;
      this.setState({ password: password });
      this._onChange({ event: event, password: password });
    }
  }, {
    key: '_onRememberMeChange',
    value: function _onRememberMeChange(event) {
      var rememberMe = event.target.checked;
      this.setState({ rememberMe: rememberMe });
      this._onChange({ event: event, rememberMe: rememberMe });
    }
  }, {
    key: '_onSubmit',
    value: function _onSubmit(event) {
      event.preventDefault();
      var onSubmit = this.props.onSubmit;
      var _state = this.state,
          password = _state.password,
          rememberMe = _state.rememberMe,
          username = _state.username;


      username = username.trim();

      if (onSubmit) {
        onSubmit({ username: username, password: password, rememberMe: rememberMe });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          align = _props.align,
          errors = _props.errors,
          forgotPassword = _props.forgotPassword,
          logo = _props.logo,
          onSubmit = _props.onSubmit,
          rememberMe = _props.rememberMe,
          secondaryText = _props.secondaryText,
          title = _props.title,
          usernameType = _props.usernameType;
      var timestamp = this.state.timestamp;


      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);
      var center = !align || 'stretch' === align || 'center' === align;

      var errorsNode = errors.map(function (error, index) {
        if (error) {
          var errorMessage = void 0;
          if (_react2.default.isValidElement(error)) {
            errorMessage = error;
          } else {
            errorMessage = _react2.default.createElement(_FormattedMessage2.default, { id: error, defaultMessage: error });
          }
          return _react2.default.createElement(
            'div',
            { key: index, className: 'error' },
            errorMessage
          );
        }
        return undefined;
      });

      var titleNode = void 0;
      if (title) {
        titleNode = _react2.default.createElement(
          _Heading2.default,
          { strong: true },
          title
        );
      }

      var secondaryTextNode = void 0;
      if (secondaryText) {
        secondaryTextNode = _react2.default.createElement(
          _Paragraph2.default,
          { align: align, margin: 'none' },
          secondaryText
        );
      }

      var rememberMeNode = void 0;
      if (rememberMe) {
        var rememberMeLabel = _react2.default.createElement(_FormattedMessage2.default, { id: 'Remember me', defaultMessage: 'Remember me' });

        rememberMeNode = _react2.default.createElement(_CheckBox2.default, { label: rememberMeLabel, checked: this.state.rememberMe,
          onChange: this._onRememberMeChange });
      }

      var username = usernameType === 'email' ? _react2.default.createElement(_FormattedMessage2.default, { id: 'Email', defaultMessage: 'Email' }) : _react2.default.createElement(_FormattedMessage2.default, { id: 'Username', defaultMessage: 'Username' });

      var password = _react2.default.createElement(_FormattedMessage2.default, { id: 'Password', defaultMessage: 'Password' });
      var login = _react2.default.createElement(_FormattedMessage2.default, { id: 'Log In', defaultMessage: 'Log In' });

      var usernameId = 'grommetux-username_' + timestamp;
      var passwordId = 'grommetux-password_' + timestamp;

      return _react2.default.createElement(
        _Form2.default,
        { className: classes, pad: 'medium', onSubmit: this._onSubmit },
        _react2.default.createElement(
          _Box2.default,
          { align: align },
          logo,
          titleNode,
          secondaryTextNode
        ),
        _react2.default.createElement(
          'fieldset',
          null,
          _react2.default.createElement(
            _FormField2.default,
            { htmlFor: usernameId, label: username },
            _react2.default.createElement('input', {
              id: usernameId,
              type: usernameType,
              ref: function ref(_ref) {
                return _this2.usernameRef = _ref;
              },
              value: this.state.username,
              onChange: this._onUsernameChange
            })
          ),
          _react2.default.createElement(
            _FormField2.default,
            { htmlFor: passwordId, label: password },
            _react2.default.createElement('input', {
              id: passwordId,
              type: 'password',
              value: this.state.password,
              onChange: this._onPasswordChange
            })
          ),
          errorsNode
        ),
        _react2.default.createElement(
          _Footer2.default,
          { size: 'small', direction: 'column',
            align: center ? 'stretch' : 'start',
            pad: { vertical: 'none', between: 'medium' } },
          rememberMeNode,
          _react2.default.createElement(_Button2.default, { primary: true, fill: center,
            type: onSubmit ? "submit" : "button",
            label: login,
            onClick: onSubmit ? this._onSubmit : undefined }),
          forgotPassword
        )
      );
    }
  }]);

  return LoginForm;
}(_react.Component);

LoginForm.displayName = 'LoginForm';
exports.default = LoginForm;


LoginForm.propTypes = {
  align: _propTypes2.default.oneOf(['start', 'center', 'end', 'stretch']),
  defaultValues: _propTypes2.default.shape({
    username: _propTypes2.default.string,
    rememberMe: _propTypes2.default.bool
  }),
  errors: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node])),
  forgotPassword: _propTypes2.default.node,
  logo: _propTypes2.default.node,
  onSubmit: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  rememberMe: _propTypes2.default.bool,
  secondaryText: _propTypes2.default.string,
  title: _propTypes2.default.string,
  usernameType: _propTypes2.default.string
};

LoginForm.defaultProps = {
  align: 'center',
  defaultValues: {
    username: '',
    rememberMe: false
  },
  errors: [],
  usernameType: 'email'
};
module.exports = exports['default'];