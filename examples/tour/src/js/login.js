// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LigoCore = require('ligo-core');
var Logo = require('./Logo');
var Login = LigoCore.Login;

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
