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
      `${CLASS_ROOT}-social-mastercard`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-mastercard');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#FF5F00" fillRule="evenodd" d="M9.17131814,12.4194933 C9.17131814,10.0493774 10.2842421,7.94718763 11.9948475,6.58694718 C10.7376556,5.59768141 9.15070843,5 7.41949332,5 C3.31816229,5 0,8.31816229 0,12.4194933 C0,16.5208244 3.31816229,19.8389866 7.41949332,19.8389866 C9.15070843,19.8389866 10.7376556,19.2413052 11.9948475,18.2520395 C10.2842421,16.9124087 9.17131814,14.7896092 9.17131814,12.4194933 L9.17131814,12.4194933 Z M24,12.4194933 C24,16.5208244 20.6818377,19.8389866 16.5805067,19.8389866 C14.8492916,19.8389866 13.2623444,19.2413052 12.0051525,18.2520395 C13.7363676,16.891799 14.8286819,14.7896092 14.8286819,12.4194933 C14.8286819,10.0493774 13.7157579,7.94718763 12.0051525,6.58694718 C13.2623444,5.59768141 14.8492916,5 16.5805067,5 C20.6818377,5 24,8.338772 24,12.4194933 L24,12.4194933 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialMastercard';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

