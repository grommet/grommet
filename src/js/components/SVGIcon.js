// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Intl from '../utils/Intl';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

const CLASS_ROOT = {
  'control': CSSClassnames.CONTROL_ICON,
  'logo': CSSClassnames.LOGO_ICON,
  'status': CSSClassnames.STATUS_ICON
};

export default class SVGIcon extends Component {
  render () {
    const {
      a11yTitle, children, className, colorIndex, size, type
    } = this.props;

    const classRoot = CLASS_ROOT[type];
    const classes = classnames(
      classRoot,
      className,
      {
        [`${classRoot}--${size}`]: size,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    const iconMessage = Intl.getMessage(this.context.intl, 'icon');
    const typeMessage = Intl.getMessage(this.context.intl, type);
    let defaultTitle = `${typeMessage} ${iconMessage}`;

    const svgProps = Props.omit(this.props, Object.keys(SVGIcon.propTypes));
    delete svgProps.children;
    delete svgProps.className;

    return (
      <svg {...svgProps} className={classes} role='img'>
        <title>
          {a11yTitle || defaultTitle}
        </title>
        {children}
      </svg>
    );
  }
};

SVGIcon.contextTypes = {
  intl: PropTypes.object
};

SVGIcon.defaultProps = {
  type: 'control'
};

SVGIcon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  type: PropTypes.oneOf(['control', 'logo', 'status'])
};
