// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CSSClassnames from '../../../utils/CSSClassnames';
import Intl from '../../../utils/Intl';
import Props from '../../../utils/Props';

const CLASS_ROOT = CSSClassnames.CONTROL_ICON;
const COLOR_INDEX = CSSClassnames.COLOR_INDEX;

export default class Icon extends Component {
  render () {
    const { className, colorIndex } = this.props;
    let { a11yTitle, size, responsive } = this.props;
    let { intl } = this.context;

    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-platform-pied-piper`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'platform-pied-piper');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M0,19.4210526 C2.2736843,19.4210526 4.04210525,18.6631579 4.04210525,18.6631579 C4.04210525,18.6631579 7.0736842,11.0842105 11.368421,11.0842105 C14.6526316,11.0842105 15.1578947,13.6105264 15.1578947,13.6105264 C15.1578947,13.6105264 19.9578947,4.26315788 24,3 C20.2105263,6.03157895 20.7157895,9.31578948 18.9473684,10.831579 C17.1789474,12.3473684 17.1789477,10.8381579 15.1578951,14.375 C10.6105267,14.8802632 9.125,16.3894739 6.06315789,18.1578947 C11.3684206,15.6315794 12.3789474,15.3789474 17.1789474,15.631579 C17.6828892,15.6581022 17.9368421,15.8842105 17.6842105,16.3894737 C16.951256,17.8553827 16.4037001,20.0617486 15.4105263,19.9263158 C9.85263157,19.1684211 6.56842104,20.431579 3.78947367,20.431579 C1.0105263,20.431579 0,19.9263158 0,19.4210526 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformPiedPiper';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

