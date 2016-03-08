// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import classnames from 'classnames';
import Box from './Box';

const CLASS_ROOT = 'tags';

const Tags = props => {
  let classes = classnames(CLASS_ROOT, props.className);

  return (
    <Box {...props}
      className={classes}
      direction={props.direction}
      align={props.align}
      wrap={true}>
      {props.children}
    </Box>
  );
};

Tags.propTypes = Box.propTypes;

Tags.defaultProps = {
  direction: 'row',
  align: 'start'
};

Tags.displayName = 'Tags';

export default Tags;
