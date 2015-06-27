// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var DocsHeader = require('./DocsHeader');
var Section = require('grommet/components/Section');
var TBD = require('grommet/components/TBD');

var Introduction = React.createClass({

  render: function() {
    return (
      <GrommetDocument>
        <DocsHeader />

        <Section flush={false} colorIndex="neutral-1">
          <h1>Introduction</h1>
        </Section>

        <Section>
          <TBD />
        </Section>

      </GrommetDocument>
    );
  }
});

module.exports = Introduction;
