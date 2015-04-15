// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var Layout = require('ligo/components/Layout');
var LigoDocument = require('ligo/components/Document');

var Downloads = React.createClass({

  render: function() {
  	return (
      <Layout centerColumn={true}>
        <LigoDocument>
          <Content />
        </LigoDocument>
      </Layout>
    );
  }

});

module.exports = Downloads;
