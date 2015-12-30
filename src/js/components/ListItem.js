// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';

const CLASS_ROOT = "list-item";

export default class ListItem extends Component {

  render () {
    let classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    let children;
    if (this.props.label) {
      let image;
      if (this.props.image) {
        image = (
          <span className={CLASS_ROOT + "__image"}>
            {this.props.image}
          </span>
        );
      }
      children = [
        image,
        <span key="label" className={CLASS_ROOT + "__label"}>
          {this.props.label}
        </span>,
        <span key="annotation" className={CLASS_ROOT + "__annotation"}>
          {this.props.annotation}
        </span>
      ];
    } else {
      children = this.props.children;
    }

    return (
      <Box tag="li" className={classes.join(' ')} {...other}
        onClick={this.props.onClick}>
        {children}
      </Box>
    );
  }
}

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
  direction: 'row'
};
