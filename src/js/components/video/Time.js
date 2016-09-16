// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

import Box from '../Box';
import Heading from '../Heading';
import CSSClassnames from '../../utils/CSSClassnames';
import FormatTime from '../../utils/FormatTime';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Time extends Component {

  render () {
    const { currentTime, duration } = this.props;

    return (
      <Box pad={{ horizontal: 'small', vertical: 'none' }}>
        <Heading tag="h3" margin="none" className={`${CLASS_ROOT}__time`}>
          {FormatTime(currentTime)} / {FormatTime(duration)}
        </Heading>
      </Box>
    );
  }
}

Time.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number
};
