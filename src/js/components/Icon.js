// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSClassnames from '../utils/CSSClassnames';
import Props from '../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  componentDidMount() {
    console.warn(
      'Base icons are not deprecated, use raw svg with Icon component'
    );
  }
  componentDidMount() {
    console.warn(
      'Base icons are not deprecated, use raw svg with Icon component'
    );
  }
  render () {
    const { className, children, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle;

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return React.cloneElement(React.Children.only(children), {
      ...restProps,
      'aria-label': a11yTitle,
      className: classes,
      version: '1.1',
      viewBox: '0 0 24 24',
      width: '24px',
      height: '24px',
      role: 'img'
    });
  }
};

Icon.defaultProps = {
  responsive: true
};

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};
