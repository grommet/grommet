// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var LigoApp = require('ligo')('app');
var LigoHeader = require('ligo')('header');
var LigoTitle = require('ligo')('title');

var Tour = React.createClass({

  render: function() {
    return (
      <LigoApp>
        <LigoHeader primary={true}>
          <LigoTitle>
            {"Ligo Tour"}
          </LigoTitle>
          <div />
        </LigoHeader>
        <RouteHandler />
      </LigoApp>
    );
  }

});

module.exports = Tour;
