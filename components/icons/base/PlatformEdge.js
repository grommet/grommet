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

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

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

      var _props = this.props;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;
      var responsive = _props2.responsive;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-edge', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'platform-edge', defaultMessage: 'platform-edge' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24.4466', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { id: 'Microsoft-Edge-logo', d: 'M5.41,6.8032c-2.8552,1.7773-4.487,4.3029-4.487,4.3029\r S1.3459,5.8103,5.41,2.7115c1.6164-1.2324,3.8262-2.265,6.7984-2.265c1.1166,0,3.4581,0.1943,5.5671,1.4946\r s2.9612,2.3895,3.9114,3.9842c0.41,0.6881,0.7439,1.5721,0.9523,2.4248c0.3903,1.5977,0.4378,3.5084,0.4378,3.5084v2.517H8.0038\r c0,0-0.3681,5.0642,6.5639,5.0642c2.4109,0,3.2551-0.3787,4.048-0.6136c1.2413-0.3676,2.44-1.187,2.44-1.187l0.0023,5.0597\r c0,0-2.837,1.7475-7.123,1.7475c-1.207,0-2.4789-0.1012-3.7056-0.4992C9.1574,23.5996,6.9125,22.6615,5.41,20.463\r c-0.5315-0.7777-1.1074-1.8126-1.3927-2.8236c-0.3084-1.0931-0.3046-2.155-0.3046-2.74c0-2.1881,0.7475-4.2771,2.0447-5.7874\r c1.6803-1.9562,3.804-2.8174,3.804-2.8174S8.8697,7.1011,8.4442,8.1052s-0.5419,2.0143-0.5419,2.0143h8.5112\r c0,0,0.4978-5.0859-4.816-5.0859C9.5953,5.0336,7.1362,5.7286,5.41,6.8032z' })
        )
      );
    }
  }]);
  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};

Icon.defaultProps = {
  a11yTitleId: 'platform-edge-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'PlatformEdge';
module.exports = exports['default'];