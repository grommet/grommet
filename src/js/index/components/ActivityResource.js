// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Resource = require('../components/Resource');

var ActivityResource = React.createClass({

  render: function() {
    return (
      <Resource category={['alerts', 'tasks']} />
    );
  }

});

module.exports = ActivityResource;
