// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('../utils/Router');
var AppStore = require('../stores/AppStore');
var SessionStore = require('../stores/SessionStore');
var SessionActions = require('../actions/SessionActions');

var Login = React.createClass({

  _onChange: function() {
    this.setState({session: SessionStore.getAll()});
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if (!username || !password) {
      this.setState({valid: false});
    } else {
      SessionActions.login(username, password);
    }
  },

  _onResize: function(e) {
    this.adjustBackground();
  },

  adjustBackground: function() {
    // make sure the background always fills the screen, preserve aspect ratio
    var windowRatio = window.innerWidth / window.innerHeight;
    var image = this.refs.background.getDOMNode();
    var imageRatio = image.scrollWidth / image.scrollHeight;
    this.setState({orientation: (windowRatio < imageRatio) ? 'portrait' : 'landscape'});
  },

  getInitialState: function() {
    var appData = AppStore.getAll();
    if (! appData || ! appData.title) {
      appData = this.props.app;
    }
    return {
      orientation: null,
      valid: true,
      app: appData,
      session: SessionStore.getAll()
    };
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    window.addEventListener('resize', this._onResize);
    this.refs.username.getDOMNode().focus();
    setTimeout(this.adjustBackground, 10);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', this._onResize);
  },

  render: function() {
    var classes = ['login__background'];
    if (this.state.orientation) {
      classes.push('login__background--' + this.state.orientation);
    }

    var messages = null;
    if (this.state.session && this.state.session.loginError) {
      messages = (
        <div className={"login__error"}>
          <div className={"login__error-message"}>
            {this.state.session.loginError.message}
          </div>
          <div className={"login__error-resolution"}>
            {this.state.session.loginError.resolution}
          </div>
        </div>
      );
    }

    var logo = '';
    if (this.state.app.logo) {
      logo = React.createFactory(this.state.app.logo)();
    }

    var background = '';
    if (this.state.app.background) {
      background = this.state.app.background;
    }

    return (
      <div className={"login"}>
        <img ref="background" className={classes.join(' ')}
          src={background} />
        <div className={"login__container"}>
          <div className={'login__logo'} >
            {logo}
          </div>
          <div className={'login__application beta'}>{this.state.app.title}</div>
          <form className={'login__form'} onSubmit={this._onSubmit}>
            <label>Username</label>
            <input className={'login__username'} ref="username" />
            <label>Password</label>
            <input type="password" className={'login__password'} ref="password" />
            {messages}
            <input type="submit" className={'login__submit primary'} value={'Login'} />
          </form>
        </div>
        <div className={"login__footer zeta"}>
          <span className={"login__copyright"}>{this.state.app.copyright}</span>
        </div>
      </div>
    );
  }

});

module.exports = Login;
