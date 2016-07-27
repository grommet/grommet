// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
// import classnames from 'classnames';

import Intl from '../utils/Intl';
import Responsive from '../utils/Responsive';
import Button from './Button';
import Box from './Box';
import ExpandIcon from './icons/base/Expand';
import VolumeIcon from './icons/base/Volume';
import VolumeMuteIcon from './icons/base/VolumeMute';
import PlayIcon from './icons/base/Play';
import PauseIcon from './icons/base/Pause';
import RefreshIcon from './icons/base/Refresh';
import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class VideoOverlay extends Component {

  constructor () {
    super();

    this._onResponsive = this._onResponsive.bind(this);
    this._onProgressBarChange = this._onProgressBarChange.bind(this);

    this.state = { iconSize: 'large' };
  }

  componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive);
  }

  componentWillUnmount () {
    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _onResponsive (small) {
    if (small) {
      this.setState({ iconSize: 'small' });
    } else {
      let iconSize = (('small' === this.props.size) ? null : 'large');
      this.setState({ iconSize: iconSize });
    }
  }

  _formatTime (seconds) {
    const date = new Date(null);
    seconds = isNaN(seconds) ? 0 : Math.floor(seconds);
    date.setSeconds(seconds);

    const dateISOString = date.toISOString();
    if (seconds < 3600) {
      return dateISOString.substr(14, 5);
    }

    return dateISOString.substr(11, 8);
  }

  _renderTime() {
    return (
      <div className={`${CLASS_ROOT}__time`}>
        {this._formatTime(this.props.currentTime)} / {this._formatTime(this.props.duration)}
      </div>
    );
  }

  _onProgressBarChange(e) {
    this.props.seek(e.target.value * this.props.duration / 100);
  }

  _renderProgressBar() {
    const { percentagePlayed } = this.props;

    return (
      <Box pad="none" className={`${CLASS_ROOT}__progress`} direction="row">
        <div className={`${CLASS_ROOT}__progress-bar-fill`} style={{
          width: percentagePlayed + '%'
        }} />
        <input className={`${CLASS_ROOT}__progress-bar-input`}
          ref="input"
          onChange={this._onProgressBarChange}
          type="range"
          min="0"
          max="100"
          value={percentagePlayed || ''}
          step="0.1" />
      </Box>
    );
  }

  _renderTitle () {
    let title;
    if (this.props.title) {
      title = (
        <span>
          {this.props.title}
        </span>
      );
    }

    return title;
  }

  render() {
    const { playing, ended } = this.props;

    let controlIconSize = this.state.iconSize;
    let controlIcon = (playing ?
      <PauseIcon size={controlIconSize} /> : (ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));

    let a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ?
        'Restart Video' :
          'Play Video'));

    let a11yControlButtonTitle = Intl.getMessage(this.context.intl, a11yControlButtonMessage);
    let a11yExpandButtonTitle = Intl.getMessage(this.context.intl, 'Toggle Fullscreen');

    let overlayContent = (
      <Box pad="none"
        className={`${CLASS_ROOT}__controls`}
        direction="column" justify="start">

        {this._renderProgressBar()}

        <Box pad="none"
          className={`${CLASS_ROOT}__controls-primary`} direction="row"
          justify="between">
          <div>
            <Button plain={true} onClick={this.props.togglePlay}
              icon={controlIcon} a11yTitle={a11yControlButtonTitle} />

            {this._renderTitle()}
          </div>

          <div>
            {this._renderTime()}

            <Button plain={true} onClick={this.props.toggleMute}
              icon={this.props.muted ? <VolumeMuteIcon /> : <VolumeIcon />} />

            <Button plain={true} onClick={this.props.fullscreen}
              icon={<ExpandIcon />} a11yTitle={a11yExpandButtonTitle} />
          </div>
       </Box>
      </Box>
    );

    return overlayContent;
  }
}
