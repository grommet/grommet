// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Footer = require('grommet/components/Footer');

var DocsFooter = React.createClass({

  propTypes: {
    centered: React.PropTypes.bool,
    colorIndex: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {centered: false};
  },

  render: function() {
    return (
      <Footer colorIndex={this.props.colorIndex} centered={this.props.centered}
        large={true} pad="large">
        {this.props.children}
        <div>
          This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
        </div>
      </Footer>
    );
  }
});

module.exports = DocsFooter;
