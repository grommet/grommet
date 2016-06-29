'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _SocialTwitter = require('./icons/base/SocialTwitter');

var _SocialTwitter2 = _interopRequireDefault(_SocialTwitter);

var _SocialFacebook = require('./icons/base/SocialFacebook');

var _SocialFacebook2 = _interopRequireDefault(_SocialFacebook);

var _SocialGoogle = require('./icons/base/SocialGoogle');

var _SocialGoogle2 = _interopRequireDefault(_SocialGoogle);

var _SocialLinkedin = require('./icons/base/SocialLinkedin');

var _SocialLinkedin2 = _interopRequireDefault(_SocialLinkedin);

var _SocialEmail = require('./icons/base/SocialEmail');

var _SocialEmail2 = _interopRequireDefault(_SocialEmail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var SocialShare = function (_Component) {
  _inherits(SocialShare, _Component);

  function SocialShare() {
    _classCallCheck(this, SocialShare);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SocialShare).apply(this, arguments));
  }

  _createClass(SocialShare, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var type = _props.type;
      var link = _props.link;
      var text = _props.text;
      var title = _props.title;


      var socialIcon = undefined;
      var href = '';
      var target = '_blank';

      var encodedLink = encodeURIComponent(link);
      var encodedTitle = encodeURIComponent(title);
      var encodedText = encodeURIComponent(text);

      if (type === 'twitter') {
        socialIcon = _react2.default.createElement(_SocialTwitter2.default, { a11yTitle: 'Share on Twitter' });
        href = 'https://twitter.com/intent/tweet?url=' + encodedLink + '&text=' + encodedText;
      } else if (type === 'linkedin') {
        socialIcon = _react2.default.createElement(_SocialLinkedin2.default, { a11yTitle: 'Share on LinkedIn' });
        href = 'https://www.linkedin.com/shareArticle?mini=true&url=' + encodedLink + '&title=' + encodedTitle + '&summary=' + encodedText;
      } else if (type === 'google') {
        socialIcon = _react2.default.createElement(_SocialGoogle2.default, { a11yTitle: 'Share on Google' });
        href = 'https://plus.google.com/share?url=' + encodedLink;
      } else if (type === 'facebook') {
        socialIcon = _react2.default.createElement(_SocialFacebook2.default, { a11yTitle: 'Share on Facebook' });
        href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink;
      } else if (type === 'email') {
        socialIcon = _react2.default.createElement(_SocialEmail2.default, { a11yTitle: 'Share on Email' });
        href = 'mailto:?subject=' + encodedTitle + '&body=' + encodedText + '%0D%0A' + encodedLink;
        target = '_self';
      }

      return _react2.default.createElement(_Anchor2.default, { href: href, icon: socialIcon, target: target });
    }
  }]);

  return SocialShare;
}(_react.Component);

SocialShare.displayName = 'SocialShare';
exports.default = SocialShare;
;

SocialShare.propTypes = {
  type: _react.PropTypes.oneOf(['email', 'facebook', 'twitter', 'linkedin', 'google']).isRequired,
  link: _react.PropTypes.string.isRequired,
  title: _react.PropTypes.string,
  text: _react.PropTypes.string
};

SocialShare.defaultProps = {
  title: '',
  text: ''
};
module.exports = exports['default'];