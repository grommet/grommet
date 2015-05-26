// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "sidebar";

var Sidebar = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    primary: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {primary: false};
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
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

module.exports = Sidebar;
