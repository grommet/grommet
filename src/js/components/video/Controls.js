// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
// import classnames from 'classnames';

import Intl from '../../utils/Intl';
import Button from '../Button';
import Box from '../Box';
import Heading from '../Heading';
import ExpandIcon from '../icons/base/Expand';
import VolumeIcon from '../icons/base/Volume';
import VolumeMuteIcon from '../icons/base/VolumeMute';
import PlayIcon from '../icons/base/Play';
import PauseIcon from '../icons/base/Pause';
import RefreshIcon from '../icons/base/Refresh';
import CSSClassnames from '../../utils/CSSClassnames';
import VideoTime from './Time';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Controls extends Component {

  constructor () {
    super();

    this._onProgressBarChange = this._onProgressBarChange.bind(this);
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
        <Box pad={{ horizontal: 'small', vertical: 'none' }}>
          <Heading tag="h3" margin="none">{this.props.title}</Heading>
        </Box>
      );
    }

    return title;
  }

  render() {
    const { hasPlayed, playing, ended, currentTime, duration } = this.props;

    if (!hasPlayed) {
      return null;
    }

    let controlIcon = (playing ?
      <PauseIcon /> : (ended ?
        <RefreshIcon /> :
          <PlayIcon />));

    let a11yControlButtonMessage = (playing ?
      'Pause Video' : (ended ?
        'Restart Video' :
          'Play Video'));

    let a11yControlButtonTitle =
      Intl.getMessage(this.context.intl, a11yControlButtonMessage);
    let a11yExpandButtonTitle =
      Intl.getMessage(this.context.intl, 'Toggle Fullscreen');

    let overlayContent = (
      <Box pad="none"
        className={`${CLASS_ROOT}__controls`}
        direction="column" justify="start">

        {this._renderProgressBar()}

        <Box pad="none" className={`${CLASS_ROOT}__controls-primary`}
          direction="row" justify="between">
          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none'}}>
            <Button plain={true} primary={true} onClick={this.props.togglePlay}
              icon={controlIcon} a11yTitle={a11yControlButtonTitle} />

            {this._renderTitle()}
          </Box>

          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none'}}>
            <VideoTime currentTime={currentTime} duration={duration} />

            <Button plain={true} primary={true}
              onClick={this.props.toggleMute} icon={this.props.muted ?
                <VolumeMuteIcon /> : <VolumeIcon />} />

            <Button plain={true} primary={true}
              onClick={this.props.fullscreen} icon={<ExpandIcon />}
              a11yTitle={a11yExpandButtonTitle} />
          </Box>
       </Box>
      </Box>
    );

    return overlayContent;
  }
}
