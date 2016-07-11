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
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-google', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'social-google', defaultMessage: 'social-google' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24.0009', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'social-google' },
          _react2.default.createElement('rect', { x: '0', y: '0.0009', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M12.6393,13.7016l-1.1254-0.874c-0.3427-0.2843-0.8115-0.6595-0.8115-1.3464c0-0.6897,0.4688-1.1283,0.8756-1.5343\r c1.3111-1.0319,2.621-2.1302,2.621-4.4447c0-2.38-1.4976-3.632-2.2153-4.226h1.9352L15.9503,0H9.7964\r c-1.6886,0-4.122,0.3995-5.9035,1.8703C2.5502,3.0288,1.8952,4.6261,1.8952,6.064c0,2.441,1.8742,4.9154,5.1838,4.9154\r c0.3125,0,0.6544-0.0308,0.9986-0.0627c-0.1546,0.3761-0.3108,0.6892-0.3108,1.2207c0,0.9695,0.4982,1.564,0.9372,2.1271\r c-1.4063,0.0966-4.0316,0.2523-5.9668,1.4419c-1.8431,1.096-2.404,2.6914-2.404,3.8174C0.3333,21.8412,2.5177,24,7.0474,24\r c5.3714,0,8.2151-2.9722,8.2151-5.9145C15.2628,15.9236,14.0139,14.8595,12.6393,13.7016z M8.5481,10.1023\r c-2.6871,0-3.9044-3.4738-3.9044-5.5698c0-0.816,0.1546-1.6586,0.6861-2.3167c0.501-0.6267,1.3735-1.0333,2.1881-1.0333\r c2.5905,0,3.9341,3.5049,3.9341,5.7591c0,0.564-0.0622,1.5634-0.7804,2.2859C10.1691,9.7288,9.3285,10.1023,8.5481,10.1023z\r M8.5789,22.6884c-3.3415,0-5.4963-1.5984-5.4963-3.821c0-2.222,1.998-2.9737,2.6854-3.2226\r c1.3111-0.4411,2.9982-0.5027,3.2797-0.5027c0.3122,0,0.4685,0,0.7171,0.0314c2.3755,1.6906,3.4065,2.5331,3.4065,4.1336\r C13.1713,21.245,11.578,22.6884,8.5789,22.6884z' }),
          _react2.default.createElement('polygon', { points: '20.5266,10.0546 20.5266,6.9252 18.981,6.9252 18.981,10.0546 15.8568,10.0546 15.8568,11.6174 18.981,11.6174 \r 18.981,14.766 20.5266,14.766 20.5266,11.6174 23.6667,11.6174 23.6667,10.0546 \t' })
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
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'social-google-title'
};

Icon.icon = true;

Icon.displayName = 'SocialGoogle';
module.exports = exports['default'];