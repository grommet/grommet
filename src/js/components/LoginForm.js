// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from './FormattedMessage';
import Form from './Form';
import FormField from './FormField';
import CheckBox from './CheckBox';
import Button from './Button';

const CLASS_ROOT = "login-form";

class LoginForm extends Component {

  constructor() {
    super();

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount () {
    this.refs.username.focus();
  }

  _onSubmit  (event) {
    event.preventDefault();
    var username = this.refs.username.value.trim();
    var password = this.refs.password.value.trim();
    if (this.props.onSubmit) {
      this.props.onSubmit({username: username, password: password});
    }
  }

  render () {
    var classes = [CLASS_ROOT];

    var errors = this.props.errors.map(function (error, index) {
      return (
        <div key={index} className={CLASS_ROOT + "__error"}>
          <FormattedMessage id={error} defaultMessage={error} />
        </div>
      );
    }.bind(this));

    var logo;
    if (this.props.logo) {
      logo = (
        <div className={CLASS_ROOT + "__logo"}>
          {this.props.logo}
        </div>
      );
    }

    var title;
    if (this.props.title) {
      title = (
        <h1 className={CLASS_ROOT + "__title"}>
          <strong>{this.props.title}</strong>
        </h1>
      );
    }

    var secondaryText;
    if (this.props.secondaryText) {
      secondaryText = (
        <p className={CLASS_ROOT + "__secondary-text"}>
          {this.props.secondaryText}
        </p>
      );
    }

    var rememberMe;
    if (this.props.rememberMe) {

      rememberMe = (
        <CheckBox className={CLASS_ROOT + "__remember-me"}
          id="remember-me"
          label={<FormattedMessage id="Remember me" defaultMessage="Remember me" />} />
      );
    }

    var footer;
    if (this.props.forgotPassword) {
      footer = (
        <div className={CLASS_ROOT + "__footer"}>
          {this.props.forgotPassword}
        </div>
      );
    }

    var username;
    if (this.props.usernameType === 'email') {
      username = <FormattedMessage id="Email" defaultMessage="Email" />;
    } else {
      username = <FormattedMessage id="Username" defaultMessage="Username" />;
    }
    var password = <FormattedMessage id="Password" defaultMessage="Password" />;
    var login = <FormattedMessage id="Log In" defaultMessage="Log In" />;

    return (
      <Form className={classes.join(' ')} onSubmit={this._onSubmit}>
        {logo}
        {title}
        {secondaryText}
        <fieldset>
          <FormField htmlFor="username" label={username}>
            <input id="username" ref="username" type={this.props.usernameType} />
          </FormField>
          <FormField htmlFor="password" label={password}>
            <input id="password" ref="password" type="password" />
          </FormField>
        </fieldset>
        {errors}
        {rememberMe}
        <Button id={CLASS_ROOT + "__submit"} className={CLASS_ROOT + "__submit"}
          primary={true} strong={true} type="submit" label={login}
          onClick={this.props.onSubmit ? this._onSubmit : null} />
        {footer}
      </Form>
    );
  }

}

LoginForm.propTypes = {
  logo: PropTypes.node,
  title: PropTypes.string,
  secondaryText: PropTypes.string,
  usernameType: PropTypes.string,
  rememberMe: PropTypes.bool,
  forgotPassword: PropTypes.node,
  errors: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
  errors: [],
  usernameType: 'email'
};

module.exports = LoginForm;
