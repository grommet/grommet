// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CheckBox = require('grommet/components/CheckBox');
var RadioButton = require('grommet/components/RadioButton');
var Footer = require('grommet/components/Footer');
var Button = require('grommet/components/Button');
var Validator = require('grommet/utils/Validator');

var AddUserForm = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    prefix: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {prefix: 'auf'};
  },

  getInitialState: function () {
    return {
      user: {
        login: '',
        name: '',
        password: '',
        role: 'specialized',
        backupAdmin: false,
        networkAdmin: false,
        serverAdmin: false,
        storageAdmin: false,
        email: '',
        officePhone: '',
        mobilePhone: ''
      },
      validation: {errors: {}},
      submitting: false
    };
  },

  componentDidUpdate: function () {
    var errors = document.querySelectorAll('.form-field--error');
    if (errors.length > 0) {
      var input = errors[0].querySelectorAll('input')[0];
      if (input) {
        input.focus();
      }
    }
  },

  _validate: function (submitting) {
    var user = this.state.user;

    var rules = [
      {field: 'login', test: (! user.login), message: 'required'},
      {field: 'password', tests: [
        {test: (! user.password), message: 'required'},
        {test: (user.password.length < 8), message: 'must be at least 8 characters'}
      ]}
    ];

    var validation = Validator.validate(rules);

    if (submitting) {
      this.setState({validation: validation});
    }

    return validation.valid;
  },

  _onSubmit: function (event) {
    event.preventDefault();
    var valid = this._validate(true);
    if (valid) {
      this.props.onSubmit();
    }
  },

  _onChange: function (event) {
    console.log('!!! AddUserForm changed', event.target, 'to', event.target.value);
    var user = this.state.user;
    user[event.target.getAttribute('name')] = event.target.value;
    this.setState({user: user});
    this._validate(false);
  },

  _onChangeCheckBox: function (event) {
    console.log('!!! AddUserForm checkbox changed', event.target, 'to', event.target.checked);
    var user = this.state.user;
    user[event.target.getAttribute('name')] = event.target.checked;
    this.setState({user: user});
    this._validate(false);
  },

  render: function() {
    var p = this.props.prefix;
    var user = this.state.user;
    var errors = this.state.validation.errors;

    return (
      <Form onSubmit={this._onSubmit} compact={this.props.compact}>
        <Header>
          <h1>Add User</h1>
        </Header>
        <FormFields>
          <fieldset>
            <FormField label="Login name" htmlFor={p + "login"} error={errors.login}>
              <input id={p + "login"} name="login" type="text"
                value={user.login} onChange={this._onChange} />
            </FormField>
            <FormField label="Full name" htmlFor={p + "name"} error={errors.name}>
              <input id={p + "name"} name="name" type="text"
                value={user.name} onChange={this._onChange} />
            </FormField>
            <FormField label="Password" htmlFor={p + "password"} error={errors.password}>
              <input id={p + "password"} name="password" type="password"
                value={user.password} onChange={this._onChange} />
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Role</legend>
            <FormField>
              <RadioButton id={p + "role-specialized"} name="role" label="Specialized"
                value="specialized" checked={user.role === 'specialized'}
                onChange={this._onChange} />
              <FormField hidden={user.role !== 'specialized'}>
                <CheckBox id={p + "sub-role-backup"} name="backupAdmin"
                  label="Backup administrator"
                  checked={user.backupAdmin} onChange={this._onChangeCheckBox} />
                <CheckBox id={p + "sub-role-network"} name="networkAdmin"
                  label="Network administrator"
                  checked={user.networkAdmin} onChange={this._onChangeCheckBox} />
                <CheckBox id={p + "sub-role-server"} name="serverAdmin"
                  label="Server administrator"
                  checked={user.serverAdmin} onChange={this._onChangeCheckBox} />
                <CheckBox id={p + "sub-role-storage"} name="storageAdmin"
                  label="Storage administrator"
                  checked={user.storageAdmin} onChange={this._onChangeCheckBox} />
              </FormField>
            </FormField>
            <FormField>
              <RadioButton id={p + "role-full"} name="role" label="Full"
                value="full" checked={user.role === 'full'}
                onChange={this._onChange} />
            </FormField>
            <FormField>
              <RadioButton id={p + "role-read-only"} name="role" label="Read only"
                value="read-only" checked={user.role === 'read-only'}
                onChange={this._onChange} />
            </FormField>
          </fieldset>

          <fieldset>
            <legend>Contact</legend>
            <FormField label="Email" htmlFor={p + "email"}>
              <input id={p + "email"} name="email" type="text"
                value={user.email} onChange={this._onChange} />
            </FormField>
            <FormField label="Office phone" htmlFor={p + "office-phone"}>
              <input id={p + "office-phone"} name="office-phone" type="text"
                value={user.officePhone} onChange={this._onChange} />
            </FormField>
            <FormField label="Mobile phone" htmlFor={p + "mobile-phone"}>
              <input id={p + "mobile-phone"} name="mobile-phone" type="text"
                value={user.mobilePhone} onChange={this._onChange} />
            </FormField>
          </fieldset>
        </FormFields>
        <Footer pad={{vertical: 'medium'}}>
          <Menu>
            <Button label="Add" primary={true} strong={true} onClick={this._onSubmit} />
          </Menu>
        </Footer>
      </Form>
    );
  }
});

module.exports = AddUserForm;
