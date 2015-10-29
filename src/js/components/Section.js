// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Box = require('./Box');
var SkipLinkAnchor = require('./SkipLinkAnchor');
var merge = require('lodash/object/merge');

var CLASS_ROOT = "section";

var Section = React.createClass({

  propTypes: merge(Box.propTypes, {
    primary: React.PropTypes.bool
  }),

  getDefaultProps: function () {
    return {pad: {vertical: 'medium'}};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var skipLinkAnchor = null;
    if (this.props.primary) {
      skipLinkAnchor = <SkipLinkAnchor label="Main Content" />;
    }

    return (
      <Box tag="section" {...this.props} className={classes.join(' ')}>
        {skipLinkAnchor}
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Section;
