'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _FormatTime = require('../../utils/FormatTime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;
var BUTTON_CLASS = CLASS_ROOT + '__button';

var Controls = function (_Component) {
  _inherits(Controls, _Component);

  function Controls() {
    _classCallCheck(this, Controls);

    var _this = _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this));

    _this._onChapterTickHover = _this._onChapterTickHover.bind(_this);

    _this.state = {
      activeChapterIndex: undefined
    };
    return _this;
  }

  _createClass(Controls, [{
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
      var _props = this.props,
          muted = _props.muted,
          toggleMute = _props.toggleMute;
      var intl = this.context.intl;

      var buttonMessage = _Intl2.default.getMessage(intl, 'Mute');
      var Icon = _VolumeMute2.default;
      if (muted) {
        Icon = _Volume2.default;
        buttonMessage = _Intl2.default.getMessage(intl, 'Unmute');
      }
      return _react2.default.createElement(
        _Button2.default,
        { plain: true, onClick: toggleMute, className: BUTTON_CLASS,
          a11yTitle: buttonMessage },
        _react2.default.createElement(Icon, { className: BUTTON_CLASS + '__icon', colorIndex: 'brand' })
      );
    }
  }, {
    key: '_renderChapterLabels',
    value: function _renderChapterLabels() {
      var _props2 = this.props,
          duration = _props2.duration,
          timeline = _props2.timeline,
          props = _objectWithoutProperties(_props2, ['duration', 'timeline']);

      var activeChapterIndex = this.state.activeChapterIndex;


      if (timeline) {
        var chapterLabels = timeline.map(function (chapter, index, chapters) {
          var _classnames;

          var percent = chapter.time / duration * 100;
          var classes = (0, _classnames3.default)(CLASS_ROOT + '__chapter-label', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__chapter-label-start', percent === 0), _defineProperty(_classnames, CLASS_ROOT + '__chapter-label-active', activeChapterIndex === index), _classnames));

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
          _extends({}, props, { pad: 'none', className: CLASS_ROOT + '__chapter-labels',
            direction: 'row' }),
          chapterLabels
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          togglePlay = _props3.togglePlay,
          hasPlayed = _props3.hasPlayed,
          playing = _props3.playing,
          ended = _props3.ended,
          currentTime = _props3.currentTime,
          duration = _props3.duration,
          percentagePlayed = _props3.percentagePlayed,
          seek = _props3.seek,
          timeline = _props3.timeline,
          allowFullScreen = _props3.allowFullScreen,
          fullscreen = _props3.fullscreen;


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
            _react2.default.createElement(_PlayButton2.default, { playing: playing, ended: ended, iconSize: 'medium',
              togglePlay: togglePlay, primary: false }),
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


Controls.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];