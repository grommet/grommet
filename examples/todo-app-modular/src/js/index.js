// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("../scss/index.scss");

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var TodoAppDashboard = require('./components/TodoAppDashboard');

var Main = React.createClass({
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

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');
