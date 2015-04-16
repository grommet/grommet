// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var App = require('ligo/components/App');
var Header = require('ligo/components/Header');
var Title = require('ligo/components/Title');

var HelloWorld = React.createClass({

  render: function() {
    return (
      <App>
        <Header centerColumn={true} primary={true}>
          <Title>
            {"<Your App Name />"}
          </Title>
          <div />
        </Header>
        <RouteHandler />
      </App>
    );
  }

});

module.exports = HelloWorld;
