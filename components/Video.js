'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Play = require('./icons/base/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('./icons/base/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _Refresh = require('./icons/base/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "video";

var Video = function (_Component) {
  _inherits(Video, _Component);

  function Video() {
    _classCallCheck(this, Video);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Video).call(this));

    _this._onPlaying = _this._onPlaying.bind(_this);
    _this._onPause = _this._onPause.bind(_this);
    _this._onEnded = _this._onEnded.bind(_this);
    _this._onClickControl = _this._onClickControl.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onClickChapter = _this._onClickChapter.bind(_this);

    _this.state = { playing: false, progress: 0 };
    return _this;
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
      this._progressTimer = setInterval(function () {
        this.setState({ progress: this.state.progress + 0.5 });
      }.bind(this), 500);
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
      if (this.props.colorIndex) {
        classes.push('background-color-index-' + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var controlIconSize = 'small' === this.props.size ? null : 'large';
      var controlIcon = this.state.playing ? _react2.default.createElement(_Pause2.default, { size: controlIconSize }) : this.state.ended ? _react2.default.createElement(_Refresh2.default, { size: controlIconSize }) : _react2.default.createElement(_Play2.default, { size: controlIconSize });

      var title;
      if (this.props.title) {
        classes.push(CLASS_ROOT + '--titled');
        title = _react2.default.createElement(
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
          return _react2.default.createElement(
            'div',
            { key: chapter.time, className: CLASS_ROOT + '__timeline-chapter',
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

      var progress;
      if (this.props.duration) {
        var percent = Math.round(this.state.progress / this.props.duration * 100);
        progress = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__progress' },
          _react2.default.createElement('div', { className: CLASS_ROOT + '__progress-meter',
            style: { width: percent.toString() + '%' } })
        );
      }

      return _react2.default.createElement(
        'div',
        { className: classes.join(' '), onMouseMove: this._onMouseMove },
        _react2.default.createElement(
          'video',
          { ref: 'video', poster: this.props.poster },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__summary' },
          _react2.default.createElement(
            _Button2.default,
            { className: CLASS_ROOT + '__control', plain: true,
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
}(_react.Component);

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
  title: _react.PropTypes.node
};
module.exports = exports['default'];