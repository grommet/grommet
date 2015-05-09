// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Status = require('grommet/components/icons/Status');
var DocsActions = require('./actions/DocsActions');
var DocsStore = require('./stores/DocsStore');

var RequestAccess = React.createClass({

  mixins: [Reflux.ListenerMixin],

  _onNameChange: function (event) {
    this.setState({name: event.target.value});
  },

  _onEmailChange: function (event) {
    this.setState({email: event.target.value});
  },

  _onPurposeChange: function (event) {
    this.setState({purpose: event.target.value});
  },

  _onGithubChange: function (event) {
    this.setState({github: event.target.value});
  },

  _onSubmit: function (event) {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.purpose && this.state.purpose) {
      this.setState({invalid: false});

      var data = {
        name: this.state.name,
        email: this.state.email,
        businessPurpose: this.state.purpose,
        github: this.state.github
      };

      DocsActions.requestAccess(data);
    } else {
      this.setState({invalid: true});
    }
  },

  _errorMessage: function (field) {
    var result = null;
    if (this.state.invalid && !this.state[field]) {
      result = 'required';
    }
    return result;
  },

  _onChange: function() {
    var state = this.getInitialState();
    if (DocsStore.requestAccessError()) {
      state.response = {
        status: 'error',
        msg: 'An unexpected error occured. Try again later.'
      };
    } else {
      state.response = {
        status: 'ok',
        msg: 'Request for access has been sucessfully sent.'
      };
    }

    this.setState(state);
  },

  getInitialState: function () {
    return {name: '', email: '', purpose: '', github: '', invalid: false};
  },

  componentDidMount: function() {
    this.listenTo(DocsStore, this._onChange);
  },

  render: function() {

    var msg = <span></span>;
    if (this.state.response) {
      msg = (
        <span>
          <Status value={this.state.response.status} />
          {this.state.response.msg}
        </span>
      );
    }
    return (
      <Layer>
        <Form compact={true} onSubmit={this._onSubmit}>
          <Header>
            <h1></h1>
            <Menu>
              <Link to="docs">
                <CloseIcon />
              </Link>
            </Menu>
          </Header>
          <FormFields className="request-access">
            <h3>Grommet is almost ready!</h3>
            <p>We would love to have you as a contributor.</p>
            <fieldset>
              <FormField htmlFor="name"
                label={"What's your name?"}
                error={this._errorMessage('name')}>
                <input id="name" type="text"
                  value={this.state.name}
                  onChange={this._onNameChange} />
              </FormField>
              <FormField htmlFor="email"
                label={"What's your email address?"}
                error={this._errorMessage('email')}>
                <input ref="email" id="email" type="email"
                  value={this.state.email}
                  onChange={this._onEmailChange} />
              </FormField>
              <FormField htmlFor="github"
                label={"What's your Github account?"}
                error={this._errorMessage('github')}>
                <input ref="github" id="github" type="text"
                  value={this.state.github}
                  onChange={this._onGithubChange} />
              </FormField>
              <FormField htmlFor="purpose"
                label={"What are you considering Grommet for?"}
                error={this._errorMessage('purpose')}>
                <input ref="purpose" id="purpose" type="text"
                  value={this.state.purpose}
                  onChange={this._onPurposeChange} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer>
            <Menu direction="left">
              <input type="submit" className="primary" value="Send"
                onClick={this._onSubmit} />
            </Menu>
            {msg}
          </Footer>
        </Form>
      </Layer>
    );
  }

});

module.exports = RequestAccess;
