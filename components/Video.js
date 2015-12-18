// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _iconsBasePlay = require('./icons/base/Play');

var _iconsBasePlay2 = _interopRequireDefault(_iconsBasePlay);

var _iconsBasePause = require('./icons/base/Pause');

var _iconsBasePause2 = _interopRequireDefault(_iconsBasePause);

var _iconsBaseRefresh = require('./icons/base/Refresh');

var _iconsBaseRefresh2 = _interopRequireDefault(_iconsBaseRefresh);

var CLASS_ROOT = "video";

var Video = (function (_Component) {
  _inherits(Video, _Component);

  function Video() {
    _classCallCheck(this, Video);

    _get(Object.getPrototypeOf(Video.prototype), 'constructor', this).call(this);

    this._onPlaying = this._onPlaying.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onClickControl = this._onClickControl.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onClickChapter = this._onClickChapter.bind(this);

    this.state = { playing: false, progress: 0 };
  }

  _createClass(Video, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var video = this.refs.video;
      video.addEventListener('playing', this._onPlaying);
      video.addEventListener('pause', this._onPause);
      video.addEventListener('ended', this._onEnded);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var video = this.refs.video;
      video.removeEventListener('playing', this._onPlaying);
      video.removeEventListener('pause', this._onPause);
      video.removeEventListener('ended', this._onEnded);
    }
  }, {
    key: '_onPlaying',
    value: function _onPlaying() {
      var video = this.refs.video;
      this._progressTimer = setInterval((function () {
        this.setState({ progress: this.state.progress + 0.5 });
      }).bind(this), 500);
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
      this._moveTimer = setTimeout((function () {
        this.setState({ interacting: false });
      }).bind(this), 1000);
    }
  }, {
    key: '_onClickChapter',
    value: function _onClickChapter(time) {
      this.refs.video.currentTime = time;
      this.setState({ progress: time });
    }
  }, {
    key: 'render',
    value: function render() {
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

      var controlIconSize = 'small' === this.props.size ? null : 'large';
      var controlIcon = this.state.playing ? _react2['default'].createElement(_iconsBasePause2['default'], { size: controlIconSize }) : this.state.ended ? _react2['default'].createElement(_iconsBaseRefresh2['default'], { size: controlIconSize }) : _react2['default'].createElement(_iconsBasePlay2['default'], { size: controlIconSize });

      var title;
      if (this.props.title) {
        title = _react2['default'].createElement(
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
          return _react2['default'].createElement(
            'div',
            { key: chapter.time, className: CLASS_ROOT + '__timeline-chapter',
              style: { left: percent.toString() + '%' },
              onClick: this._onClickChapter.bind(this, chapter.time) },
            _react2['default'].createElement(
              'label',
              null,
              chapter.label
            ),
            _react2['default'].createElement(
              'time',
              null,
              time
            )
          );
        }, this);

        timeline = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + '__timeline' },
          chapters
        );
      }

      var progress;
      if (this.props.duration) {
        var percent = Math.round(this.state.progress / this.props.duration * 100);
        progress = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + '__progress' },
          _react2['default'].createElement('div', { className: CLASS_ROOT + '__progress-meter',
            style: { width: percent.toString() + '%' } })
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: classes.join(' '), onMouseMove: this._onMouseMove },
        _react2['default'].createElement(
          'video',
          { ref: 'video', poster: this.props.poster },
          this.props.children
        ),
        _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + '__summary' },
          _react2['default'].createElement(
            _Button2['default'],
            { className: CLASS_ROOT + '__control', type: 'icon',
              primary: true,
              onClick: this._onClickControl },
            controlIcon
          ),
          title
        ),
        timeline,
        progress
      );
    }
  }]);

  return Video;
})(_react.Component);

Video.propTypes = {
  colorIndex: _react.PropTypes.string,
  duration: _react.PropTypes.number,
  full: _react.PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  poster: _react.PropTypes.string,
  size: _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']),
  timeline: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    time: _react.PropTypes.number
  })),
  title: _react.PropTypes.node
};

module.exports = Video;