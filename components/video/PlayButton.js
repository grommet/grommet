'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CirclePlay = require('../icons/base/CirclePlay');

var _CirclePlay2 = _interopRequireDefault(_CirclePlay);

var _Play = require('../icons/base/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('../icons/base/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _Refresh = require('../icons/base/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;
var BUTTON_CLASS = CLASS_ROOT + '__button';

var PlayButton = function (_Component) {
  _inherits(PlayButton, _Component);

  function PlayButton() {
    _classCallCheck(this, PlayButton);

    return _possibleConstructorReturn(this, (PlayButton.__proto__ || Object.getPrototypeOf(PlayButton)).apply(this, arguments));
  }

  _createClass(PlayButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ended = _props.ended,
          iconSize = _props.iconSize,
          playing = _props.playing,
          primary = _props.primary,
          togglePlay = _props.togglePlay;
      var intl = this.context.intl;


      var PIcon = primary ? _CirclePlay2.default : _Play2.default;
      var Icon = playing ? _Pause2.default : ended ? _Refresh2.default : PIcon;
      var controlIcon = _react2.default.createElement(Icon, { className: BUTTON_CLASS + '__icon', size: iconSize,
        colorIndex: 'brand' });

      var a11yControlButtonMessage = playing ? 'Pause Video' : ended ? 'Restart Video' : 'Play Video';

      var a11yControlButtonTitle = _Intl2.default.getMessage(intl, a11yControlButtonMessage);

      return _react2.default.createElement(
        _Button2.default,
        { plain: true, className: BUTTON_CLASS, onClick: togglePlay,
          a11yTitle: a11yControlButtonTitle },
        controlIcon
      );
    }
  }]);

  return PlayButton;
}(_react.Component);

PlayButton.displayName = 'PlayButton';
exports.default = PlayButton;


PlayButton.propTypes = {
  iconSize: _propTypes2.default.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: _propTypes2.default.bool,
  primary: _propTypes2.default.bool,
  ended: _propTypes2.default.bool,
  togglePlay: _propTypes2.default.func
};

PlayButton.defaultProps = {
  iconSize: 'xlarge',
  primary: true
};
module.exports = exports['default'];