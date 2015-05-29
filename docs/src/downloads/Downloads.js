// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Content = require('./Content');
var Section = require('grommet/components/Section');
var GrommetDocument = require('grommet/components/Document');

var Downloads = React.createClass({

  render: function() {
    return (
      <Section>
        <GrommetDocument>
          <Content />
        </GrommetDocument>
      </Section>
    );
  }

});

module.exports = Downloads;
