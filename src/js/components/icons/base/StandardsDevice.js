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
      `${CLASS_ROOT}-standards-device`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'standards-device');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M17.4191981,5.86998785 L22.2891859,1 L17.0692588,1 L12.0145808,6.05467801 L6.95018226,1 L1.73025516,1 L6.60024301,5.86998785 L0,5.86998785 L0,23.6488457 L3.47023086,23.6488457 L7.23207776,23.6488457 L8.68043742,23.6488457 L11.9951397,20.3341434 L15.309842,23.6488457 L17.2345079,23.6488457 L20.5297691,23.6488457 L24,23.6488457 L24,5.86998785 L17.4191981,5.86998785 L17.4191981,5.86998785 Z M12.0048603,15.1044957 L7.16403402,19.9550425 L3.69380316,19.9550425 L3.69380316,9.56379101 L20.3256379,9.56379101 L20.3256379,19.9550425 L16.855407,19.9550425 L12.0048603,15.1044957 L12.0048603,15.1044957 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'StandardsDevice';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

