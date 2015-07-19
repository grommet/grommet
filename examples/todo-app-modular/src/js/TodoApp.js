// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var TodoAppDashboard = require('./components/TodoAppDashboard');

var TodoApp = React.createClass({
  render: function() {
    return (
      <App centered={false}>
        <Header primary={true}>
          <Title>Todo App Modular</Title>
        </Header>
        <TodoAppDashboard />
      </App>
    );
  }
});

module.exports = TodoApp;
