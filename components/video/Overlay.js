'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;

var Overlay = function (_Component) {
  (0, _inherits3.default)(Overlay, _Component);

  function Overlay() {
    (0, _classCallCheck3.default)(this, Overlay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Overlay.__proto__ || (0, _getPrototypeOf2.default)(Overlay)).call(this));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this.state = { iconSize: 'large' };
    return _this;
  }

  (0, _createClass3.default)(Overlay, [{
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
    key: '_renderReplayMenu',
    value: function _renderReplayMenu() {
      var _props = this.props;
      var ended = _props.ended;
      var shareLink = _props.shareLink;
      var shareHeadline = _props.shareHeadline;
      var shareText = _props.shareText;


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
      var _props2 = this.props;
      var ended = _props2.ended;
      var playing = _props2.playing;
      var togglePlay = _props2.togglePlay;
      var videoHeader = _props2.videoHeader;
      // when iconSize is small (mobile screen sizes), remove the extra padding
      // so that the play control is centered

      var emptyBox = this.state.iconSize === 'small' ? null : _react2.default.createElement(_Box2.default, null);

      return _react2.default.createElement(
        _Box2.default,
        { pad: 'none', align: 'center', justify: 'center',
          className: CLASS_ROOT + '__overlay' },
        videoHeader,
        _react2.default.createElement(
          _Box2.default,
          { pad: 'none', align: 'center', justify: 'center' },
          _react2.default.createElement(_PlayButton2.default, { iconSize: this.state.iconSize,
            className: CLASS_ROOT + '__play',
            playing: playing,
            ended: ended,
            togglePlay: togglePlay })
        ),
        this._renderReplayMenu(),
        emptyBox
      );
    }
  }]);
  return Overlay;
}(_react.Component);

Overlay.displayName = 'Overlay';
exports.default = Overlay;
module.exports = exports['default'];