// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    return (
      <svg {...props} className={classes} viewBox='0 0 24 24' role='img'
        version='1.1' aria-label={a11yTitle} />
    );
  }
}

Blank.propTypes = {
  a11yTitle: PropTypes.string,
  className: PropTypes.string
};

Blank.defaultProps = {
  a11yTitle: 'Blank'
};
