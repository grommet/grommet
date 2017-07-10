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
      `${CLASS_ROOT}-social-tumblr`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-tumblr');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#35465C" fillRule="evenodd" d="M17.6389798,19.1699694 C17.1927306,19.3822191 16.3392319,19.5682188 15.7024829,19.5847188 C13.781736,19.6357187 13.4089866,18.2354709 13.3924866,17.2184725 L13.3924866,9.74773446 L18.2119789,9.74773446 L18.2119789,6.11399025 L13.4104866,6.11399025 L13.4104866,0 L9.8944922,0 C9.83674229,0 9.73624245,0.0509999187 9.72199247,0.179999713 C9.5164928,2.05124673 8.6404942,5.33474149 5,6.6472394 L5,9.74773446 L7.42849613,9.74773446 L7.42849613,17.588972 C7.42849613,20.2739677 9.40924297,24.0877116 14.6374846,23.9984617 C16.4014818,23.9677118 18.3597287,23.229713 18.793228,22.592964 L17.6389798,19.1699694 Z" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialTumblr';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

