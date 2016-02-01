// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CLASS_ROOT = 'button';

const Button = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--primary`]: props.primary,
      [`${CLASS_ROOT}--secondary`]: props.secondary,
      [`${CLASS_ROOT}--accent`]: props.accent,
      [`${CLASS_ROOT}--disabled`]: !props.onClick,
      [`${CLASS_ROOT}--fill`]: props.fill,
      [`${CLASS_ROOT}--icon`]: props.type === 'icon'
    }
  );

  let type = props.type === 'icon' ? 'button' : props.type;

  let children = React.Children.map(props.children, child => {
    if (child && child.type && child.type.icon) {
      child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
    }

    return child;
  });

  if (!children) {
    children = props.label;
  }

  return (
    <button id={props.id} type={type} className={classes}
      onClick={props.onClick} disabled={!props.onClick}
      aria-label={props.a11yTitle}>
      {children}
    </button>
  );
};

Button.propTypes = {
  a11yTitle: PropTypes.string,
  accent: PropTypes.bool,
  fill: PropTypes.bool,
  icon: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit', 'icon'])
};

Button.defaultProps = {
  type: 'button'
};

Button.displayName = 'Button';

export default Button;
