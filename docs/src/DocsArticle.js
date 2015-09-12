// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var DocsFooter = require('./DocsFooter');

var DocsArticle = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    title: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {colorIndex: 'neutral-1'};
  },

  render: function() {
    return (
      <Article primary={true} pad={{horizontal: 'large'}}>
        <Header size="large" colorIndex={this.props.colorIndex}>
          <h1>{this.props.title}</h1>
        </Header>
        {this.props.children}
        <DocsFooter />
      </Article>
    );
  }
});

module.exports = DocsArticle;
