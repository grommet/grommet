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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-vimeo', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'social-vimeo', defaultMessage: 'social-vimeo' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M20.1611,6.6903c-0.48,2.8577-1.7372,5.528-3.7716,8.0108c-2.0115,2.4595-3.8402,4.2631-5.486,5.4108\r c-0.96,0.4919-1.8058,0.5036-2.5373,0.0351c-0.7086-0.445-1.2686-1.0892-1.6801-1.9324c-0.2286-0.445-0.7943-2.2545-1.6972-5.4284\r S3.5432,7.9083,3.3603,7.6741C3.2003,7.3696,2.8289,7.3579,2.246,7.639C1.6631,7.92,1.2688,8.166,1.0631,8.3768L0.2745,7.3227\r l0.8915-1.0892c0.7086-0.773,1.5429-1.5401,2.503-2.3014s1.8172-1.2239,2.5715-1.3878c1.0058-0.2108,1.7487,0.2928,2.2287,1.5108\r C8.7663,4.7579,9.052,6.0227,9.3263,7.8498C9.372,8.2011,9.4978,8.7984,9.7035,9.6417c0.6629,2.8342,1.1886,4.2514,1.5772,4.2514\r c0.5715,0,1.5086-1.2649,2.8116-3.7946c0.5943-1.1478,0.6286-2.0964,0.1029-2.846c-0.5257-0.7496-1.3486-0.7613-2.4687-0.0351\r c0.1829-1.1712,0.6743-2.1667,1.4744-2.9865c1.4858-1.6162,3.0973-2.2135,4.8345-1.7919\r C19.864,2.7903,20.5726,4.2074,20.1611,6.6903L20.1611,6.6903z' })
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
  a11yTitleId: 'social-vimeo-title'
};

Icon.icon = true;

Icon.displayName = 'SocialVimeo';
module.exports = exports['default'];