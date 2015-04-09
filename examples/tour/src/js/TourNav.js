// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Ligo = require('ligo');
var TourMenu = require('./TourMenu');

var TourNav = React.createClass({

  render: function() {
    return (
      <Ligo.NavUnified onRequestClose={this.props.onRequestClose} menu={<TourMenu />} />
    );
  }

});

module.exports = TourNav;