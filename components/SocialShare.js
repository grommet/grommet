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

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _SocialTwitter = require('./icons/base/SocialTwitter');

var _SocialTwitter2 = _interopRequireDefault(_SocialTwitter);

var _SocialFacebook = require('./icons/base/SocialFacebook');

var _SocialFacebook2 = _interopRequireDefault(_SocialFacebook);

var _SocialGooglePlus = require('./icons/base/SocialGooglePlus');

var _SocialGooglePlus2 = _interopRequireDefault(_SocialGooglePlus);

var _SocialLinkedin = require('./icons/base/SocialLinkedin');

var _SocialLinkedin2 = _interopRequireDefault(_SocialLinkedin);

var _SocialMail = require('./icons/base/SocialMail');

var _SocialMail2 = _interopRequireDefault(_SocialMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var SocialShare = function (_Component) {
  _inherits(SocialShare, _Component);

  function SocialShare() {
    _classCallCheck(this, SocialShare);

    return _possibleConstructorReturn(this, (SocialShare.__proto__ || Object.getPrototypeOf(SocialShare)).apply(this, arguments));
  }

  _createClass(SocialShare, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex,
          type = _props.type,
          link = _props.link,
          text = _props.text,
          title = _props.title,
          a11yTitle = _props.a11yTitle,
          props = _objectWithoutProperties(_props, ['className', 'colorIndex', 'type', 'link', 'text', 'title', 'a11yTitle']);

      var socialIcon = undefined;
      var href = '';
      var target = '_blank';
      var calculatedA11yTitle = a11yTitle || 'Share on ' + (type.charAt(0).toUpperCase() + type.slice(1));

      var encodedLink = encodeURIComponent(link);
      var encodedTitle = encodeURIComponent(title);
      var encodedText = encodeURIComponent(text);

      if (type === 'twitter') {
        socialIcon = _react2.default.createElement(_SocialTwitter2.default, {
          a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://twitter.com/intent/tweet?url=' + (encodedLink + '&text=' + encodedText);
      } else if (type === 'linkedin') {
        socialIcon = _react2.default.createElement(_SocialLinkedin2.default, {
          a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + (encodedLink + '&title=' + encodedTitle + '&summary=' + encodedText);
      } else if (type === 'google') {
        socialIcon = _react2.default.createElement(_SocialGooglePlus2.default, {
          a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://plus.google.com/share?url=' + encodedLink;
      } else if (type === 'facebook') {
        socialIcon = _react2.default.createElement(_SocialFacebook2.default, {
          a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink;
      } else if (type === 'email') {
        socialIcon = _react2.default.createElement(_SocialMail2.default, {
          a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'mailto:?subject=' + (encodedTitle + '&body=' + encodedText + '%0D%0A' + encodedLink);
        target = '_self';
      }

      return _react2.default.createElement(_Anchor2.default, _extends({}, props, { href: href, icon: socialIcon, target: target }));
    }
  }]);

  return SocialShare;
}(_react.Component);

SocialShare.displayName = 'SocialShare';
exports.default = SocialShare;


SocialShare.propTypes = {
  a11yTitle: _propTypes2.default.string,
  className: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  link: _propTypes2.default.string.isRequired,
  text: _propTypes2.default.string,
  title: _propTypes2.default.string,
  type: _propTypes2.default.oneOf(['email', 'facebook', 'twitter', 'linkedin', 'google']).isRequired
};

SocialShare.defaultProps = {
  text: '',
  title: ''
};
module.exports = exports['default'];