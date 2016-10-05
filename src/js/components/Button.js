// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.BUTTON;

export default class Button extends Component {
  constructor () {
    super();
    this.state = {
      mouseActive: false,
      focus: false
    };
  }

  render () {
    const {
      a11yTitle, accent, align, children, className, fill, href, icon, id,
      label, onClick, onBlur, onFocus, onMouseDown, onMouseUp, plain, primary,
      secondary, type, ...props
    } = this.props;

    const buttonPlain = (plain !== undefined ? plain : (icon && ! label));

    let buttonIcon;
    if (icon) buttonIcon =
      <span className={`${CLASS_ROOT}__icon`}>{icon}</span>;

    let hasIcon = buttonIcon !== undefined;
    let buttonChildren = React.Children.map(children, child => {
      if (child && child.type && child.type.icon) {
        hasIcon = true;
        child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
      }
      return child;
    });

    const classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--focus`]: this.state.focus,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--secondary`]: secondary,
        [`${CLASS_ROOT}--accent`]: accent,
        [`${CLASS_ROOT}--disabled`]: !onClick && !href,
        [`${CLASS_ROOT}--fill`]: fill,
        [`${CLASS_ROOT}--plain`]: buttonPlain,
        [`${CLASS_ROOT}--icon`]: icon || hasIcon,
        [`${CLASS_ROOT}--align-${align}`]: align
      },
      className
    );

    if (!buttonChildren) {
      buttonChildren = label;
    }

    const Tag = href ? 'a' : 'button';
    let buttonType;
    if (!href) {
      buttonType = type;
    }

    return (
      <Tag {...props} href={href} id={id} type={buttonType}
        className={classes} aria-label={a11yTitle}
        onClick={onClick}
        disabled={!onClick && !href}
        onMouseDown={(event) => {
          this.setState({ mouseActive: true });
          if (onMouseDown) {
            onMouseDown(event);
          }
        }}
        onMouseUp={(event) => {
          this.setState({ mouseActive: false });
          if (onMouseUp) {
            onMouseUp(event);
          }
        }}
        onFocus={(event) => {
          if (this.state.mouseActive === false) {
            this.setState({ focus: true });
          }
          if (onFocus) {
            onFocus(event);
          }
        }}
        onBlur={(event) => {
          this.setState({ focus: false });
          if (onBlur) {
            onBlur(event);
          }
        }}>
        {buttonIcon}
        {buttonChildren}
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
