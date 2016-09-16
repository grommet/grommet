// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import classnames from 'classnames';

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
import FormatTime from '../../utils/FormatTime';

const CLASS_ROOT = CSSClassnames.VIDEO;

export default class Controls extends Component {

  constructor () {
    super();

    this._onChapterTickHover = this._onChapterTickHover.bind(this);

    this.state = {
      activeChapterIndex: null
    };
  }

  _onChapterTickHover (index) {
    this.setState({activeChapterIndex: index});
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

  _renderMuteButton () {
    return (
      <Button plain={true} primary={true}
        onClick={this.props.toggleMute} icon={this.props.muted ?
          <VolumeMuteIcon /> : <VolumeIcon />} />
    );
  }

  _renderChapterLabels () {
    const { timeline } = this.props;
    const { activeChapterIndex } = this.state;

    if (timeline) {
      let chapterLabels = timeline.map((chapter, index, chapters) => {
        let percent = (chapter.time / this.props.duration) * 100;
        let classes = classnames(
          `${CLASS_ROOT}__chapter-label`,
          {
            [`${CLASS_ROOT}__chapter-label-start`]: percent === 0,
            [`${CLASS_ROOT}__chapter-label-active`]: 
              activeChapterIndex === index
          }
        );

        return (
          <div className={classes} key={chapter.label}
            style={{left: percent + '%'}}>
            <span>{chapter.label}</span>
            <span>{FormatTime(chapter.time)}</span>
          </div>
        );
      });

      return (
        <Box pad="none" className={`${CLASS_ROOT}__chapter-labels`}
          direction="row">
          {chapterLabels}
        </Box>
      );
    }
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
      timeline,
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
          onChapterHover={this._onChapterTickHover}
          duration={duration} onChange={seek} timeline={timeline} />
        {timeline ? this._renderChapterLabels(): null}
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
              <VideoFullscreenButton onClick={fullscreen} /> : null}
          </Box>
       </Box>
      </Box>
    );

    return overlayContent;
  }
}
