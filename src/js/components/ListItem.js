// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Props from '../utils/Props';

const CLASS_ROOT = 'list-item';

export default class ListItem extends Component {
  render () {
    let classes = classnames(
      CLASS_ROOT,
      this.props.className,
      {
        [`${CLASS_ROOT}--selected`]: this.props.selected,
        [`${CLASS_ROOT}--selectable`]: this.props.onClick
      }
    );

    let children;

    if (this.props.label) {
      let image;
      if (this.props.image) {
        image = (
          <span className={`${CLASS_ROOT}__image`}>
            {this.props.image}
          </span>
        );
      }
      children = [
        image,
        <span key="label" className={`${CLASS_ROOT}__label`}>
          {this.props.label}
        </span>,
        <span key="annotation" className={`${CLASS_ROOT}__annotation`}>
          {this.props.annotation}
        </span>
      ];
    } else {
      children = this.props.children;
    }

    let boxProps = Props.pick(this.props, Object.keys(Box.propTypes));

    return (
      <Box {...boxProps} tag="li" className={classes} onClick={this.props.onClick}>
        {children}
      </Box>
    );
  }
};

ListItem.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  ...Box.propTypes,
  // deprecated properties
  annotation: PropTypes.node,
  image: PropTypes.node,
  label: PropTypes.node
};

ListItem.defaultProps = {
  align: 'center',
  direction: 'row',
  pad: {horizontal: 'medium', vertical: 'small'},
  separator: 'bottom'
};
