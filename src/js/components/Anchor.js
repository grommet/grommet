// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import RightIcon from './icons/base/LinkNext';

const CLASS_ROOT = "anchor";

class Anchor extends Component {
  render () {
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
}

Anchor.propTypes = {
  href: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};

module.exports = Anchor;
