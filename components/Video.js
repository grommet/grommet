// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var PlayIcon = require('./icons/base/Play');
var PauseIcon = require('./icons/base/Pause');
var RefreshIcon = require('./icons/base/Refresh');

var CLASS_ROOT = "video";

var Video = React.createClass({
  displayName: 'Video',

  propTypes: {
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
  },

  getInitialState: function getInitialState() {
    return { playing: false, progress: 0 };
  },

  componentDidMount: function componentDidMount() {
    var video = this.refs.video;
    video.addEventListener('playing', this._onPlaying);
    video.addEventListener('pause', this._onPause);
    video.addEventListener('ended', this._onEnded);
  },

  componentWillUnmount: function componentWillUnmount() {
    var video = this.refs.video;
    video.removeEventListener('playing', this._onPlaying);
    video.removeEventListener('pause', this._onPause);
    video.removeEventListener('ended', this._onEnded);
  },

  _onPlaying: function _onPlaying() {
    var video = this.refs.video;
    this._progressTimer = setInterval((function () {
      this.setState({ progress: this.state.progress + 0.5 });
    }).bind(this), 500);
    this.setState({ playing: true, progress: video.currentTime, ended: null });
  },

  _onPause: function _onPause() {
    clearInterval(this._progressTimer);
    this._progressTimer = null;
    this.setState({ playing: false });
  },

  _onEnded: function _onEnded() {
    clearInterval(this._progressTimer);
    this._progressTimer = null;
    this.setState({ playing: false, ended: true });
  },

  _onClickControl: function _onClickControl() {
    var video = this.refs.video;
    if (this.state.playing) {
      video.pause();
    } else {
      video.play();
    }
  },

  _onMouseMove: function _onMouseMove() {
    this.setState({ interacting: true });
    clearTimeout(this._moveTimer);
    this._moveTimer = setTimeout((function () {
      this.setState({ interacting: false });
    }).bind(this), 1000);
  },

  _onClickChapter: function _onClickChapter(time) {
    this.refs.video.currentTime = time;
    this.setState({ progress: time });
  },

  render: function render() {
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

    var controlIcon = this.state.playing ? React.createElement(PauseIcon, { size: 'large' }) : this.state.ended ? React.createElement(RefreshIcon, { size: 'large' }) : React.createElement(PlayIcon, { size: 'large' });

    var title;
    if (this.props.title) {
      title = React.createElement(
        'div',
        { className: CLASS_ROOT + '__title' },
        this.props.title
      );
    }

    var timeline;
    if (this.props.timeline && this.props.duration) {

      var chapters = this.props.timeline.map(function (chapter) {
        var percent = Math.round(chapter.time / this.props.duration * 100);
        var seconds = chapter.time % 60;
        var time = Math.floor(chapter.time / 60) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        return React.createElement(
          'div',
          { key: chapter.time, className: CLASS_ROOT + '__timeline-chapter',
            style: { left: percent.toString() + '%' },
            onClick: this._onClickChapter.bind(this, chapter.time) },
          React.createElement(
            'label',
            null,
            chapter.label
          ),
          React.createElement(
            'time',
            null,
            time
          )
        );
      }, this);

      timeline = React.createElement(
        'div',
        { className: CLASS_ROOT + '__timeline' },
        chapters
      );
    }

    var progress;
    if (this.props.duration) {
      var percent = Math.round(this.state.progress / this.props.duration * 100);
      progress = React.createElement(
        'div',
        { className: CLASS_ROOT + '__progress' },
        React.createElement('div', { className: CLASS_ROOT + '__progress-meter',
          style: { width: percent.toString() + '%' } })
      );
    }

    return React.createElement(
      'div',
      { className: classes.join(' '), onMouseMove: this._onMouseMove },
      React.createElement(
        'video',
        { ref: 'video', poster: this.props.poster },
        this.props.children
      ),
      React.createElement(
        'div',
        { className: CLASS_ROOT + '__summary' },
        React.createElement(
          'div',
          { className: CLASS_ROOT + '__control', onClick: this._onClickControl },
          controlIcon
        ),
        title
      ),
      timeline,
      progress
    );
  }

});

module.exports = Video;