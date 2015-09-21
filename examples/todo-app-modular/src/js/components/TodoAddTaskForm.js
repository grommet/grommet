// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');
var Box = require('grommet/components/Box');

var defaultState = {
  item: undefined,
  status: undefined
};

var TodoAddTaskForm = React.createClass({

  getInitialState: function () {
    return defaultState;
  },

  _onSubmit: function (event) {
    event.preventDefault();
    if (this.state.item) {
      this.props.onSubmit({
        item: this.state.item,
        status: this.state.status || 'ok'
      });
    }
  },

  _onItemChange: function (event) {
    this.setState({item: event.target.value});
  },

  _onStatusChange: function (event) {
    this.setState({status: event.target.value});
  },

  render: function() {
    return (
      <Layer onClose={this.props.onClose} closer={true}
        a11yCloserTitle={'Close the Add Task Form'}>
        <Form onSubmit={this._onSubmit}>
          <header><h1>Add Task</h1></header>
          <FormFields>
            <fieldset>
              <FormField label="Task" htmlFor="taskInput"
                help="what's to be done?">
                <input id="taskInput" name="task" type="text"
                  ref="taskInput" onChange={this._onItemChange} />
              </FormField>
              <FormField label="Status" htmlFor="statusInput">
                <select id="statusInput" name="status"
                  onChange={this._onStatusChange}>
                  <option value="ok">Done</option>
                  <option value="warning">Due Soon</option>
                  <option value="error">Past Due</option>
                </select>
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad={{vertical: 'medium'}}>
            <Menu direction="row" responsive={false}>
              <Box>
                <Button label="OK" primary={true}
                  onClick={this._onSubmit} type="submit"/>
              </Box>
              <Box>
                <Button label="Cancel" onClick={this.props.onClose} />
              </Box>
            </Menu>
          </Footer>
        </Form>
      </Layer>
    );
  }
});

module.exports = TodoAddTaskForm;
