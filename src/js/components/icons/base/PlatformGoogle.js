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
      `${CLASS_ROOT}-platform-google`,
      className,
      {
        [`${CLASS_ROOT}--${size}`]: size,
        [`${CLASS_ROOT}--responsive`]: responsive,
        [`${COLOR_INDEX}-${colorIndex}`]: colorIndex
      }
    );

    a11yTitle = a11yTitle || Intl.getMessage(intl, 'platform-google');

    const restProps = Props.omit(this.props, Object.keys(Icon.propTypes));
    return <svg {...restProps} version="1.1" viewBox="0 0 24 24" width="24px" height="24px" role="img" className={classes} aria-label={a11yTitle}><path fillRule="evenodd" d="M0.0320526775,11.3995579 C0.135923164,5.21758766 5.84921048,-0.196179793 12.0637858,0.0100628571 C15.0415433,-0.127568377 17.8407092,1.16134608 20.1213438,2.97178899 C19.1479172,4.07202205 18.140004,5.13182339 17.0631175,6.12301332 C14.3214293,4.23824138 10.4223858,3.69956008 7.68069759,5.87674734 C3.75866298,8.57505464 3.58007143,14.9461147 7.35266392,17.8506647 C11.0213859,21.1623907 17.9556646,19.5181671 18.9693256,14.4474567 C16.6714477,14.413151 14.3674115,14.4474567 12.0695336,14.3731277 C12.0637858,13.0094758 12.058038,11.6458239 12.0637858,10.2825804 C15.9053516,10.2711452 19.7469173,10.2650192 23.5942309,10.2940157 C23.8245524,13.5024162 23.398396,16.9170593 21.4170562,19.5696257 C18.4163077,23.7692161 12.39223,24.9952368 7.69219314,23.1962291 C2.9753235,21.4086567 -0.365364836,16.4527071 0.0320526775,11.3995579"/></svg>;
  }
};

Icon.contextTypes = {
  intl: PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformGoogle';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: PropTypes.string,
  colorIndex: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: PropTypes.bool
};

