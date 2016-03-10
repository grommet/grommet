// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'list-item';

export default class ListItem extends Component {

  render () {
    const classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--selected`]: this.props.selected,
        [`${CLASS_ROOT}--selectable`]: this.props.onClick
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} tag="li" className={classes}>
        {this.props.children}
      </Box>
    );
  }

};

ListItem.propTypes = {
  selected: PropTypes.bool,
  ...Box.propTypes
};

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: {horizontal: 'medium', vertical: 'small'},
  separator: 'bottom'
};
