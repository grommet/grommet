// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'tile';

const Tile = props => {
  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--status-${props.status}`]: props.status,
      [`${CLASS_ROOT}--wide}`]: props.wide,
      [`${CLASS_ROOT}--selectable}`]: props.onClick,
      [`${CLASS_ROOT}--selected}`]: props.selected
    }
  );

  let boxProps = Props.pick(props, Box);

  return (
    <Box {...boxProps} className={classes} onClick={props.onClick}>
      {props.children}
    </Box>
  );
};

Tile.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  status: PropTypes.string, // deprecated, will be removed
  wide: PropTypes.bool,
  ...Box.propTypes
};

Tile.defaultProps = {
  align: 'center'
};

Tile.displayName = 'Tile';

export default Tile;
