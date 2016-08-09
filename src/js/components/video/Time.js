// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

import Box from '../Box';
import Heading from '../Heading';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Time extends Component {

  _formatTime (seconds) {
    const date = new Date(null);
    seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
    date.setSeconds(seconds);

    const dateISOString = date.toISOString();
    let time = dateISOString.substr(11, 8);
    if (seconds < 3600) {
      time = dateISOString.substr(14, 5);
    }

    return time;
  }

  render () {
    const { currentTime, duration } = this.props;

    return (
      <Box pad={{ horizontal: 'small', vertical: 'none' }}>
        <Heading tag="h3" margin="none" className={`${CLASS_ROOT}__time`}>
          {this._formatTime(currentTime)} / {this._formatTime(duration)}
        </Heading>
      </Box>
    );
  }
}

Time.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};
