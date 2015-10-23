// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;

var Form = require('./Form');
var FormField = require('./FormField');
var CheckBox = require('./CheckBox');
var Button = require('./Button');
var CLASS_ROOT = "login-form";

var LoginForm = React.createClass({

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

  contextTypes: {
    intl: React.PropTypes.object.isRequired
  },

  getDefaultProps: function () {
    return ({
      errors: [],
      usernameType: 'email'
    });
  },

  componentDidMount: function() {
    this.refs.username.focus();
  },

  _onSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    if (this.props.onSubmit) {
      this.props.onSubmit({username: username, password: password});
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];

    var errors = this.props.errors.map(function (error, index) {
      return (
        <div key={index} className={CLASS_ROOT + "__error"}>
          <FormattedMessage id={error} defaultMessage={error} />
        </div>
      );
    }.bind(this));

    var logo = null;
    if (this.props.logo) {
      logo = (
        <div className={CLASS_ROOT + "__logo"}>
          {this.props.logo}
        </div>
      );
    }

    var title = null;
    if (this.props.title) {
      title = (
        <h1 className={CLASS_ROOT + "__title"}>
          <strong>{this.props.title}</strong>
        </h1>
      );
    }

    var secondaryText = null;
    if (this.props.secondaryText) {
      secondaryText = (
        <p className={CLASS_ROOT + "__secondary-text"}>
          {this.props.secondaryText}
        </p>
      );
    }

    var rememberMeLabel = this.context.intl.formatMessage({
      id: "Remember me", defaultMessage: "Remember me"
    });
    var rememberMe = null;
    if (this.props.rememberMe) {
      rememberMe = (
        <CheckBox className={CLASS_ROOT + "__remember-me"}
          id="remember-me" label={rememberMeLabel} />
      );
    }

    var footer = null;
    if (this.props.forgotPassword) {
      footer = (
        <div className={CLASS_ROOT + "__footer"}>
          {this.props.forgotPassword}
        </div>
      );
    }

    var usernameLabel = this.context.intl.formatMessage({
      id: "Username", defaultMessage: "Username"
    });
    var passwordLabel = this.context.intl.formatMessage({
      id: "Password", defaultMessage: "Password"
    });
    var loginLabel = this.context.intl.formatMessage({
      id: "Log In", defaultMessage: "Log In"
    });

    return (
      <Form className={classes.join(' ')} onSubmit={this._onSubmit}>
        {logo}
        {title}
        {secondaryText}
        <fieldset>
          <FormField htmlFor="username" label={usernameLabel}>
            <input id="username" ref="username" type={this.props.usernameType} />
          </FormField>
          <FormField htmlFor="password" label={passwordLabel}>
            <input id="password" ref="password" type="password" />
          </FormField>
        </fieldset>
        {errors}
        {rememberMe}
        <Button id={CLASS_ROOT + "__submit"} className={CLASS_ROOT + "__submit"} primary={true} strong={true}
          type="submit" label={loginLabel}
          onClick={this._onSubmit} />
        {footer}
      </Form>
    );
  }

});

module.exports = LoginForm;
