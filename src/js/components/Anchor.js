// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import RightLeftIcon from './icons/LinkRightLeft';

const CLASS_ROOT = "anchor";

export default class Anchor extends Component {
  render () {
    let classes = [CLASS_ROOT];
    let icon;

    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
      icon = <RightLeftIcon />;
    }
    if (this.props.disabled) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    let children = React.Children.map(this.props.children, function (child) {
      if (child && child.type && child.type.icon) {
        return <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
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
  disabled: PropTypes.bool,
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
