// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import Box from './Box';
import ExpandIcon from './icons/base/Expand';
import PlayIcon from './icons/base/Play';
import PauseIcon from './icons/base/Pause';
import RefreshIcon from './icons/base/Refresh';

const CLASS_ROOT = "video";

export default class Video extends Component {

  constructor () {
    super();

    this._onPlaying = this._onPlaying.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onClickControl = this._onClickControl.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onClickChapter = this._onClickChapter.bind(this);
    this._onFullScreen = this._onFullScreen.bind(this);

    this.state = { playing: false, progress: 0 };
  }

  componentDidMount () {
    var video = this.refs.video;
    video.addEventListener('playing', this._onPlaying);
    video.addEventListener('pause', this._onPause);
    video.addEventListener('ended', this._onEnded);
  }

  componentWillUnmount () {
    var video = this.refs.video;
    video.removeEventListener('playing', this._onPlaying);
    video.removeEventListener('pause', this._onPause);
    video.removeEventListener('ended', this._onEnded);
  }

  _onPlaying () {
    var video = this.refs.video;
    this._progressTimer = setInterval(function () {
      this.setState({progress: this.state.progress + 0.5});
    }.bind(this), 500);
    this.setState({ playing: true, progress: video.currentTime, ended: null });
  }

  _onPause () {
    clearInterval(this._progressTimer);
    this._progressTimer = null;
    this.setState({ playing: false });
  }

  _onEnded () {
    clearInterval(this._progressTimer);
    this._progressTimer = null;
    this.setState({ playing: false, ended: true });
  }

  _onClickControl () {
    var video = this.refs.video;
    if (this.state.playing) {
      video.pause();
    } else {
      video.play();
    }
  }

  _onMouseMove () {
    this.setState({interacting: true});
    clearTimeout(this._moveTimer);
    this._moveTimer = setTimeout(function () {
      this.setState({interacting: false});
    }.bind(this), 1000);
  }

  _onClickChapter (time) {
    this.refs.video.currentTime = time;
    this.setState({progress: time});
  }

  _onFullScreen () {
    var video = this.refs.video;

    // check if webkit and mozilla fullscreen is available
    if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else {
      console.warn('Your browser doesn\'t support fullscreen.');
    }
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(`${CLASS_ROOT}--${this.props.size}`);
    }
    if (this.props.full) {
      classes.push(`${CLASS_ROOT}--full`);
    }
    if (this.state.playing) {
      classes.push(`${CLASS_ROOT}--playing`);
    }
    if (this.state.interacting) {
      classes.push(`${CLASS_ROOT}--interacting`);
    }
    if (this.props.videoHeader) {
      classes.push(`${CLASS_ROOT}--video-header`);
    }
    if (this.props.colorIndex) {
      classes.push(`background-color-index-${this.props.colorIndex}`);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var controlIconSize = ('small' === this.props.size ? null : 'large');
    var controlIcon = (this.state.playing ?
      <PauseIcon size={controlIconSize} /> : (this.state.ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));

    var fullScreenButton;
    if (this.props.allowFullScreen) {
      fullScreenButton = (
        <Button plain={true} onClick={this._onFullScreen}>
          <ExpandIcon />
        </Button>
      );
    }

    var videoHeader;
    if (this.props.videoHeader) {
      videoHeader = this.props.videoHeader;
      if (fullScreenButton) {
        let videoHeaderChildren = videoHeader.props.children;
        let iconBox = (
          <Box direction="row" responsive={false}>
            {fullScreenButton}
            {videoHeaderChildren[0, videoHeaderChildren.length - 1]}
          </Box>
        );
        videoHeaderChildren.splice(-1, 1, iconBox);
      }
    } else if (fullScreenButton) {
      // fallback to only displaying full screen icon in header
      // if allowing fullscreen
      videoHeader = (
        <Box align="end" full="horizontal">
          {fullScreenButton}
        </Box>
      );
    }

    var title;
    if (this.props.title) {
      classes.push(`${CLASS_ROOT}--titled`);
      title = (
        <Box align="center" justify="center" className={`${CLASS_ROOT}__title`}>
          {this.props.title}
        </Box>
      );
    }

    var timeline;
    if (this.props.timeline && this.props.duration) {

      var chapters = this.props.timeline.map(function (chapter, index, chapters) {
        var percent = Math.round((chapter.time / this.props.duration) * 100);
        var seconds = (chapter.time % 60);
        var time = Math.floor(chapter.time / 60) + ':' +
          (seconds < 10 ? '0' + seconds : seconds);
        var currentProgress = this.state.progress;
        var previousChapter = chapters[Math.max(0, index - 1)];
        var nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];
        var timelineClass = `${CLASS_ROOT}__timeline-chapter`;
        if (currentProgress !== 0) {
          if (currentProgress >= chapter.time && currentProgress < nextChapter.time) {
            timelineClass = `${CLASS_ROOT}__timeline-chapter-current`;
          }
        }

        return (
          <div key={chapter.time} className={timelineClass}
            style={{left: percent.toString() + '%'}}
            onClick={this._onClickChapter.bind(this, chapter.time)}>
            <label>{chapter.label}</label>
            <time>{time}</time>
          </div>
        );
      }, this);

      timeline = (
        <div className={`${CLASS_ROOT}__timeline`}>
          {chapters}
        </div>
      );
    }

    var progress;
    if (this.props.duration) {
      var percent = Math.round((this.state.progress / this.props.duration) * 100);
      progress = (
        <div className={`${CLASS_ROOT}__progress`}>
          <div className={`${CLASS_ROOT}__progress-meter`}
            style={{width: percent.toString() + '%'}}></div>
        </div>
      );
    }

    var onClickControl = this._onClickControl;
    if (this.props.onClick) {
      onClickControl = this.props.onClick;
    }

    return (
      <div className={classes.join(' ')} onMouseMove={this._onMouseMove}>
        <video ref="video" poster={this.props.poster}>
          {this.props.children}
        </video>
        <Box pad="none" align="center" justify="between" className={`${CLASS_ROOT}__summary`}>
          {videoHeader}
          <Box pad="large" align="center" justify="center">
            <Button className={`${CLASS_ROOT}__control`} plain={true}
              primary={true}
              onClick={onClickControl}>
              {controlIcon}
            </Button>
            {title}
          </Box>
          <Box pad="medium">
          </Box>
        </Box>
        {timeline}
        {progress}
      </div>
    );
  }
}

Video.propTypes = {
  colorIndex: PropTypes.string,
  duration: PropTypes.number,
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    time: PropTypes.number
  })),
  title: PropTypes.node,
  videoHeader: PropTypes.node,
  onClick: PropTypes.func,
  allowFullScreen: PropTypes.bool
};
