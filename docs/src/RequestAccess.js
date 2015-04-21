// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var Dialog = require('grommet/components/Dialog');
var Form = require('grommet/components/Form');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Status = require('grommet/components/icons/Status');
var Actions = require('./actions/DocsActions');
var DocsStore = require('./stores/DocsStore');

var RequestAccess = React.createClass({

  _onNameChange: function (event) {
    this.setState({name: event.target.value});
  },

  _onEmailChange: function (event) {
    this.setState({email: event.target.value});
  },

  _onPurposeChange: function (event) {
    this.setState({purpose: event.target.value});
  },

  _onSubmit: function (event) {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.purpose) {
      this.setState({invalid: false});
      
      var data = {
        name: this.state.name,
        email: this.state.email,
        businessPurpose: this.state.purpose
      };

      Actions.requestAccess(data);      
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
    return {name: '', email: '', purpose: '', invalid: false};
  },

  componentDidMount: function() {
    DocsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DocsStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var msg = null;
    if (this.state.response) {
      msg = (
        <p>
          <Status value={this.state.response.status} />
          {this.state.response.msg}
        </p>
      );
    }
    return (
      <Dialog compact={true}>
        <Form compact={true} onSubmit={this._onSubmit}>
          <Header>
            <h1></h1>
            <Menu>
              <Link to="docs">
                <div className="control-icon">
                  <CloseIcon />
                </div>
              </Link>
            </Menu>
          </Header>
          <div>
            <h3>Grommet is almost ready!</h3>
            <p>We would love to have you as a contributor.</p>
            <fieldset>
              <FormField error={this._errorMessage('name')}>
                <label htmlFor="name">What&#39;s your name?</label>
                <input id="name" type="text"
                  value={this.state.name}
                  onChange={this._onNameChange} />
              </FormField>
              <FormField error={this._errorMessage('email')}>
                <label htmlFor="email">What&#39;s your email address?</label>
                <input ref="email" id="email" type="email"
                  value={this.state.email}
                  onChange={this._onEmailChange} />
              </FormField>
              <FormField error={this._errorMessage('purpose')}>
                <label htmlFor="purpose">What are you considering Grommet for?</label>
                <input ref="purpose" id="purpose" type="text"
                  value={this.state.purpose}
                  onChange={this._onPurposeChange} />
              </FormField>
            </fieldset>
          </div>
          <Footer>
            <div>
              <input type="submit" className="primary" value="Send"
                onClick={this._onSubmit} />
            </div>
            {msg}
          </Footer>
        </Form>
      </Dialog>
    );
  }

});

module.exports = RequestAccess;
