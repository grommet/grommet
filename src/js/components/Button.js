// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import iconsMap from '../index-icons';

const CLASS_ROOT = 'button';

export default class Button extends Component {
  render () {
    const plain = (this.props.plain !== undefined ? this.props.plain :
      (this.props.icon && ! this.props.label) || 'icon' === this.props.type);
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--primary`]: this.props.primary,
        [`${CLASS_ROOT}--secondary`]: this.props.secondary,
        [`${CLASS_ROOT}--accent`]: this.props.accent,
        [`${CLASS_ROOT}--disabled`]: !this.props.onClick && !this.props.href,
        [`${CLASS_ROOT}--fill`]: this.props.fill,
        [`${CLASS_ROOT}--plain`]: plain
      }
    );

    // if ('icon' === this.props.type) {
    //   console.warn('Button type="icon" is deprecated, use plain={true} instead.');
    // }

    let type = this.props.type === 'icon' ? 'button' : this.props.type;

    let icon;
    if (this.props.icon) {
      let CustomIcon  = iconsMap[this.props.icon];
      if (! CustomIcon) {
        console.warn(
          `Warning: Button is unable to find the icon named ${this.props.icon}`
        );
      } else {
        icon = <span className={`${CLASS_ROOT}__icon`}><CustomIcon /></span>;
      }
    }

    let children = React.Children.map(this.props.children, child => {
      if (child && child.type && child.type.icon) {
        child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
      }

      return child;
    });

    if (!children) {
      children = this.props.label;
    }

    let Tag = this.props.href ? 'a' : 'button';

    return (
      <Tag href={this.props.href} id={this.props.id} type={type}
        className={classes} aria-label={this.props.a11yTitle}
        onClick={this.props.onClick} disabled={!this.props.onClick}>
        {icon}
        {children}
      </Tag>
    );
  }
};

Button.propTypes = {
  a11yTitle: PropTypes.string,
  accent: PropTypes.bool,
  fill: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit', 'icon']) // deprecate icon
};

Button.defaultProps = {
  type: 'button'
};
