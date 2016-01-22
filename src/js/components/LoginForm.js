// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import FormattedMessage from './FormattedMessage';
import Form from './Form';
import FormField from './FormField';
import CheckBox from './CheckBox';
import Button from './Button';

const CLASS_ROOT = "login-form";

export default class LoginForm extends Component {

  constructor() {
    super();

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount () {
    this.refs.username.focus();
  }

  _onSubmit (event) {
    event.preventDefault();

    let username = this.refs.username.value.trim();
    let password = this.refs.password.value.trim();
    let rememberMe = this.refs.rememberMe && this.refs.rememberMe.checked;

    if (this.props.onSubmit) {
      this.props.onSubmit({username, password, rememberMe});
    }
  }

  render () {
    let classes = [CLASS_ROOT];

    let errors = this.props.errors.map(function (error, index) {
      let errorComponent = undefined;
      if (error) {
        errorComponent = (
          <div key={index} className={`${CLASS_ROOT}__error`}>
            <FormattedMessage id={error} defaultMessage={error} />
          </div>
        );
      }
      return errorComponent;
    });

    let logo;
    if (this.props.logo) {
      logo = (
        <div className={`${CLASS_ROOT}__logo`}>
          {this.props.logo}
        </div>
      );
    }

    let title;
    if (this.props.title) {
      title = (
        <h1 className={`${CLASS_ROOT}__title`}>
          <strong>{this.props.title}</strong>
        </h1>
      );
    }

    let secondaryText;
    if (this.props.secondaryText) {
      secondaryText = (
        <p className={`${CLASS_ROOT}__secondary-text`}>
          {this.props.secondaryText}
        </p>
      );
    }

    let rememberMe;
    if (this.props.rememberMe) {

      let rememberMeLabel = (
        <FormattedMessage id="Remember me" defaultMessage="Remember me" />
      );

      rememberMe = (
        <CheckBox className={`${CLASS_ROOT}__remember-me`}
          id="remember-me"
          label={rememberMeLabel}
          defaultChecked={this.props.defaultValues.rememberMe}
          ref="rememberMe" />
      );
    }

    let footer;
    if (this.props.forgotPassword) {
      footer = (
        <div className={`${CLASS_ROOT}__footer`}>
          {this.props.forgotPassword}
        </div>
      );
    }

    let username;
    if (this.props.usernameType === 'email') {
      username = <FormattedMessage id="Email" defaultMessage="Email" />;
    } else {
      username = <FormattedMessage id="Username" defaultMessage="Username" />;
    }
    let password = <FormattedMessage id="Password" defaultMessage="Password" />;
    let login = <FormattedMessage id="Log In" defaultMessage="Log In" />;

    return (
      <Form className={classes.join(' ')} onSubmit={this._onSubmit}>
        {logo}
        {title}
        {secondaryText}
        <fieldset>
          <FormField htmlFor="username" label={username}>
            <input id="username" ref="username" type={this.props.usernameType}
              defaultValue={this.props.defaultValues.username} />
          </FormField>
          <FormField htmlFor="password" label={password}>
            <input id="password" ref="password" type="password" />
          </FormField>
        </fieldset>
        {errors}
        {rememberMe}
        <Button id={`${CLASS_ROOT}__submit`} primary={true} strong={true}
          className={`${CLASS_ROOT}__submit`} type="submit" label={login}
          onClick={this.props.onSubmit ? this._onSubmit : null} />
        {footer}
      </Form>
    );
  }

}

LoginForm.propTypes = {
  defaultValues: PropTypes.shape({
    username: PropTypes.string,
    rememberMe: PropTypes.bool
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  forgotPassword: PropTypes.node,
  logo: PropTypes.node,
  onSubmit: PropTypes.func,
  rememberMe: PropTypes.bool,
  secondaryText: PropTypes.string,
  title: PropTypes.string,
  usernameType: PropTypes.string
};

LoginForm.defaultProps = {
  defaultValues: {
    username: '',
    rememberMe: false
  },
  errors: [],
  usernameType: 'email'
};
