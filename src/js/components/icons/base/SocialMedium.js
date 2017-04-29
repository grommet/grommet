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
      `${CLASS_ROOT}-social-medium`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'social-medium');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fill="#02B875" fillRule="evenodd" d="M22.929673,5.55010476 C22.9252776,5.5466 22.9217612,5.542 22.9162669,5.53937143 L22.9083552,5.53542857 L15.9701588,2.0777619 C15.9233474,2.05432381 15.8741185,2.03855238 15.8242303,2.02584762 C15.7615954,2.00985714 15.6976418,2 15.6334684,2 C15.3677643,2 15.1033788,2.1329619 14.9600875,2.36471429 L10.9657347,8.83450476 L15.9785101,16.9532857 L22.9509909,5.66050476 C22.9740669,5.62282857 22.9630783,5.57639048 22.929673,5.55010476 M8.76559902,7.36075238 L8.76559902,14.7253524 L15.3332601,17.9983619 L8.76559902,7.36075238 M16.3200355,18.4901238 L21.7262025,21.1841905 C22.4296921,21.5348857 23,21.2893333 23,20.6361333 L23,7.67092381 L16.3200355,18.4901238 M7.62542282,5.56061905 L0.849198311,2.1835619 C0.726785407,2.12266667 0.610306343,2.09375238 0.504815869,2.09375238 C0.208123913,2.09375238 0,2.32265714 0,2.70664762 L0,17.2886476 C0,17.6789905 0.286582453,18.141181 0.636898733,18.3157619 L6.60524204,21.2899905 C6.75820322,21.366219 6.90391194,21.4023619 7.03555526,21.4023619 C7.40653009,21.4023619 7.66673992,21.1162857 7.66673992,20.6361333 L7.66673992,5.62699048 C7.66673992,5.59895238 7.65069658,5.57310476 7.62542282,5.56061905" stroke="none"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialMedium';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

