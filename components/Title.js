// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Box = require('./Box');

var Title = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      align: "center",
      direction: "row",
      responsive: false
    };
  },

  render: function() {
    var classes = ["title"];
    if (this.props.onClick) {
      classes.push("title--interactive");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box {...this.props} className={classes.join(' ')} onClick={this.props.onClick}>
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Title;
