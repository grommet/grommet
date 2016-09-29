// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import LinkNextIcon from './icons/base/LinkNext';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ANCHOR;

export default class Anchor extends Component {

  render () {
    const {
      animateIcon, children, className, disabled, icon, id, label, primary,
      reverse, tag, ...props
    } = this.props;

    let anchorIcon;
    if (icon) {
      anchorIcon = icon;
    } else if (primary) {
      anchorIcon = (
        <LinkNextIcon
          a11yTitle={id ? `${id}-icon` : 'link next'}
          a11yTitleId={id ?
            `${id}-icon` :
            'anchor-next-title-id'
          }
        />
      );
    }

    if (anchorIcon && !primary && !label) {
      anchorIcon = <span className={`${CLASS_ROOT}__icon`}>{anchorIcon}</span>;
    }

    let hasIcon = anchorIcon !== undefined;
    let anchorChildren = Children.map(children, child => {
      if (child && child.type && child.type.icon) {
        hasIcon = true;
        child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
      }
      return child;
    });

    let classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--animate-icon`]: hasIcon && animateIcon !== false,
        [`${CLASS_ROOT}--disabled`]: disabled,
        [`${CLASS_ROOT}--icon`]: anchorIcon || hasIcon,
        [`${CLASS_ROOT}--icon-label`]: hasIcon && label,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--reverse`]: reverse
      }
    );

    if (!anchorChildren) {
      anchorChildren = label;
    }

    const first = reverse ? anchorChildren : anchorIcon;
    const second = reverse ? anchorIcon : anchorChildren;

    const Component = tag;
    return (
      <Component {...props} id={id} className={classes}>
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
  reverse: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};
