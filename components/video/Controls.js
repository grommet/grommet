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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('../Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Volume = require('../icons/base/Volume');

var _Volume2 = _interopRequireDefault(_Volume);

var _VolumeMute = require('../icons/base/VolumeMute');

var _VolumeMute2 = _interopRequireDefault(_VolumeMute);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _FullscreenButton = require('./FullscreenButton');

var _FullscreenButton2 = _interopRequireDefault(_FullscreenButton);

var _ProgressBar = require('./ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _PlayButton = require('./PlayButton');

var _PlayButton2 = _interopRequireDefault(_PlayButton);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _FormatTime = require('../../utils/FormatTime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Controls = function (_Component) {
  (0, _inherits3.default)(Controls, _Component);

  function Controls() {
    (0, _classCallCheck3.default)(this, Controls);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Controls.__proto__ || (0, _getPrototypeOf2.default)(Controls)).call(this));

    _this._onChapterTickHover = _this._onChapterTickHover.bind(_this);

    _this.state = {
      activeChapterIndex: undefined
    };
    return _this;
  }

  (0, _createClass3.default)(Controls, [{
    key: '_onChapterTickHover',
    value: function _onChapterTickHover(index) {
      this.setState({ activeChapterIndex: index });
    }
  }, {
    key: '_renderTitle',
    value: function _renderTitle() {
      var title = void 0;
      if (this.props.title) {
        title = _react2.default.createElement(
          _Box2.default,
          { pad: { horizontal: 'small', vertical: 'none' } },
          _react2.default.createElement(
            _Heading2.default,
            { tag: 'h3', margin: 'none' },
            this.props.title
          )
        );
      }

      return title;
    }
  }, {
    key: '_renderMuteButton',
    value: function _renderMuteButton() {
      return _react2.default.createElement(_Button2.default, { plain: true, primary: true,
        onClick: this.props.toggleMute, icon: this.props.muted ? _react2.default.createElement(_VolumeMute2.default, null) : _react2.default.createElement(_Volume2.default, null) });
    }
  }, {
    key: '_renderChapterLabels',
    value: function _renderChapterLabels() {
      var _props = this.props;
      var duration = _props.duration;
      var timeline = _props.timeline;
      var activeChapterIndex = this.state.activeChapterIndex;


      if (timeline) {
        var chapterLabels = timeline.map(function (chapter, index, chapters) {
          var _classnames;

          var percent = chapter.time / duration * 100;
          var classes = (0, _classnames3.default)(CLASS_ROOT + '__chapter-label', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__chapter-label-start', percent === 0), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__chapter-label-active', activeChapterIndex === index), _classnames));

          return _react2.default.createElement(
            'div',
            { className: classes, key: chapter.label,
              style: { left: percent + '%' } },
            _react2.default.createElement(
              'span',
              null,
              chapter.label
            ),
            _react2.default.createElement(
              'span',
              null,
              (0, _FormatTime.formatTime)(chapter.time)
            )
          );
        });

        return _react2.default.createElement(
          _Box2.default,
          { pad: 'none', className: CLASS_ROOT + '__chapter-labels',
            direction: 'row' },
          chapterLabels
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var togglePlay = _props2.togglePlay;
      var hasPlayed = _props2.hasPlayed;
      var playing = _props2.playing;
      var ended = _props2.ended;
      var currentTime = _props2.currentTime;
      var duration = _props2.duration;
      var percentagePlayed = _props2.percentagePlayed;
      var seek = _props2.seek;
      var timeline = _props2.timeline;
      var allowFullScreen = _props2.allowFullScreen;
      var fullscreen = _props2.fullscreen;


      if (!hasPlayed) {
        return null;
      }

      var overlayContent = _react2.default.createElement(
        _Box2.default,
        { pad: 'none', className: CLASS_ROOT + '__controls',
          direction: 'column', justify: 'start' },
        _react2.default.createElement(_ProgressBar2.default, { progress: percentagePlayed,
          onChapterHover: this._onChapterTickHover,
          duration: duration, onChange: seek, timeline: timeline }),
        timeline ? this._renderChapterLabels() : undefined,
        _react2.default.createElement(
          _Box2.default,
          { pad: 'none', className: CLASS_ROOT + '__controls-primary',
            direction: 'row', justify: 'between' },
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row', align: 'center',
              pad: { horizontal: 'small', vertical: 'none' } },
            _react2.default.createElement(_PlayButton2.default, {
              playing: playing, ended: ended,
              togglePlay: togglePlay }),
            this._renderTitle()
          ),
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row', align: 'center',
              pad: { horizontal: 'small', vertical: 'none' } },
            _react2.default.createElement(_Time2.default, { currentTime: currentTime, duration: duration }),
            this._renderMuteButton(),
            allowFullScreen ? _react2.default.createElement(_FullscreenButton2.default, { onClick: fullscreen }) : undefined
          )
        )
      );

      return overlayContent;
    }
  }]);
  return Controls;
}(_react.Component);

Controls.displayName = 'Controls';
exports.default = Controls;
module.exports = exports['default'];