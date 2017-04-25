'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _Box = require('../Box');

var _Box2 = _interopRequireDefault(_Box);

var _SocialShare = require('../SocialShare');

var _SocialShare2 = _interopRequireDefault(_SocialShare);

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormField = require('../FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.VIDEO;
var BUTTON_CLASS = CLASS_ROOT + '__button';

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this));

    _this._onClickShareLink = _this._onClickShareLink.bind(_this);
    return _this;
  }

  _createClass(Overlay, [{
    key: '_onClickShareLink',
    value: function _onClickShareLink() {
      (0, _reactDom.findDOMNode)(this.shareLinkRef).select();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          shareLink = _props.shareLink,
          shareHeadline = _props.shareHeadline,
          shareText = _props.shareText;

      // this has to be null to be a valid react children

      var shareContent = null;
      if (shareLink) {
        shareContent = _react2.default.createElement(
          _Box2.default,
          { align: 'center' },
          _react2.default.createElement(
            _Form2.default,
            { pad: { vertical: 'small' } },
            _react2.default.createElement(
              _FormField2.default,
              { strong: true },
              _react2.default.createElement('input', { ref: function ref(_ref) {
                  return _this2.shareLinkRef = _ref;
                },
                className: 'share-link', type: 'text', value: shareLink,
                onClick: this._onClickShareLink, readOnly: true })
            )
          ),
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row', className: BUTTON_CLASS },
            _react2.default.createElement(_SocialShare2.default, { type: 'email', link: shareLink, colorIndex: 'brand',
              className: BUTTON_CLASS + '__icon',
              title: shareHeadline, text: shareText }),
            _react2.default.createElement(_SocialShare2.default, { type: 'twitter', colorIndex: 'brand',
              className: BUTTON_CLASS + '__icon',
              link: shareLink, text: shareHeadline }),
            _react2.default.createElement(_SocialShare2.default, { type: 'facebook', colorIndex: 'brand',
              className: BUTTON_CLASS + '__icon',
              link: shareLink }),
            _react2.default.createElement(_SocialShare2.default, { type: 'linkedin', colorIndex: 'brand',
              className: BUTTON_CLASS + '__icon',
              link: shareLink, title: shareHeadline, text: shareText })
          )
        );
      }

      return shareContent;
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.displayName = 'Overlay';
exports.default = Overlay;


Overlay.propTypes = {
  shareLink: _propTypes2.default.string,
  shareHeadline: _propTypes2.default.string,
  shareText: _propTypes2.default.string
};

Overlay.defaultProps = {
  shareHeadline: '',
  shareText: ''
};
module.exports = exports['default'];