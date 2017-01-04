'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var SocialShare = function (_Component) {
  (0, _inherits3.default)(SocialShare, _Component);

  function SocialShare() {
    (0, _classCallCheck3.default)(this, SocialShare);
    return (0, _possibleConstructorReturn3.default)(this, (SocialShare.__proto__ || (0, _getPrototypeOf2.default)(SocialShare)).apply(this, arguments));
  }

  (0, _createClass3.default)(SocialShare, [{
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
          props = (0, _objectWithoutProperties3.default)(_props, ['className', 'colorIndex', 'type', 'link', 'text', 'title', 'a11yTitle']);


      var socialIcon = undefined;
      var href = '';
      var target = '_blank';
      var calculatedA11yTitle = a11yTitle || 'Share on ' + (type.charAt(0).toUpperCase() + type.slice(1));

      var encodedLink = encodeURIComponent(link);
      var encodedTitle = encodeURIComponent(title);
      var encodedText = encodeURIComponent(text);

      if (type === 'twitter') {
        socialIcon = _react2.default.createElement(_SocialTwitter2.default, { a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://twitter.com/intent/tweet?url=' + (encodedLink + '&text=' + encodedText);
      } else if (type === 'linkedin') {
        socialIcon = _react2.default.createElement(_SocialLinkedin2.default, { a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + (encodedLink + '&title=' + encodedTitle + '&summary=' + encodedText);
      } else if (type === 'google') {
        socialIcon = _react2.default.createElement(_SocialGooglePlus2.default, { a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://plus.google.com/share?url=' + encodedLink;
      } else if (type === 'facebook') {
        socialIcon = _react2.default.createElement(_SocialFacebook2.default, { a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink;
      } else if (type === 'email') {
        socialIcon = _react2.default.createElement(_SocialMail2.default, { a11yTitle: calculatedA11yTitle,
          className: className, colorIndex: colorIndex });
        href = 'mailto:?subject=' + (encodedTitle + '&body=' + encodedText + '%0D%0A' + encodedLink);
        target = '_self';
      }

      return _react2.default.createElement(_Anchor2.default, (0, _extends3.default)({}, props, { href: href, icon: socialIcon, target: target }));
    }
  }]);
  return SocialShare;
}(_react.Component); // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

SocialShare.displayName = 'SocialShare';
exports.default = SocialShare;
;

SocialShare.propTypes = {
  a11yTitle: _react.PropTypes.string,
  className: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  link: _react.PropTypes.string.isRequired,
  text: _react.PropTypes.string,
  title: _react.PropTypes.string,
  type: _react.PropTypes.oneOf(['email', 'facebook', 'twitter', 'linkedin', 'google']).isRequired
};

SocialShare.defaultProps = {
  text: '',
  title: ''
};
module.exports = exports['default'];