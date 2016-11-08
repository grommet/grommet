'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  (0, _inherits3.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-vimeo', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-vimeo');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M23.9883358,6.80210856 C23.8810843,9.13839127 22.2498115,12.336436 19.0937673,16.3969929 C15.8304716,20.6368022 13.069683,22.7570819 10.8121514,22.7570819 C9.41263176,22.7570819 8.22836518,21.4663138 7.26160165,18.8840277 C6.61584261,16.5162445 5.97083358,14.1484614 5.32432453,11.7806783 C4.60581447,9.19914212 3.8363037,7.90687403 3.01204216,7.90687403 C2.83203964,7.90687403 2.20428086,8.28487932 1.12801579,9.03713985 L0,7.58286949 C1.18426658,6.54260493 2.35203292,5.50234037 3.50179902,4.45982578 C5.08132113,3.09555668 6.26858775,2.37779663 7.0583488,2.30504561 C8.92587495,2.1257931 10.075641,3.40231097 10.5068971,6.13459922 C10.9734036,9.08289049 11.2966581,10.9166662 11.4774107,11.6344262 C12.0166682,14.0809605 12.6091765,15.3027276 13.2556856,15.3027276 C13.7574426,15.3027276 14.5127032,14.5092164 15.5184672,12.9214442 C16.5234813,11.335172 17.0619888,10.1284051 17.1339898,9.2981435 C17.2779919,7.92937434 16.7394843,7.24311474 15.5184672,7.24311474 C14.9439592,7.24311474 14.3514509,7.37511658 13.7424424,7.63612024 C14.9222089,3.77356617 17.1752404,1.89778991 20.501537,2.0042914 C22.9675715,2.07704242 24.1308378,3.6760648 23.9883358,6.80210856', stroke: 'none' })
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _react.PropTypes.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialVimeo';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];