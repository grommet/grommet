// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var CLASS_ROOT = "headline";

var Headline = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool,
    strong: React.PropTypes.bool
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.strong) {
      classes.push(CLASS_ROOT + "--strong");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Headline;
