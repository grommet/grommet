// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_NAME = "login-form";

var LoginForm = React.createClass({

  propTypes: {
    logo: React.PropTypes.node,
    title: React.PropTypes.string,
    rememberMe: React.PropTypes.bool,
    forgotPassword: React.PropTypes.node,
    errors: React.PropTypes.arrayOf(React.PropTypes.string),
    onSubmit: React.PropTypes.func
  },

  _onSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if (this.props.onSubmit) {
      this.props.onSubmit({username: username, password: password});
    }
  },

  getDefaultProps: function () {
    return ({
      errors: []
    });
  },

  componentDidMount: function() {
    this.refs.username.getDOMNode().focus();
  },

  render: function() {
    var classes = [CLASS_NAME];

    var errors = this.props.errors.map(function (error, index) {
      return (<div key={index} className={CLASS_NAME + "__error"}>{error}</div>);
    });

    var logo = null;
    if (this.props.logo) {
      logo = (
        <div className={CLASS_NAME + "__logo"}>
          {this.props.logo}
        </div>
      );
    }

    var title = null;
    if (this.props.title) {
      title = (
        <h1 className={CLASS_NAME + "__title"}>
          {this.props.title}
        </h1>
      );
    }

    var footer = null;
    if (this.props.rememberMe || this.props.forgotPassword) {
      var rememberMe = null;
      if (this.props.rememberMe) {
        rememberMe = (
          <span className={CLASS_NAME + "__remember-me"}>
            <input id="remember-me" type="checkbox" />
            <label htmlFor="remember-me" className="checkbox">Remember me</label>
          </span>
        );
      }
      footer = (
        <div className={CLASS_NAME + "__footer"}>
          {rememberMe}
          {this.props.forgotPassword}
        </div>
      );
    }

    return (
      <form className={classes.join(' ')} onSubmit={this._onSubmit}>
        {logo}
        {title}
        <fieldset>
          <label>Username</label>
          <input className={CLASS_NAME + "__username"} ref="username" />
          <label>Password</label>
          <input type="password" className={CLASS_NAME + "__password"} ref="password" />
        </fieldset>
        {errors}
        <input type="submit" className={CLASS_NAME + "__submit primary call-to-action"} value={'Log in'} />
        {footer}
      </form>
    );
  }

});

module.exports = LoginForm;
