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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-service-business', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'service-business', defaultMessage: 'service-business' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24.1397 24.85', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '0', y: '0.85', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M4.1397,23h-3V5h22v18h-5 M16.1397,5V1h-8v4\r M7.7507,16.49c-0.665,0.686-1.071,1.624-1.071,2.66c0,2.128,1.722,3.85,3.85,3.85s3.85-1.638,3.85-3.766\r c0-0.8423-0.196-1.302-0.196-1.302c-0.399-1.281-1.33-1.981-2.415-2.338c-0.014-0.007-0.035-0.021-0.049-0.035\r c-0.021-0.014-0.042-0.035-0.063-0.042c-0.007-0.007-0.014-0.007-0.021-0.007 M12.5948,11.506C12.0558,10.043,10.6417,9,8.9897,9\r c-2.128,0-3.85,1.722-3.85,3.85c0,1.694,1.092,3.129,2.611,3.64c0.385,0.14,0.805,0.21,1.239,0.21c1.05,0,2.002-0.42,2.695-1.106\r c0.014-0.007,0.028-0.021,0.035-0.035c0.693-0.693,1.12-1.652,1.12-2.709C12.8397,12.374,12.7558,11.919,12.5948,11.506z\r M11.6357,15.468c0.007,0.014,0.014,0.035,0.021,0.049c0.007,0.028,0.014,0.049,0.028,0.077 M14.3796,17.9883\r c0.2915,0.0745,0.5962,0.1117,0.9101,0.1117c2.128,0,3.85-1.722,3.85-3.85s-1.722-3.85-3.85-3.85c-1.05,0-2.002,0.42-2.695,1.106' })
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
  a11yTitleId: 'service-business-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'ServiceBusiness';
module.exports = exports['default'];