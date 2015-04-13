// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var LigoDocument = require('ligo/components/Document');

var Downloads = React.createClass({

  render: function() {
  	return (
      <LigoDocument centerColumn={true} accentIndex={1}>
      	<Content />
      </LigoDocument>
    );
  }

});

module.exports = Downloads;
