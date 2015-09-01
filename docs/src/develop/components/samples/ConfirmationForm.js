// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CheckBox = require('grommet/components/CheckBox');
var Footer = require('grommet/components/Footer');
var Button = require('grommet/components/Button');

var ConfirmationForm = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    prefix: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {prefix: 'cf'};
  },

  getInitialState: function () {
    return {acknowledged: false, error: null};
  },

  _onSubmit: function (event) {
    event.preventDefault();
    if (this.state.acknowledged) {
      this.props.onSubmit();
    } else {
      this.setState({error: 'required'});
    }
  },

  _onChangeCheckBox: function (event) {
    var acknowledged = event.target.checked;
    this.setState({acknowledged: acknowledged});
    if (acknowledged) {
      this.setState({error: null});
    }
  },

  render: function() {
    var p = this.props.prefix;

    return (
      <Form onSubmit={this._onSubmit} compact={this.props.compact}>
        <Header>
          <h1>Confirmation</h1>
        </Header>
        <FormFields>
          <fieldset>
            <p>You must acknowledge the destructive aspects of this action.</p>
            <FormField error={this.state.error}>
            <CheckBox id={p + "agree"} name="agree"
              label="I acknowledge that I may lose data."
              onChange={this._onChangeCheckBox} />
            </FormField>
          </fieldset>
        </FormFields>
        <Footer pad={{vertical: 'medium'}}>
          <Menu>
            <Button label="Destroy" primary={true} strong={true}
              onClick={this._onSubmit} />
          </Menu>
        </Footer>
      </Form>
    );
  }
});

module.exports = ConfirmationForm;
