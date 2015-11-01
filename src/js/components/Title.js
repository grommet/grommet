// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var Box = require('./Box');

var CLASS_ROOT = "title";

var Title = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func,
    responsive: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      responsive: true
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.responsive) {
      classes.push(CLASS_ROOT + "--responsive");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--interactive");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box align="center" direction="row" responsive={false}
        className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Title;
