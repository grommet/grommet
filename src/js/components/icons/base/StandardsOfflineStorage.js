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
      `${CLASS_ROOT}-standards-offline-storage`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'standards-offline-storage');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M24,8.44678681 L20.099286,8.44678681 C18.49983,4.60319619 14.6888813,2 10.4535872,2 C4.69228154,2 0,6.68412105 0,12.4535872 C0,18.2230534 4.69228154,22.9153349 10.4535872,22.9153349 C14.6888813,22.9153349 18.4916695,20.3202992 20.099286,16.4685481 L23.9918395,16.4685481 L23.9918395,8.44678681 L24,8.44678681 Z M20.8990139,13.3594016 L10.4535872,13.3594016 C9.95579735,13.3594016 9.54777287,12.9595376 9.54777287,12.4535872 C9.54777287,11.9557973 9.94763686,11.5477729 10.4535872,11.5477729 L20.8908535,11.5477729 L20.8908535,13.3594016 L20.8990139,13.3594016 Z M10.4535872,19.8143489 C6.39782387,19.8143489 3.10098606,16.5175111 3.10098606,12.4617477 C3.10098606,8.40598436 6.39782387,5.10914655 10.4535872,5.10914655 C12.967018,5.10914655 15.2764366,6.41482489 16.6147569,8.4549473 L10.4535872,8.4549473 C8.25025502,8.4549473 6.44678681,10.250255 6.44678681,12.4617477 C6.44678681,14.6650799 8.24209453,16.4685481 10.4535872,16.4685481 L16.6147569,16.4685481 C15.2845971,18.5086705 12.9751785,19.8143489 10.4535872,19.8143489 L10.4535872,19.8143489 Z"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'StandardsOfflineStorage';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

