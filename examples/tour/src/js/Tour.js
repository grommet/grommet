// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Ligo = require('ligo');
var TourNav = require('./TourNav');

var Tour = React.createClass({

  render: function() {
    return (
      <Ligo.App>
        <Ligo.Header primary={true}>
          <Ligo.Title nav={TourNav}>
            {"Ligo Tour"}
          </Ligo.Title>
          <div />
        </Ligo.Header>
        <RouteHandler />
      </Ligo.App>
    );
  }

});

module.exports = Tour;
