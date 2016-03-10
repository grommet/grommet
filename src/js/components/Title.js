// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from './Box';
import Intl from '../utils/Intl';

const CLASS_ROOT = "title";

export default class Title extends Component {

  render () {
    const classes = [CLASS_ROOT];
    if (this.props.responsive) {
      classes.push(CLASS_ROOT + "--responsive");
    }
    if (this.props.onClick) {
      classes.push(CLASS_ROOT + "--interactive");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    const a11yTitle = this.props.a11yTitle ||
      Intl.getMessage(this.context.intl, 'Title');

    return (
      <Box align="center" direction="row" responsive={false}
        className={classes.join(' ')} a11yTitle={a11yTitle}
        onClick={this.props.onClick}>
        {this.props.children}
      </Box>
    );
  }

}

Title.propTypes = {
  a11yTitle: PropTypes.string,
  onClick: PropTypes.func,
  responsive: PropTypes.bool
};

Title.contextTypes = {
  intl: PropTypes.object
};

Title.defaultProps = {
  responsive: true
};
