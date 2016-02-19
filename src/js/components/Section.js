// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'section';

const Section = props => {
  var classes = classnames(CLASS_ROOT, props.className);

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} tag="section" className={classes}
      primary={props.primary}>
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
