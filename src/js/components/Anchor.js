// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import LinkNextIcon from './icons/base/LinkNext';

const CLASS_ROOT = 'anchor';

export default class Anchor extends Component {

  render () {
    let icon;
    if (this.props.icon) {
      icon = this.props.icon;
    } else if (this.props.primary) {
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
        [`${CLASS_ROOT}--animate-icon`]: hasIcon && this.props.animateIcon !== false,
        [`${CLASS_ROOT}--disabled`]: this.props.disabled,
        [`${CLASS_ROOT}--icon`]: icon,
        [`${CLASS_ROOT}--icon-label`]: hasIcon && this.props.label,
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--reverse`]: this.props.reverse
      }
    );

    if (!children) {
      children = this.props.label;
    }

    const first = this.props.reverse ? children : icon;
    const second = this.props.reverse ? icon : children;

    const Component = this.props.tag;
    return (
      <Component id={this.props.id} className={classes}
        href={this.props.href}
        target={this.props.target}
        onClick={this.props.onClick}
        aria-label={this.props.a11yTitle}>
        {first}
        {second}
      </Component>
    );
  }
};

Anchor.propTypes = {
  a11yTitle: PropTypes.string,
  animateIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string,
  reverse: PropTypes.bool
};

Anchor.defaultProps = {
  tag: 'a'
};
