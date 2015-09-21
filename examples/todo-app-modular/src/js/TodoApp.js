// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var TodoAppDashboard = require('./components/TodoAppDashboard');

var TodoApp = React.createClass({
  render: function() {
    return (
      <App centered={false}>
        <Header direction="row" justify="between"
          large={true} pad={{horizontal: 'medium'}}>
          <Title>Todo App Modular</Title>
        </Header>
        <TodoAppDashboard />
        <Footer appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!</p>
        </Footer>
      </App>
    );
  }
});

module.exports = TodoApp;
