// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Intl from '../utils/Intl';
import Responsive from '../utils/Responsive';
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

    this._onResponsive = this._onResponsive.bind(this);
    this._onPlaying = this._onPlaying.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onClickControl = this._onClickControl.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onClickChapter = this._onClickChapter.bind(this);
    this._onFullScreen = this._onFullScreen.bind(this);

    this.state = { playing: false, progress: 0, iconSize: 'large' };
  }

  componentDidMount () {
    this._responsive = Responsive.start(this._onResponsive);
    let video = this.refs.video;
    video.addEventListener('playing', this._onPlaying);
    video.addEventListener('pause', this._onPause);
    video.addEventListener('ended', this._onEnded);
  }

  componentWillReceiveProps (nextProps) {
    // Dynamically modifying a source element and its attribute when
    // the element is already inserted in a video or audio element will
    // have no effect.
    // From HTML Specs: https://html.spec.whatwg.org/multipage/embedded-content.html#the-source-element
    // Using forceUpdate to force redraw of video when receiving new <source>
    this.forceUpdate();
  }

  componentWillUnmount () {
    let video = this.refs.video;
    video.removeEventListener('playing', this._onPlaying);
    video.removeEventListener('pause', this._onPause);
    video.removeEventListener('ended', this._onEnded);

    if (this._responsive) {
      this._responsive.stop();
    }
  }

  _onResponsive (small) {
    if (small) {
      this.setState({iconSize: 'small'});
    } else {
      let iconSize = (('small' === this.props.size) ? null : 'large');
      this.setState({iconSize: iconSize});
    }
  }

  _onPlaying () {
    let video = this.refs.video;
    if (!this._progressTimer) {
      this._progressTimer = setInterval(function () {
        this.setState({progress: this.state.progress + 0.5});
      }.bind(this), 500);
    }
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
    let video = this.refs.video;
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
    let video = this.refs.video;

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
    let classes = [CLASS_ROOT];
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

    let controlIconSize = this.state.iconSize;
    let controlIcon = (this.state.playing ?
      <PauseIcon size={controlIconSize} /> : (this.state.ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));
    let a11yControlButtonMessage = (this.state.playing ?
      'Pause Video' : (this.state.ended ?
        'Restart Video' :
          'Play Video'));
    let a11yControlButtonTitle = Intl.getMessage(this.context.intl, a11yControlButtonMessage);

    let videoHeader;
    let videoSummaryJustify = 'between';
    if (this.props.videoHeader) {
      videoHeader = this.props.videoHeader;
    } else if (this.props.allowFullScreen) {
      let a11yExpandButtonTitle = Intl.getMessage(this.context.intl, 'Toggle Fullscreen');
      // fallback to only displaying full screen icon in header
      // if allowing fullscreen

      videoHeader = (
        <Box align="end" full="horizontal">
          <Button plain={true} onClick={this._onFullScreen}
            icon={<ExpandIcon />} a11yTitle={a11yExpandButtonTitle} />
        </Box>
      );
    } else {
      videoSummaryJustify = 'center';
    }

    let title;
    if (this.props.title) {
      classes.push(`${CLASS_ROOT}--titled`);
      title = (
        <Box align="center" justify="center" className={`${CLASS_ROOT}__title`}>
          {this.props.title}
        </Box>
      );
    }

    let timeline;
    if (this.props.timeline && this.props.duration) {

      let chapters = this.props.timeline.map(function (chapter, index, chapters) {
        let percent = Math.round((chapter.time / this.props.duration) * 100);
        let seconds = (chapter.time % 60);
        let time = Math.floor(chapter.time / 60) + ':' +
          (seconds < 10 ? '0' + seconds : seconds);
        let currentProgress = this.state.progress;
        let nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];
        let lastChapter = chapters[chapters.length - 1];

        let timelineClasses = classnames(
          `${CLASS_ROOT}__timeline-chapter`,
          {
            [`${CLASS_ROOT}__timeline-active`]: (currentProgress !== 0 && ((currentProgress >= chapter.time && currentProgress < nextChapter.time) || (index === chapters.length - 1 && currentProgress >= lastChapter.time)))
          }
        );

        return (
          <Box key={chapter.time} className={timelineClasses}
            pad={{vertical: 'small'}}
            style={{left: percent.toString() + '%'}}
            onClick={this._onClickChapter.bind(this, chapter.time)}>
            <label>{chapter.label}</label>
            <time>{time}</time>
          </Box>
        );
      }, this);

      timeline = (
        <div className={`${CLASS_ROOT}__timeline`}>
          {chapters}
        </div>
      );
    }

    let progressTicks;
    if (this.props.timeline && this.props.duration) {

      let chapters = this.props.timeline.map(function (chapter, index, chapters) {
        let percent = Math.round((chapter.time / this.props.duration) * 100);
        let currentProgress = this.state.progress;
        let nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];

        let progressTicksClasses = classnames(
          `${CLASS_ROOT}__progress-ticks-chapter`,
          {
            [`${CLASS_ROOT}__progress-ticks-active`]: (currentProgress !== 0 && currentProgress >= chapter.time && currentProgress < nextChapter.time)
          }
        );

        return (
          <div key={chapter.time} className={progressTicksClasses}
            style={{left: percent.toString() + '%'}}
            onClick={this._onClickChapter.bind(this, chapter.time)}>
          </div>
        );
      }, this);
 
      progressTicks = (
        <div className={`${CLASS_ROOT}__progress-ticks`}>
          {chapters}
        </div>
      );
    }

    let progress;
    if (this.props.duration) {
      const progressClass = classnames(
        `${CLASS_ROOT}__progress`,
        {
          [`${CLASS_ROOT}--has-timeline`]: this.props.timeline
        }
      );

      let percent = Math.min((Math.round((this.state.progress / this.props.duration) * 100)), 100);
      progress = (
        <div className={progressClass}>
          <div className={`${CLASS_ROOT}__progress-meter`}
            style={{width: percent.toString() + '%'}}></div>
          {progressTicks}
        </div>
      );
    }

    let onClickControl = this.props.onClick || this._onClickControl;
    // when iconSize is small (mobile screen sizes), remove the extra padding
    // so that the play control is centered
    let emptyBox = this.state.iconSize === 'small' ? null : <Box />;

    return (
      <div className={classes.join(' ')} onMouseMove={this._onMouseMove}>
        <video ref="video" poster={this.props.poster}>
          {this.props.children}
        </video>
        <Box pad="none" align="center" justify={videoSummaryJustify} className={`${CLASS_ROOT}__summary`}>
          {videoHeader}
          <Box pad="medium" align="center" justify="center">
            <Button className={`${CLASS_ROOT}__control`} plain={true}
              primary={true} onClick={onClickControl}
              icon={controlIcon} a11yTitle={a11yControlButtonTitle} />
            {title}
          </Box>
          {emptyBox}
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
