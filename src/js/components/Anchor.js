// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component, PropTypes } from 'react';
import classnames from 'classnames';
import LinkNextIcon from './icons/base/LinkNext';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ANCHOR;

export default class Anchor extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (event) {
    const { method, onClick, path} = this.props;
    const { router } = this.context;

    event.preventDefault();

    if ('push' === method) {
      router.push(path);
    } else if ('replace' === method) {
      router.replace(path);
    }

    if (onClick) {
      onClick();
    }
  }

  render () {
    const {
      a11yTitle, animateIcon, children, className, disabled, href, icon, id,
      label, onClick, path, primary, reverse, tag, ...props
    } = this.props;
    delete props.method;
    const { router } = this.context;

    let anchorIcon;
    if (icon) {
      anchorIcon = icon;
    } else if (primary) {
      anchorIcon = (
        <LinkNextIcon
          a11yTitle={id ? `${id}-icon` : 'link next'} />
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

    let adjustedHref = (path && router) ? router.createPath(path) : href;

    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--animate-icon`]: hasIcon && animateIcon !== false,
        [`${CLASS_ROOT}--disabled`]: disabled,
        [`${CLASS_ROOT}--icon`]: anchorIcon || hasIcon,
        [`${CLASS_ROOT}--icon-label`]: hasIcon && label,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--reverse`]: reverse,
        [`${CLASS_ROOT}--active`]: (router && path && router.isActive(path))
      },
      className
    );

    let adjustedOnClick = (path && router ? this._onClick : onClick);

    if (!anchorChildren) {
      anchorChildren = label;
    }

    const first = reverse ? anchorChildren : anchorIcon;
    const second = reverse ? anchorIcon : anchorChildren;

    const Component = tag;
    return (
      <Component {...props} href={adjustedHref} className={classes}
        aria-label={a11yTitle} onClick={adjustedOnClick}>
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
  method: PropTypes.oneOf(['push', 'replace']),
  onClick: PropTypes.func,
  path: PropTypes.string,
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string
};

Anchor.defaultProps = {
  method: 'push',
  tag: 'a'
};

Anchor.contextTypes = {
  router: PropTypes.object
};
