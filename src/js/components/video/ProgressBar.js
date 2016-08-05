// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Box from '../Box';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class ProgressBar extends Component {

  constructor () {
    super();

    this._onProgressBarChange = this._onProgressBarChange.bind(this);
  }

  // prevents unnecessarily updates/re-renders
  shouldComponentUpdate (nextProps) {
    return this.props.progress !== nextProps.progress;
  }

  _onProgressBarChange (e) {
    this.props.onChange(e.target.value * this.props.duration / 100);
  }

  render () {
    const { progress } = this.props;

    return (
      <Box pad="none" className={`${CLASS_ROOT}__progress`} direction="row">
        <div className={`${CLASS_ROOT}__progress-bar-fill`} style={{
          width: progress + '%'
        }} />
        <input className={`${CLASS_ROOT}__progress-bar-input`}
          ref="input"
          onChange={this._onProgressBarChange}
          type="range"
          min="0"
          max="100"
          value={progress || ''}
          step="0.1" />
      </Box>
    );
  }
}

ProgressBar.propTypes = {
  onClick: PropTypes.func,
  duration: PropTypes.number,
  progress: PropTypes.number
};

ProgressBar.defaultProps = {
  duration: 0,
  progress: 0
};
