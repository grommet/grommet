// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BUTTON;

export default class Button extends Component {
  render () {
    const plain = (this.props.plain !== undefined ? this.props.plain :
      (this.props.icon && ! this.props.label));

    let icon;
    if (this.props.icon) {
      icon = <span className={`${CLASS_ROOT}__icon`}>{this.props.icon}</span>;
    }

    let hasIcon = icon !== undefined;
    let children = React.Children.map(this.props.children, child => {
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
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--secondary`]: this.props.secondary,
        [`${CLASS_ROOT}--accent`]: this.props.accent,
        [`${CLASS_ROOT}--disabled`]: !this.props.onClick && !this.props.href,
        [`${CLASS_ROOT}--fill`]: this.props.fill,
        [`${CLASS_ROOT}--plain`]: plain,
        [`${CLASS_ROOT}--icon`]: this.props.icon || hasIcon,
        [`${CLASS_ROOT}--align-${this.props.align}`]: this.props.align
      }
    );

    if (!children) {
      children = this.props.label;
    }

    let Tag = this.props.href ? 'a' : 'button';
    let type;
    if (!this.props.href) {
      type = this.props.type;
    }
    return (
      <Tag href={this.props.href} id={this.props.id} type={type}
        className={classes} aria-label={this.props.a11yTitle}
        onClick={this.props.onClick}
        disabled={!this.props.onClick && !this.props.href}>
        {icon}
        {children}
      </Tag>
    );
  }
};

Button.propTypes = {
  a11yTitle: PropTypes.string,
  accent: PropTypes.bool,
  align: PropTypes.oneOf(['start', 'center', 'end']),
  fill: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.element,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  type: 'button'
};
