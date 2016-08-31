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

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Play = require('../icons/base/Play');

var _Play2 = _interopRequireDefault(_Play);

var _Pause = require('../icons/base/Pause');

var _Pause2 = _interopRequireDefault(_Pause);

var _Refresh = require('../icons/base/Refresh');

var _Refresh2 = _interopRequireDefault(_Refresh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var FullscreenButton = function (_Component) {
  (0, _inherits3.default)(FullscreenButton, _Component);

  function FullscreenButton() {
    (0, _classCallCheck3.default)(this, FullscreenButton);
    return (0, _possibleConstructorReturn3.default)(this, (FullscreenButton.__proto__ || (0, _getPrototypeOf2.default)(FullscreenButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(FullscreenButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var playing = _props.playing;
      var ended = _props.ended;
      var togglePlay = _props.togglePlay;
      var iconSize = _props.iconSize;


      var classes = [];
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var controlIconSize = iconSize;
      var controlIcon = playing ? _react2.default.createElement(_Pause2.default, { size: controlIconSize }) : ended ? _react2.default.createElement(_Refresh2.default, { size: controlIconSize }) : _react2.default.createElement(_Play2.default, { size: controlIconSize });
      var a11yControlButtonMessage = playing ? 'Pause Video' : ended ? 'Restart Video' : 'Play Video';

      var a11yControlButtonTitle = _Intl2.default.getMessage(this.context.intl, a11yControlButtonMessage);

      return _react2.default.createElement(_Button2.default, { className: classes.join(' '), plain: true,
        primary: true, onClick: togglePlay,
        icon: controlIcon, a11yTitle: a11yControlButtonTitle });
    }
  }]);
  return FullscreenButton;
}(_react.Component);

FullscreenButton.displayName = 'FullscreenButton';
exports.default = FullscreenButton;


FullscreenButton.propTypes = {
  iconSize: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  playing: _react.PropTypes.bool,
  ended: _react.PropTypes.bool,
  togglePlay: _react.PropTypes.func
};

FullscreenButton.defaultProps = {
  iconSize: 'medium'
};
module.exports = exports['default'];