'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

var _Expand = require('./icons/base/Expand');

var _Expand2 = _interopRequireDefault(_Expand);

var _Play = require('./icons/base/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('./icons/base/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _Refresh = require('./icons/base/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Video = function (_Component) {
  (0, _inherits3.default)(Video, _Component);

  function Video(props, context) {
    (0, _classCallCheck3.default)(this, Video);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Video).call(this, props, context));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._onPlaying = _this._onPlaying.bind(_this);
    _this._onPause = _this._onPause.bind(_this);
    _this._onEnded = _this._onEnded.bind(_this);
    _this._onClickControl = _this._onClickControl.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onClickChapter = _this._onClickChapter.bind(_this);
    _this._onFullScreen = _this._onFullScreen.bind(_this);

    _this.state = { playing: false, progress: 0, iconSize: 'large' };
    return _this;
  }

  (0, _createClass3.default)(Video, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._responsive = _Responsive2.default.start(this._onResponsive);
      var video = this.refs.video;
      video.addEventListener('playing', this._onPlaying);
      video.addEventListener('pause', this._onPause);
      video.addEventListener('ended', this._onEnded);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Dynamically modifying a source element and its attribute when
      // the element is already inserted in a video or audio element will
      // have no effect.
      // From HTML Specs:
      // https://html.spec.whatwg.org/multipage/embedded-content.html
      //   #the-source-element
      // Using forceUpdate to force redraw of video when receiving new <source>
      this.forceUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var video = this.refs.video;
      video.removeEventListener('playing', this._onPlaying);
      video.removeEventListener('pause', this._onPause);
      video.removeEventListener('ended', this._onEnded);

      if (this._responsive) {
        this._responsive.stop();
      }
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      if (small) {
        this.setState({ iconSize: 'small' });
      } else {
        var iconSize = 'small' === this.props.size ? null : 'large';
        this.setState({ iconSize: iconSize });
      }
    }
  }, {
    key: '_onPlaying',
    value: function _onPlaying() {
      var video = this.refs.video;
      if (!this._progressTimer) {
        this._progressTimer = setInterval(function () {
          this.setState({ progress: this.state.progress + 0.5 });
        }.bind(this), 500);
      }
      this.setState({ playing: true, progress: video.currentTime, ended: null });
    }
  }, {
    key: '_onPause',
    value: function _onPause() {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
      this.setState({ playing: false });
    }
  }, {
    key: '_onEnded',
    value: function _onEnded() {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
      this.setState({ playing: false, ended: true });
    }
  }, {
    key: '_onClickControl',
    value: function _onClickControl() {
      var video = this.refs.video;
      if (this.state.playing) {
        video.pause();
      } else {
        video.play();
      }
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove() {
      this.setState({ interacting: true });
      clearTimeout(this._moveTimer);
      this._moveTimer = setTimeout(function () {
        this.setState({ interacting: false });
      }.bind(this), 1000);
    }
  }, {
    key: '_onClickChapter',
    value: function _onClickChapter(time) {
      this.refs.video.currentTime = time;
      this.setState({ progress: time });
    }
  }, {
    key: '_onFullScreen',
    value: function _onFullScreen() {
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
  }, {
    key: '_renderTimeline',
    value: function _renderTimeline() {
      var timeline = void 0;
      if (this.props.timeline && this.props.duration) {

        var chapters = this.props.timeline.map(function (chapter, index, chapters) {
          var percent = Math.round(chapter.time / this.props.duration * 100);
          var seconds = chapter.time % 60;
          var time = Math.floor(chapter.time / 60) + ':' + (seconds < 10 ? '0' + seconds : seconds);
          var currentProgress = this.state.progress;
          var nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];
          var lastChapter = chapters[chapters.length - 1];

          var timelineClasses = (0, _classnames5.default)(CLASS_ROOT + '__timeline-chapter', (0, _defineProperty3.default)({}, CLASS_ROOT + '__timeline-active', currentProgress !== 0 && (currentProgress >= chapter.time && currentProgress < nextChapter.time || index === chapters.length - 1 && currentProgress >= lastChapter.time)));

          return _react2.default.createElement(
            _Box2.default,
            { key: chapter.time, className: timelineClasses,
              pad: { vertical: 'small' },
              style: { left: percent.toString() + '%' },
              onClick: this._onClickChapter.bind(this, chapter.time) },
            _react2.default.createElement(
              'label',
              null,
              chapter.label
            ),
            _react2.default.createElement(
              'time',
              null,
              time
            )
          );
        }, this);

        timeline = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__timeline' },
          chapters
        );
      }

      return timeline;
    }
  }, {
    key: '_renderControls',
    value: function _renderControls() {
      var controlIconSize = this.state.iconSize;
      var controlIcon = this.state.playing ? _react2.default.createElement(_Pause2.default, { size: controlIconSize }) : this.state.ended ? _react2.default.createElement(_Refresh2.default, { size: controlIconSize }) : _react2.default.createElement(_Play2.default, { size: controlIconSize });
      var a11yControlButtonMessage = this.state.playing ? 'Pause Video' : this.state.ended ? 'Restart Video' : 'Play Video';
      var a11yControlButtonTitle = _Intl2.default.getMessage(this.context.intl, a11yControlButtonMessage);

      var videoHeader = void 0;
      var videoSummaryJustify = 'between';
      if (this.props.videoHeader) {
        videoHeader = this.props.videoHeader;
      } else if (this.props.allowFullScreen) {
        var a11yExpandButtonTitle = _Intl2.default.getMessage(this.context.intl, 'Toggle Fullscreen');
        // fallback to only displaying full screen icon in header
        // if allowing fullscreen

        videoHeader = _react2.default.createElement(
          _Box2.default,
          { align: 'end', full: 'horizontal' },
          _react2.default.createElement(_Button2.default, { plain: true, onClick: this._onFullScreen,
            icon: _react2.default.createElement(_Expand2.default, null), a11yTitle: a11yExpandButtonTitle })
        );
      } else {
        videoSummaryJustify = 'center';
      }

      var title = void 0;
      if (this.props.title) {
        title = _react2.default.createElement(
          _Box2.default,
          { align: 'center', justify: 'center', className: CLASS_ROOT + '__title' },
          this.props.title
        );
      }

      var onClickControl = this.props.onClick || this._onClickControl;
      // when iconSize is small (mobile screen sizes), remove the extra padding
      // so that the play control is centered
      var emptyBox = this.state.iconSize === 'small' ? null : _react2.default.createElement(_Box2.default, null);

      var controlsContent = _react2.default.createElement(
        _Box2.default,
        { pad: 'none', align: 'center', justify: videoSummaryJustify,
          className: CLASS_ROOT + '__summary' },
        videoHeader,
        _react2.default.createElement(
          _Box2.default,
          { pad: 'medium', align: 'center', justify: 'center' },
          _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', plain: true,
            primary: true, onClick: onClickControl,
            icon: controlIcon, a11yTitle: a11yControlButtonTitle }),
          title
        ),
        emptyBox
      );

      return controlsContent;
    }
  }, {
    key: '_renderProgress',
    value: function _renderProgress() {
      var progressTicks = void 0;
      if (this.props.timeline && this.props.duration) {

        var chapters = this.props.timeline.map(function (chapter, index, chapters) {
          var percent = Math.round(chapter.time / this.props.duration * 100);
          var currentProgress = this.state.progress;
          var nextChapter = chapters[Math.min(chapters.length - 1, index + 1)];

          var progressTicksClasses = (0, _classnames5.default)(CLASS_ROOT + '__progress-ticks-chapter', (0, _defineProperty3.default)({}, CLASS_ROOT + '__progress-ticks-active', currentProgress !== 0 && currentProgress >= chapter.time && currentProgress < nextChapter.time));

          return _react2.default.createElement('div', { key: chapter.time, className: progressTicksClasses,
            style: { left: percent.toString() + '%' },
            onClick: this._onClickChapter.bind(this, chapter.time) });
        }, this);

        progressTicks = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__progress-ticks' },
          chapters
        );
      }

      var progress = void 0;
      if (this.props.duration) {
        var progressClass = (0, _classnames5.default)(CLASS_ROOT + '__progress', (0, _defineProperty3.default)({}, CLASS_ROOT + '--has-timeline', this.props.timeline));

        var percent = Math.min(Math.round(this.state.progress / this.props.duration * 100), 100);
        progress = _react2.default.createElement(
          'div',
          { className: progressClass },
          _react2.default.createElement('div', { className: CLASS_ROOT + '__progress-meter',
            style: { width: percent.toString() + '%' } }),
          progressTicks
        );
      }

      return progress;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
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
      if (this.props.videoHeader) {
        classes.push(CLASS_ROOT + '--video-header');
      }
      if (this.props.colorIndex) {
        classes.push(BACKGROUND_COLOR_INDEX + '-' + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      if (this.props.title) {
        classes.push(CLASS_ROOT + '--titled');
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onMouseMove: this._onMouseMove },
        _react2.default.createElement(
          'video',
          { ref: 'video',
            poster: this.props.poster,
            autoPlay: this.props.autoPlay ? 'autoplay' : false,
            loop: this.props.loop ? 'loop' : false,
            muted: this.props.muted ? 'muted' : false },
          this.props.children
        ),
        this.props.showControls ? this._renderControls() : undefined,
        this.props.showControls ? this._renderTimeline() : undefined,
        this.props.showControls ? this._renderProgress() : undefined
      );
    }
  }]);
  return Video;
}(_react.Component);

Video.displayName = 'Video';
exports.default = Video;


Video.propTypes = {
  colorIndex: _react.PropTypes.string,
  duration: _react.PropTypes.number,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    time: _react.PropTypes.number
  })),
  title: _react.PropTypes.node,
  videoHeader: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  allowFullScreen: _react.PropTypes.bool,
  autoPlay: _react.PropTypes.bool,
  showControls: _react.PropTypes.bool,
  muted: _react.PropTypes.bool,
  loop: _react.PropTypes.bool
};

Video.defaultProps = {
  autoPlay: false,
  showControls: true,
  muted: false,
  loop: false
};
module.exports = exports['default'];