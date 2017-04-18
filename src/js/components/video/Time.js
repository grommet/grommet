// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import Heading from '../Heading';
import CSSClassnames from '../../utils/CSSClassnames';
import { formatTime } from '../../utils/FormatTime';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Time extends Component {

  render () {
    const { currentTime, duration } = this.props;

    return (
      <Box pad={{ horizontal: 'small', vertical: 'none' }}>
        <Heading tag="h3" margin="none" className={`${CLASS_ROOT}__time`}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Heading>
      </Box>
    );
  }
}

Time.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};
