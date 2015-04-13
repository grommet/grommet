// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Login = require('ligo/components/Login');
var Logo = require('./Logo');

var config = {
  logo: Logo,
  title: 'Ligo Tour',
  background: 'img/piano_player.jpg',
  copyright: '2015 Hewlett Packard'
};

var prerender = React.createClass({

  render: function() {
    return (
      <Login app={config} />
    );
  }

});

module.exports = prerender;
