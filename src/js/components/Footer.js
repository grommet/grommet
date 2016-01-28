// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';

const CLASS_ROOT = 'footer';

const Footer = props => {
  if (!props.size) {
    // Restore size value from deprecated props
    if (props.small) {
      props.size = 'small';
    } else if (props.large) {
      props.size = 'large';
    }
  }

  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--${props.size}`]: props.size,
      [`${CLASS_ROOT}--float`]: props.float
    }
  );

  let containerClasses = classnames(
    `${CLASS_ROOT}__container`,
    {
      [`${CLASS_ROOT}__container--float`]: props.float
    }
  );

  let footerSkipLink;
  if (props.primary) {
    footerSkipLink = <SkipLinkAnchor label="Footer" />;
  }

  return (
    <Box tag="footer" {...props} className={classes}
      containerClassName={containerClasses}>
      {footerSkipLink}
      {props.children}
    </Box>
  );
};

Footer.propTypes = {
  float: PropTypes.bool,
  large: PropTypes.bool, // Deprecated
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  primary: PropTypes.bool,
  small: PropTypes.bool, // Deprecated
  ...Box.propTypes
};

Footer.defaultProps = {
  direction: 'row',
  responsive: false
};

export default Footer;
