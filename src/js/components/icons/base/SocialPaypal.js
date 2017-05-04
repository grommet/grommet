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
      `${CLASS_ROOT}-social-paypal`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-paypal');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#003087" fillRule="evenodd" d="M21.4945038,7.054125 C20.4250038,12.026625 17.0155038,14.658375 11.6050038,14.658375 L9.64300376,14.658375 L8.17975376,24.000375 L11.3620038,24.000375 C11.8217538,24.000375 12.2125038,23.665875 12.2845038,23.212125 L12.3220038,23.014125 L13.0540038,18.377625 L13.1012538,18.121875 C13.1725038,17.668125 13.5640038,17.333625 14.0230038,17.333625 L14.6042538,17.333625 C18.3640038,17.333625 21.3085038,15.805875 22.1687538,11.388375 C22.5137538,9.615375 22.3480038,8.128875 21.4945038,7.054125 M19.3172538,1.80975 C18.2057538,0.543 16.1972538,0 13.6270038,0 L6.16900376,0 C5.64325376,0 5.19625376,0.3825 5.11375376,0.90075 L2.00800376,20.59725 C1.94650376,20.98575 2.24725376,21.3375 2.64100376,21.3375 L7.24525376,21.3375 L8.40175376,14.0025 L8.36575376,14.232 C8.44825376,13.71375 8.89225376,13.33125 9.41725376,13.33125 L11.6050038,13.33125 C15.9040038,13.33125 19.2692538,11.58525 20.2525038,6.53475 C20.2817538,6.38475 20.3290038,6.0975 20.3290038,6.0975 C20.6080038,4.2285 20.3267538,2.96025 19.3172538,1.80975" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialPaypal';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

