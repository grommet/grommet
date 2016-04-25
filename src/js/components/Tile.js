// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Props from '../utils/Props';
import Box from './Box';

const CLASS_ROOT = "tile";

export default class Tile extends Component {

  render () {
    const { children, className, onClick, wide, status, selected } = this.props;

    if (selected) {
      console.log('Selected option has been deprecated, please use selected option at the Tiles level.');
    }

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--status-${this.props.status.toLowerCase()}`]: status,
        [`${CLASS_ROOT}--wide`]: wide,
        [`${CLASS_ROOT}--selectable`]: onClick,
        [`${CLASS_ROOT}--selected`]: selected
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} className={classes.join(' ')}>
        {children}
      </Box>
    );
  }

}

Tile.propTypes = {
  selected: PropTypes.bool,
  wide: PropTypes.bool,
  ...Box.propTypes
};

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center'
};
