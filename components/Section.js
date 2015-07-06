// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Box = require('./Box');

var CLASS_ROOT = "section";

var Section = React.createClass({

  propTypes: Box.propTypes,

  getDefaultProps: function () {
    return {pad: {vertical: 'medium'}};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box tag="section" {...this.props} className={classes.join(' ')}>
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Section;
