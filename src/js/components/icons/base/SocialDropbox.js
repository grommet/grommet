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
      `${CLASS_ROOT}-social-dropbox`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-dropbox');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#007EE5" fillRule="evenodd" d="M7.0599,1 L0.00015,5.6095 L4.8819,9.5185 L12.00015,5.1235 L7.0599,1 Z M0,13.4281 L7.05975,18.0376 L12,13.9141 L4.88175,9.5191 L0,13.4281 Z M11.99985,13.914175 L16.9401,18.037675 L23.99985,13.428175 L19.1181,9.518425 L11.99985,13.914175 Z M24,5.609575 L16.94025,1.000075 L12,5.123575 L19.11825,9.518575 L24,5.609575 Z M12.014475,14.801275 L7.059975,18.912775 L4.939725,17.528275 L4.939725,19.080025 L12.014475,23.322775 L19.089225,19.080025 L19.089225,17.528275 L16.968975,18.912775 L12.014475,14.801275 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialDropbox';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

