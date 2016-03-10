// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Props from '../utils/Props';
import Box from './Box';

const CLASS_ROOT = "tile";

export default class Tile extends Component {

  render () {
    const classes = [CLASS_ROOT];
    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));
    if (this.props.status) {
      classes.push(CLASS_ROOT + "--status-" + this.props.status.toLowerCase());
    }
    if (this.props.wide) {
      classes.push(CLASS_ROOT + "--wide");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box {...boxProps} className={classes.join(' ')}>
        {this.props.children}
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
