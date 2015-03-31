// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Documents = require('Documents');
var Content = require('./Content');

var Downloads = React.createClass({

  render: function() {    
  	return (
      <Documents.Document>
      	<Content />
      </Documents.Document>
    );
  }

});

module.exports = Downloads;
