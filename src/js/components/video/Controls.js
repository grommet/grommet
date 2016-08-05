// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';

import Intl from '../../utils/Intl';
import Button from '../Button';
import Box from '../Box';
import Heading from '../Heading';
import VolumeIcon from '../icons/base/Volume';
import VolumeMuteIcon from '../icons/base/VolumeMute';
import PlayIcon from '../icons/base/Play';
import PauseIcon from '../icons/base/Pause';
import RefreshIcon from '../icons/base/Refresh';
import CSSClassnames from '../../utils/CSSClassnames';
import VideoTime from './Time';
import VideoFullscreenButton from './FullscreenButton';
import VideoProgressBar from './ProgressBar';

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

  render() {
    const {
      hasPlayed,
      playing,
      ended,
      currentTime,
      duration,
      percentagePlayed,
      seek,
      fullscreen
    } = this.props;

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

    let overlayContent = (
      <Box pad="none"
        className={`${CLASS_ROOT}__controls`}
        direction="column" justify="start">

        <VideoProgressBar progress={percentagePlayed}
          duration={duration} onChange={seek} />

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

            <VideoFullscreenButton onClick={fullscreen} />
          </Box>
       </Box>
      </Box>
    );

    return overlayContent;
  }
}
