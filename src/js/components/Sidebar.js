// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'sidebar';

const Sidebar = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--primary`]: props.primary,
      [`${CLASS_ROOT}--fixed`]: props.fixed,
      [`${CLASS_ROOT}--${props.size}`]: props.size
    }
  );

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} className={classes} primary={false}>
      {props.children}
    </Box>
  );
};

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  primary: PropTypes.bool, // Deprecated
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Sidebar.defaultProps = {
  direction: 'column',
  primary: false
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
