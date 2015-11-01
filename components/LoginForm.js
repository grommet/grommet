// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('./FormattedMessage');

var Form = require('./Form');
var FormField = require('./FormField');
var CheckBox = require('./CheckBox');
var Button = require('./Button');
var CLASS_ROOT = "login-form";

var LoginForm = React.createClass({
  displayName: 'LoginForm',

  propTypes: {
    logo: React.PropTypes.node,
    title: React.PropTypes.string,
    secondaryText: React.PropTypes.string,
    usernameType: React.PropTypes.string,
    rememberMe: React.PropTypes.bool,
    forgotPassword: React.PropTypes.node,
    errors: React.PropTypes.arrayOf(React.PropTypes.string),
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      errors: [],
      usernameType: 'email'
    };
  },

  componentDidMount: function componentDidMount() {
    this.refs.username.focus();
  },

  _onSubmit: function _onSubmit(event) {
    event.preventDefault();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    if (this.props.onSubmit) {
      this.props.onSubmit({ username: username, password: password });
    }
  },

  render: function render() {
    var classes = [CLASS_ROOT];

    var errors = this.props.errors.map((function (error, index) {
      return React.createElement(
        'div',
        { key: index, className: CLASS_ROOT + "__error" },
        React.createElement(FormattedMessage, { id: error, defaultMessage: error })
      );
    }).bind(this));

    var logo;
    if (this.props.logo) {
      logo = React.createElement(
        'div',
        { className: CLASS_ROOT + "__logo" },
        this.props.logo
      );
    }

    var title;
    if (this.props.title) {
      title = React.createElement(
        'h1',
        { className: CLASS_ROOT + "__title" },
        React.createElement(
          'strong',
          null,
          this.props.title
        )
      );
    }

    var secondaryText;
    if (this.props.secondaryText) {
      secondaryText = React.createElement(
        'p',
        { className: CLASS_ROOT + "__secondary-text" },
        this.props.secondaryText
      );
    }

    var rememberMe;
    if (this.props.rememberMe) {

      rememberMe = React.createElement(CheckBox, { className: CLASS_ROOT + "__remember-me",
        id: 'remember-me',
        label: React.createElement(FormattedMessage, { id: 'Remember me', defaultMessage: 'Remember me' }) });
    }

    var footer;
    if (this.props.forgotPassword) {
      footer = React.createElement(
        'div',
        { className: CLASS_ROOT + "__footer" },
        this.props.forgotPassword
      );
    }

    var username = React.createElement(FormattedMessage, { id: 'Username', defaultMessage: 'Username' });
    var password = React.createElement(FormattedMessage, { id: 'Password', defaultMessage: 'Password' });
    var login = React.createElement(FormattedMessage, { id: 'Log In', defaultMessage: 'Log In' });

    return React.createElement(
      Form,
      { className: classes.join(' '), onSubmit: this._onSubmit },
      logo,
      title,
      secondaryText,
      React.createElement(
        'fieldset',
        null,
        React.createElement(
          FormField,
          { htmlFor: 'username', label: username },
          React.createElement('input', { id: 'username', ref: 'username', type: this.props.usernameType })
        ),
        React.createElement(
          FormField,
          { htmlFor: 'password', label: password },
          React.createElement('input', { id: 'password', ref: 'password', type: 'password' })
        )
      ),
      errors,
      rememberMe,
      React.createElement(Button, { id: CLASS_ROOT + "__submit", className: CLASS_ROOT + "__submit",
        primary: true, strong: true, type: 'submit', label: login,
        onClick: this._onSubmit }),
      footer
    );
  }

});

module.exports = LoginForm;