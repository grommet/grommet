// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Logo = require('./Logo');

var TodoApp = React.createClass({

  render: function() {
    return (
      <App>
        <Header primary={true}>
          <Title>
            <Logo />
            TodoApp
          </Title>
          <div />
        </Header>
        <RouteHandler />
      </App>
    );
  }

});

module.exports = TodoApp;
