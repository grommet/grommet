// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');
var RightIcon = require('./icons/base/LinkNext');

var CLASS_ROOT = "anchor";

var Anchor = React.createClass({

  propTypes: {
    href: React.PropTypes.string,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    primary: React.PropTypes.bool,
    tag: React.PropTypes.string,
    target: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {tag: 'a'};
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
    var children = React.Children.map(this.props.children, function (child) {
      if (child.type && 'Icon' === child.type.name) {
        return <span className={CLASS_ROOT + "__icon"}>{child}</span>;
      } else {
        return child;
      }
    });

    return (
      <this.props.tag id={this.props.id} className={classes.join(' ')}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}>
        {icon}
        {children}
      </this.props.tag>
    );
  }

});

module.exports = Anchor;
