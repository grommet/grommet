// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';

const CLASS_ROOT = "tile";

class Tile extends Component {

  render () {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
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
      <Box className={classes.join(' ')} {...other} onClick={this.props.onClick}>
        {this.props.children}
      </Box>
    );
  }

}

Tile.propTypes = {
  selected: PropTypes.bool,
  status: PropTypes.string,
  wide: PropTypes.bool,
  ...Box.propTypes
};

Tile.defaultProps = {
  pad: 'none',
  direction: 'column',
  align: 'center'
};

module.exports = Tile;
