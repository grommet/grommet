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

var CLASS_ROOT = _CSSClassnames2.default.VIDEO; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var BUTTON_CLASS = CLASS_ROOT + '__button';

var Overlay = function (_Component) {
  (0, _inherits3.default)(Overlay, _Component);

  function Overlay() {
    (0, _classCallCheck3.default)(this, Overlay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Overlay.__proto__ || (0, _getPrototypeOf2.default)(Overlay)).call(this));

    _this._onClickShareLink = _this._onClickShareLink.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Overlay, [{
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
  shareLink: _react.PropTypes.string,
  shareHeadline: _react.PropTypes.string,
  shareText: _react.PropTypes.string
};

Overlay.defaultProps = {
  shareHeadline: '',
  shareText: ''
};
module.exports = exports['default'];