// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var DocumentFooter = require('DocumentFooter');

var Downloads = React.createClass({

  render: function() {    
  	return (
      <div className="downloads">
      	<Content />
      	<DocumentFooter />
      </div>
    );
  }

});

module.exports = Downloads;
