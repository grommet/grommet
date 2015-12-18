// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';
import SkipLinkAnchor from './SkipLinkAnchor';

const CLASS_ROOT = "section";

class Section extends Component {

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var skipLinkAnchor = null;
    if (this.props.primary) {
      skipLinkAnchor = <SkipLinkAnchor label="Main Content" />;
    }

    return (
      <Box tag="section" {...this.props} className={classes.join(' ')}>
        {skipLinkAnchor}
        {this.props.children}
      </Box>
    );
  }

}

Section.propTypes = {
  primary: PropTypes.bool,
  ...Box.propTypes
};

Section.defaultProps = {
  pad: {vertical: 'medium'}
};

module.exports = Section;
