// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import FormattedMessage from '../../FormattedMessage';
import CSSClassnames from '../../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.STATUS_ICON;

export default class Blank extends Component {
  render() {
    const { a11yTitle, className, ...props } = this.props;
    const classes = classnames(
      CLASS_ROOT,
      `${CLASS_ROOT}-blank`,
      className
    );
    const blankTitleId = 'blank-title';
    return (
      <svg {...props} className={classes} viewBox="0 0 24 24" role="img"
        aria-labelledby={blankTitleId} version="1.1">
        <title id={blankTitleId}>
          <FormattedMessage id={a11yTitle} defaultMessage={a11yTitle} />
        </title>
      </svg>
    );
  }
}

Blank.defaultProps = {
  a11yTitle: 'Blank'
};

Blank.propTypes = {
  a11yTitle: PropTypes.string
};
