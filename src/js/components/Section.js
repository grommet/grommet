// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';
import Props from '../utils/Props';

const CLASS_ROOT = 'section';

const Section = props => {
  var classes = classnames(CLASS_ROOT, props.className);

  let skipLinkAnchor;
  if (props.primary) {
    skipLinkAnchor = <SkipLinkAnchor label="Main Content" />;
  }

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} tag="section" className={classes}>
      {skipLinkAnchor}
      {props.children}
    </Box>
  );
};

Section.propTypes = {
  primary: PropTypes.bool,
  ...Box.propTypes
};

Section.defaultProps = {
  pad: {vertical: 'medium'}
};

Section.displayName = 'Section';

export default Section;
