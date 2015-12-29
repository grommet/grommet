// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "list-item";

export default class ListItem extends Component {

  componentDidMount () {
    console.warn('ListItem is deprecated and will be removed in an upcoming version');
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--selectable");
    }
    if (this.props.selected) {
      classes.push(CLASS_ROOT + "--selected");
    }
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "--" + this.props.direction);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var image;
    if (this.props.image) {
      image = (
        <span className={CLASS_ROOT + "__image"}>
          {this.props.image}
        </span>
      );
    }

    return (
      <li className={classes.join(' ')} onClick={this.props.onClick}>
        {image}
        <span className={CLASS_ROOT + "__label"}>{this.props.label}</span>
        <span className={CLASS_ROOT + "__annotation"}>{this.props.annotation}</span>
      </li>
    );
  }

}

ListItem.propTypes = {
  annotation: PropTypes.node,
  direction: PropTypes.oneOf(['row', 'column']),
  image: PropTypes.node,
  label: PropTypes.node,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};
