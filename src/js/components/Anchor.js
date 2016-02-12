// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import iconsMap from '../index-icons';

const CLASS_ROOT = 'anchor';

export default class Anchor extends Component {

  render () {
    let icon;
    if (this.props.icon) {
      let CustomIcon  = iconsMap[this.props.icon];
      if (! CustomIcon) {
        console.warn(
          `Warning: Anchor is unable to find the icon named ${this.props.icon}`
        );
      } else {
        icon = <CustomIcon />;
      }
    } else if (this.props.primary) {
      let LinkNextIcon = iconsMap.LinkNext;
      icon = <LinkNextIcon />;
    }

    if (icon && !this.props.primary && !this.props.label) {
      icon = <span className={`${CLASS_ROOT}__icon`}>{icon}</span>;
    }

    let hasIcon = icon !== undefined;
    let children = Children.map(this.props.children, child => {
      if (child && child.type && child.type.icon) {
        hasIcon = true;
        child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
      }
      return child;
    });

    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--disabled`]: this.props.disabled,
        [`${CLASS_ROOT}--icon`]: icon,
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--icon-label`]: hasIcon && this.props.label
      }
    );

    if (!children) {
      children = this.props.label;
    }

    return (
      <this.props.tag id={this.props.id} className={classes}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}
        aria-label={this.props.a11yTitle}>
        {icon}
        {children}
      </this.props.tag>
    );
  }
};


Anchor.propTypes = {
  a11yTitle: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};
