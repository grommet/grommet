'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('../Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Share = require('./Share');

var _Share2 = _interopRequireDefault(_Share);

var _PlayButton = require('./PlayButton');

var _PlayButton2 = _interopRequireDefault(_PlayButton);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(props, context) {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props, context));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this.state = {
      iconSize: props.size && (props.size === 'small' || props.size === 'medium') ? 'large' : 'xlarge'
    };
    return _this;
  }

  _createClass(Overlay, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.size !== this.props.size) {
        this.setState({
          iconSize: newProps.size && (newProps.size === 'small' || newProps.size === 'medium') ? 'large' : 'xlarge'
        });
      }
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      if (small) {
        this.setState({ iconSize: 'medium' });
      } else {
        var iconSize = 'small' === this.props.size ? undefined : 'xlarge';
        this.setState({ iconSize: iconSize });
      }
    }
  }, {
    key: '_renderReplayMenu',
    value: function _renderReplayMenu() {
      var _props = this.props,
          ended = _props.ended,
          shareLink = _props.shareLink,
          shareHeadline = _props.shareHeadline,
          shareText = _props.shareText;


      var replayContent = void 0;
      if (ended) {
        replayContent = _react2.default.createElement(
          _Box2.default,
          { className: CLASS_ROOT + '__replay', align: 'center' },
          _react2.default.createElement(
            _Heading2.default,
            { tag: 'h3', strong: true, uppercase: true },
            'Replay'
          ),
          _react2.default.createElement(_Share2.default, { shareLink: shareLink, shareHeadline: shareHeadline,
            shareText: shareText })
        );
      }

      return replayContent;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          ended = _props2.ended,
          playing = _props2.playing,
          togglePlay = _props2.togglePlay,
          videoHeader = _props2.videoHeader;


      return _react2.default.createElement(
        _Box2.default,
        { pad: 'none', align: 'center', justify: 'center',
          className: CLASS_ROOT + '__overlay' },
        videoHeader,
        _react2.default.createElement(
          _Box2.default,
          { pad: 'none', align: 'center', justify: 'center' },
          _react2.default.createElement(_PlayButton2.default, { iconSize: this.state.iconSize,
            playing: playing,
            ended: ended,
            togglePlay: togglePlay })
        ),
        this._renderReplayMenu()
      );
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.displayName = 'Overlay';
exports.default = Overlay;
module.exports = exports['default'];