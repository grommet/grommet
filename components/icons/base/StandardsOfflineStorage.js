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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-standards-offline-storage', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'standards-offline-storage');

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle },
        _react2.default.createElement('path', { fill: '#000000', fillRule: 'evenodd', d: 'M24,8.44678681 L20.099286,8.44678681 C18.49983,4.60319619 14.6888813,2 10.4535872,2 C4.69228154,2 0,6.68412105 0,12.4535872 C0,18.2230534 4.69228154,22.9153349 10.4535872,22.9153349 C14.6888813,22.9153349 18.4916695,20.3202992 20.099286,16.4685481 L23.9918395,16.4685481 L23.9918395,8.44678681 L24,8.44678681 Z M20.8990139,13.3594016 L10.4535872,13.3594016 C9.95579735,13.3594016 9.54777287,12.9595376 9.54777287,12.4535872 C9.54777287,11.9557973 9.94763686,11.5477729 10.4535872,11.5477729 L20.8908535,11.5477729 L20.8908535,13.3594016 L20.8990139,13.3594016 Z M10.4535872,19.8143489 C6.39782387,19.8143489 3.10098606,16.5175111 3.10098606,12.4617477 C3.10098606,8.40598436 6.39782387,5.10914655 10.4535872,5.10914655 C12.967018,5.10914655 15.2764366,6.41482489 16.6147569,8.4549473 L10.4535872,8.4549473 C8.25025502,8.4549473 6.44678681,10.250255 6.44678681,12.4617477 C6.44678681,14.6650799 8.24209453,16.4685481 10.4535872,16.4685481 L16.6147569,16.4685481 C15.2845971,18.5086705 12.9751785,19.8143489 10.4535872,19.8143489 L10.4535872,19.8143489 Z', stroke: 'none' })
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

Icon.displayName = 'StandardsOfflineStorage';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _react.PropTypes.bool
};
module.exports = exports['default'];