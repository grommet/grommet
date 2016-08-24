// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Button from '../Button';
import Box from '../Box';
import Heading from '../Heading';
import VolumeIcon from '../icons/base/Volume';
import VolumeMuteIcon from '../icons/base/VolumeMute';
import VideoTime from './Time';
import VideoFullscreenButton from './FullscreenButton';
import VideoProgressBar from './ProgressBar';
import VideoPlayButton from './PlayButton';
import CSSClassnames from '../../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Controls extends Component {

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

  _renderMuteButton () {
    return (
      <Button plain={true} primary={true}
        onClick={this.props.toggleMute} icon={this.props.muted ?
          <VolumeMuteIcon /> : <VolumeIcon />} />
    );
  }

  render() {
    const {
      togglePlay,
      hasPlayed,
      playing,
      ended,
      currentTime,
      duration,
      percentagePlayed,
      seek,
      allowFullScreen,
      fullscreen
    } = this.props;

    if (!hasPlayed) {
      return null;
    }

    let overlayContent = (
      <Box pad="none" className={`${CLASS_ROOT}__controls`}
        direction="column" justify="start">
        <VideoProgressBar progress={percentagePlayed}
          duration={duration} onChange={seek} />
        <Box pad="none" className={`${CLASS_ROOT}__controls-primary`}
          direction="row" justify="between">
          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none'}}>
            <VideoPlayButton
              playing={playing} ended={ended}
              togglePlay={togglePlay} />
            {this._renderTitle()}
          </Box>
          <Box direction="row" align="center"
            pad={{ horizontal: 'small', vertical: 'none'}}>
            <VideoTime currentTime={currentTime} duration={duration} />
            {this._renderMuteButton()}
            {allowFullScreen ?
              <VideoFullscreenButton onClick={fullscreen} /> : undefined}
          </Box>
       </Box>
      </Box>
    );

    return overlayContent;
  }
}
