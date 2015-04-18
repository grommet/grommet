// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Dialog = require('grommet/components/Dialog');
var Form = require('grommet/components/Form');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Link = require('react-router').Link;

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
    var invalid = false;
    if (this.state.name && this.state.email && this.state.purpose) {
      this.setState({invalid: false});
      console.log('!!! RequestAccess submit TBD');
      this.setState({tbd: "Request access processing hasn't been wired up yet. Come back soon!"});
    } else {
      this.setState({invalid: true});
    }
  },

  _errorMessage: function (field) {
    var result = null;
    if (this.state.invalid && ! this.state[field]) {
      result = 'required';
    }
    return result;
  },

  getInitialState: function () {
    return {name: '', email: '', purpose: '', invalid: false};
  },

  render: function() {

    var tbd = null;
    if (this.state.tbd) {
      tbd = (<p className="error">{this.state.tbd}</p>);
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
            <h3>Grommet is almost ready for primetime!</h3>
            <p>We'll make sure you're the first to know when Grommet goes live.</p>
            <fieldset>
              <FormField error={this._errorMessage('name')}>
                <label htmlFor="name">What's your name?</label>
                <input id="name" type="text"
                  value={this.state.name}
                  onChange={this._onNameChange} />
              </FormField>
              <FormField error={this._errorMessage('email')}>
                <label htmlFor="email">What's your email address?</label>
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
            <span>
              <input type="submit" className="primary" value="Notify me"
                onClick={this._onSubmit} />
              {tbd}
            </span>
            <span></span>
          </Footer>
        </Form>
      </Dialog>
    );
  }

});

module.exports = RequestAccess;
