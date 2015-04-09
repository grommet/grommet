// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var Ligo = require('ligo');

var Downloads = React.createClass({

  render: function() {
  	return (
      <Ligo.Document centerColumn={true} accentIndex={1}>
      	<Content />
      </Ligo.Document>
    );
  }

});

module.exports = Downloads;
