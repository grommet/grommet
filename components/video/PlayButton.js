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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;
var BUTTON_CLASS = CLASS_ROOT + '__button';

var PlayButton = function (_Component) {
  (0, _inherits3.default)(PlayButton, _Component);

  function PlayButton() {
    (0, _classCallCheck3.default)(this, PlayButton);
    return (0, _possibleConstructorReturn3.default)(this, (PlayButton.__proto__ || (0, _getPrototypeOf2.default)(PlayButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(PlayButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ended = _props.ended,
          iconSize = _props.iconSize,
          playing = _props.playing,
          primary = _props.primary,
          togglePlay = _props.togglePlay;
      var intl = this.context.intl;


      var PlayIcon = primary ? _CirclePlay2.default : _Play2.default;
      var Icon = playing ? _Pause2.default : ended ? _Refresh2.default : PlayIcon;
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
  iconSize: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  ended: _react.PropTypes.bool,
  togglePlay: _react.PropTypes.func
};

PlayButton.defaultProps = {
  iconSize: 'xlarge',
  primary: true
};
module.exports = exports['default'];