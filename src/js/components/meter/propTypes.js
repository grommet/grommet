// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import { PropTypes } from 'react';

export default {
  activeIndex: PropTypes.number,
  a11yDesc: PropTypes.string,
  a11yDescId: PropTypes.string,
  max: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  min: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  onActivate: PropTypes.func.isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func
  })).isRequired,
  stacked: PropTypes.bool,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })).isRequired,
  total: PropTypes.number.isRequired,
  units: PropTypes.string,
  vertical: PropTypes.bool
};
