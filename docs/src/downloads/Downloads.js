// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var Layout = require('grommet/components/Layout');
var GrommetDocument = require('grommet/components/Document');

var Downloads = React.createClass({

  render: function() {
  	return (
      <Layout centerColumn={true}>
        <GrommetDocument>
          <Content />
        </GrommetDocument>
      </Layout>
    );
  }

});

module.exports = Downloads;
