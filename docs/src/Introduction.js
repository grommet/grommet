// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var DocsHeader = require('./DocsHeader');
var Section = require('grommet/components/Section');
var TBD = require('grommet/components/TBD');

var Introduction = React.createClass({

  render: function() {
    return (
      <Article>
        <DocsHeader />

        <Section colorIndex="neutral-1" primary={true}>
          <h1>Introduction</h1>
        </Section>

        <Section>
          <TBD />
        </Section>

      </Article>
    );
  }
});

module.exports = Introduction;
