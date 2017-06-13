// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from './Button';
import CheckBox from './CheckBox';
import FormattedMessage from './FormattedMessage';
import Form from './Form';
import FormField from './FormField';
import Footer from './Footer';
import Heading from './Heading';
import Paragraph from './Paragraph';
import Box from './Box';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LOGIN_FORM;

export default class LoginForm extends Component {

  constructor(props, context) {
    super(props, context);

    this._onSubmit = this._onSubmit.bind(this);
    this._onUsernameChange = this._onUsernameChange.bind(this);
    this._onPasswordChange = this._onPasswordChange.bind(this);
    this._onRememberMeChange = this._onRememberMeChange.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = {
      password: '',
      rememberMe: props.defaultValues.rememberMe,
      username: props.defaultValues.username
    };
  }

  componentDidMount () {
    if (this.usernameRef) {
      this.usernameRef.focus();
    }
  }

  _onChange (args) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(args);
    }
  }

  _onUsernameChange (event) {
    const username = event.target.value;
    this.setState({ username });
    this._onChange({ event, username });
  }

  _onPasswordChange (event) {
    const password = event.target.value;
    this.setState({ password });
    this._onChange({ event, password });
  }

  _onRememberMeChange (event) {
    const rememberMe = event.target.checked;
    this.setState({ rememberMe });
    this._onChange({ event, rememberMe });
  }

  _onSubmit (event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    let { password, rememberMe, username } = this.state;

    username = username.trim();

    if (onSubmit) {
      onSubmit({username, password, rememberMe});
    }
  }

  render () {
    const {
      align, errors, forgotPassword,
      logo, onSubmit, rememberMe, secondaryText, title, usernameType
    } = this.props;

    const classes = classnames(CLASS_ROOT, this.props.className);
    const center = ! align || 'stretch' === align || 'center' === align;

    const errorsNode = errors.map((error, index) => {
      let errorComponent;
      if (error) {
        errorComponent = (
          <div key={index} className='error'>
            <FormattedMessage id={error} defaultMessage={error} />
          </div>
        );
      }
      return errorComponent;
    });

    let titleNode;
    if (title) {
      titleNode = <Heading strong={true}>{title}</Heading>;
    }

    let secondaryTextNode;
    if (secondaryText) {
      secondaryTextNode = (
        <Paragraph align={align} margin="none">{secondaryText}</Paragraph>
      );
    }

    let rememberMeNode;
    if (rememberMe) {
      const rememberMeLabel = (
        <FormattedMessage id="Remember me" defaultMessage="Remember me" />
      );

      rememberMeNode = (
        <CheckBox label={rememberMeLabel} checked={this.state.rememberMe}
          onChange={this._onRememberMeChange} />
      );
    }

    const username = usernameType === 'email' ? (
      <FormattedMessage id="Email" defaultMessage="Email" />
    ) : (
      <FormattedMessage id="Username" defaultMessage="Username" />
    );

    const password = (
      <FormattedMessage id="Password" defaultMessage="Password" />
    );
    const login = <FormattedMessage id="Log In" defaultMessage="Log In" />;

    return (
      <Form className={classes} pad="medium" onSubmit={this._onSubmit}>
        <Box align={align}>
          {logo}
          {titleNode}
          {secondaryTextNode}
        </Box>
        <fieldset>
          <FormField htmlFor="username" label={username}>
            <input type={usernameType} ref={ref => this.usernameRef = ref}
              value={this.state.username}
              onChange={this._onUsernameChange} />
          </FormField>
          <FormField htmlFor="password" label={password}>
            <input type="password" value={this.state.password}
              onChange={this._onPasswordChange} />
          </FormField>
          {errorsNode}
        </fieldset>
        <Footer size="small" direction="column"
          align={center ? 'stretch' : 'start'}
          pad={{vertical: 'none', between: 'medium'}}>
          {rememberMeNode}
          <Button primary={true} fill={center}
            type={onSubmit ? "submit" : "button"}
            label={login}
            onClick={onSubmit ? this._onSubmit : undefined} />
          {forgotPassword}
        </Footer>
      </Form>
    );
  }

}

LoginForm.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  defaultValues: PropTypes.shape({
    username: PropTypes.string,
    rememberMe: PropTypes.bool
  }),
  errors: PropTypes.arrayOf(PropTypes.string),
  forgotPassword: PropTypes.node,
  logo: PropTypes.node,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  rememberMe: PropTypes.bool,
  secondaryText: PropTypes.string,
  title: PropTypes.string,
  usernameType: PropTypes.string
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
