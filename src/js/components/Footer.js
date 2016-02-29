// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';
import Props from '../utils/Props';

const CLASS_ROOT = 'footer';

export default class Footer extends Component {

  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--${this.props.size}`]: this.props.size,
        [`${CLASS_ROOT}--float`]: this.props.float
      }
    );

    let containerClasses = classnames(
      `${CLASS_ROOT}__container`,
      {
        [`${CLASS_ROOT}__container--float`]: this.props.float
      }
    );

    let footerSkipLink;
    if (this.props.primary) {
      footerSkipLink = <SkipLinkAnchor label="Footer" />;
    }

    let boxProps = Props.pick(this.props, Box);

    return (
      <Box {...boxProps} tag="footer" className={classes}
        containerClassName={containerClasses}
        primary={false}>
        {footerSkipLink}
        {this.props.children}
      </Box>
    );
  }
};

Footer.propTypes = {
  float: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  primary: PropTypes.bool,
  ...Box.propTypes
};

Footer.defaultProps = {
  direction: 'row',
  responsive: false
};
