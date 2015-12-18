// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';

const CLASS_ROOT = "carousel-controls";

class CarouselControls extends Component {

  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick (index) {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "--" + this.props.direction);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var controls = [];
    for (var index=1; index<=this.props.count; index++) {
      var controlClasses = [CLASS_ROOT + "__control"];
      if (index === this.props.selected) {
        controlClasses.push(CLASS_ROOT + "__control--active");
      }
      controls.push(
        <svg key={index} className={controlClasses.join(' ')} version="1.1"
          viewBox="0 0 24 24" width="24px" height="24px"
          onClick={this._onClick.bind(this, index)}>
          <circle cx={12} cy={12} r={6}></circle>
        </svg>
      );
    }

    return (
      <Box className={classes.join(' ')} direction={this.props.direction}
        justify="center" responsive={false}>
        {controls}
      </Box>
    );
  }

}

CarouselControls.propTypes = {
  count: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['row', 'column']),
  onChange: PropTypes.func,
  selected: PropTypes.number
};

module.exports = CarouselControls;
