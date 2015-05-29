// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Login = require('grommet/components/Login');
var Logo = require('./Logo');

var config = {
  logo: Logo,
  title: 'Grommet Medium',
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
