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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-youtube', className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--responsive', responsive), (0, _defineProperty3.default)(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'social-youtube', defaultMessage: 'social-youtube' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 28 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement('rect', { x: '2.0013', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement('path', { d: 'M27.7202,5.8016c0,0-0.2735-1.9302-1.1131-2.7803c-1.0648-1.1155-2.2574-1.1204-2.8043-1.1853\r c-3.9191-0.2839-9.7963-0.2839-9.7963-0.2839h-0.0128c0,0-5.8766,0-9.7955,0.2839c-0.5474,0.0649-1.74,0.0698-2.8048,1.1853\r C0.5537,3.8714,0.2806,5.8016,0.2806,5.8016S0,8.0662,0,10.3326v2.124c0,2.2661,0.2806,4.531,0.2806,4.531\r s0.2731,1.9302,1.1127,2.7803c1.0648,1.1145,2.4637,1.0798,3.087,1.1965C6.7202,21.1783,14,21.2459,14,21.2459\r s5.8837-0.0095,9.8027-0.2927c0.5469-0.0645,1.7395-0.0708,2.8043-1.1853c0.8396-0.8501,1.1131-2.7803,1.1131-2.7803\r S28,14.7227,28,12.4566v-2.124C28,8.0662,27.7202,5.8016,27.7202,5.8016z M10.892,15.2564l-0.0009-8.3179l8,4.1733\r L10.892,15.2564z' })
            )
          )
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
  a11yTitleId: 'social-youtube-title',
  responsive: true
};

Icon.icon = true;

Icon.displayName = 'SocialYoutube';
module.exports = exports['default'];