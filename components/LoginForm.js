'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGIN_FORM;

var LoginForm = function (_Component) {
  (0, _inherits3.default)(LoginForm, _Component);

  function LoginForm(props, context) {
    (0, _classCallCheck3.default)(this, LoginForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LoginForm.__proto__ || (0, _getPrototypeOf2.default)(LoginForm)).call(this, props, context));

    _this._onSubmit = _this._onSubmit.bind(_this);
    _this._onUsernameChange = _this._onUsernameChange.bind(_this);
    _this._onPasswordChange = _this._onPasswordChange.bind(_this);
    _this._onRememberMeChange = _this._onRememberMeChange.bind(_this);
    _this._onChange = _this._onChange.bind(_this);

    _this.state = {
      password: '',
      rememberMe: props.defaultValues.rememberMe,
      username: props.defaultValues.username
    };
    return _this;
  }

  (0, _createClass3.default)(LoginForm, [{
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
      password = password.trim();

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


      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);
      var center = !align || 'stretch' === align || 'center' === align;

      var errorsNode = errors.map(function (error, index) {
        var errorComponent = void 0;
        if (error) {
          errorComponent = _react2.default.createElement(
            'div',
            { key: index, className: 'error' },
            _react2.default.createElement(_FormattedMessage2.default, { id: error, defaultMessage: error })
          );
        }
        return errorComponent;
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
          { margin: 'none' },
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
            { htmlFor: 'username', label: username },
            _react2.default.createElement('input', { type: usernameType, ref: function ref(_ref) {
                return _this2.usernameRef = _ref;
              },
              value: this.state.username,
              onChange: this._onUsernameChange })
          ),
          _react2.default.createElement(
            _FormField2.default,
            { htmlFor: 'password', label: password },
            _react2.default.createElement('input', { type: 'password', value: this.state.password,
              onChange: this._onPasswordChange })
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
            type: 'submit', label: login,
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
  align: _react.PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  defaultValues: _react.PropTypes.shape({
    username: _react.PropTypes.string,
    rememberMe: _react.PropTypes.bool
  }),
  errors: _react.PropTypes.arrayOf(_react.PropTypes.string),
  forgotPassword: _react.PropTypes.node,
  logo: _react.PropTypes.node,
  onSubmit: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  rememberMe: _react.PropTypes.bool,
  secondaryText: _react.PropTypes.string,
  title: _react.PropTypes.string,
  usernameType: _react.PropTypes.string
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