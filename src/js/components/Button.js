// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import iconsMap from '../index-icons';

const CLASS_ROOT = 'button';

const Button = props => {
  const plain = (props.plain || (props.icon && ! props.label)
    || 'icon' === props.type);
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--primary`]: props.primary,
      [`${CLASS_ROOT}--secondary`]: props.secondary,
      [`${CLASS_ROOT}--accent`]: props.accent,
      [`${CLASS_ROOT}--disabled`]: !props.onClick,
      [`${CLASS_ROOT}--fill`]: props.fill,
      [`${CLASS_ROOT}--plain`]: plain
    }
  );

  // if ('icon' === props.type) {
  //   console.warn('Button type="icon" is deprecated, use plain={true} instead.');
  // }

  let type = props.type === 'icon' ? 'button' : props.type;

  let icon;
  if (props.icon) {
    let CustomIcon  = iconsMap[props.icon];
    if (! CustomIcon) {
      console.warn(
        `Warning: Button is unable to find the icon named ${props.icon}`
      );
    } else {
      icon = <span className={`${CLASS_ROOT}__icon`}><CustomIcon /></span>;
    }
  }

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
      {icon}
      {children}
    </button>
  );
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

Button.displayName = 'Button';

export default Button;
