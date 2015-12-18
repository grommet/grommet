// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';

const CLASS_ROOT = "sidebar";

class Sidebar extends Component {

  render () {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box {...other} className={classes.join(' ')}>
        {this.props.children}
      </Box>
    );
  }

}

Sidebar.propTypes = {
  fixed: PropTypes.bool,
  primary: PropTypes.bool, // Deprecated
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Sidebar.defaultProps = {
  direction: 'column',
  primary: false
};

module.exports = Sidebar;
