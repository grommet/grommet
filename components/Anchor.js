// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RightIcon = require('./icons/Right');

var CLASS_ROOT = "anchor";

var Anchor = React.createClass({

  propTypes: {
    href: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool
  },

  render: function () {
    var classes = [CLASS_ROOT];
    var icon;
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
      icon = <RightIcon />;
    }
    if (! this.props.onClick) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <a className={classes.join(' ')}
        href={this.props.href}
        onClick={this.props.onClick}>
        {icon}
        {this.props.children}
      </a>
    );
  }

});

module.exports = Anchor;
