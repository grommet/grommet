// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.LIST_ITEM;

export default class ListItem extends Component {

  render () {
    const { children, className, onClick, selected } = this.props;

    if (selected) {
      console.warn('Selected option has been deprecated, please use selected ' +
        'option at the List level.');
    }

    const classes = classnames(
      CLASS_ROOT,
      className,
      {
        [`${CLASS_ROOT}--selected`]: selected,
        [`${CLASS_ROOT}--selectable`]: onClick
      }
    );

    const boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} tag="li" className={classes}>
        {children}
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
  separator: 'bottom',
  role: 'listitem'
};
