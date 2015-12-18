// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import PlayIcon from './icons/base/Play';
import PauseIcon from './icons/base/Pause';
import RefreshIcon from './icons/base/Refresh';

const CLASS_ROOT = "video";

class Video extends Component {

  constructor () {
    super();

    this._onPlaying = this._onPlaying.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onClickControl = this._onClickControl.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onClickChapter = this._onClickChapter.bind(this);

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

  render () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.full) {
      classes.push(CLASS_ROOT + '--full');
    }
    if (this.state.playing) {
      classes.push(CLASS_ROOT + '--playing');
    }
    if (this.state.interacting) {
      classes.push(CLASS_ROOT + '--interacting');
    }
    if (this.props.colorIndex) {
      classes.push("background-color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var controlIconSize = ('small' === this.props.size ? null : 'large');
    var controlIcon = (this.state.playing ?
      <PauseIcon size={controlIconSize} /> : (this.state.ended ?
        <RefreshIcon size={controlIconSize} /> :
          <PlayIcon size={controlIconSize} />));

    var title;
    if (this.props.title) {
      title = (
        <div className={CLASS_ROOT + '__title'}>
          {this.props.title}
        </div>
      );
    }

    var timeline;
    if (this.props.timeline && this.props.duration) {

      var chapters = this.props.timeline.map(function (chapter) {
        var percent = Math.round((chapter.time / this.props.duration) * 100);
        var seconds = (chapter.time % 60);
        var time = Math.floor(chapter.time / 60) + ':' +
          (seconds < 10 ? '0' + seconds : seconds);
        return (
          <div key={chapter.time} className={CLASS_ROOT + '__timeline-chapter'}
            style={{left: percent.toString() + '%'}}
            onClick={this._onClickChapter.bind(this, chapter.time)}>
            <label>{chapter.label}</label>
            <time>{time}</time>
          </div>
        );
      }, this);

      timeline = (
        <div className={CLASS_ROOT + '__timeline'}>
          {chapters}
        </div>
      );
    }

    var progress;
    if (this.props.duration) {
      var percent = Math.round((this.state.progress / this.props.duration) * 100);
      progress = (
        <div className={CLASS_ROOT + '__progress'}>
          <div className={CLASS_ROOT + '__progress-meter'}
            style={{width: percent.toString() + '%'}}></div>
        </div>
      );
    }

    return (
      <div className={classes.join(' ')} onMouseMove={this._onMouseMove}>
        <video ref="video" poster={this.props.poster}>
          {this.props.children}
        </video>
        <div className={CLASS_ROOT + '__summary'}>
          <Button className={CLASS_ROOT + '__control'} type="icon"
            primary={true}
            onClick={this._onClickControl}>
            {controlIcon}
          </Button>
          {title}
        </div>
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
  title: PropTypes.node
};

module.exports = Video;
