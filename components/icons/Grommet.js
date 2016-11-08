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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGO_ICON;

var Grommet = function (_Component) {
  (0, _inherits3.default)(Grommet, _Component);

  function Grommet() {
    (0, _classCallCheck3.default)(this, Grommet);
    return (0, _possibleConstructorReturn3.default)(this, (Grommet.__proto__ || (0, _getPrototypeOf2.default)(Grommet)).apply(this, arguments));
  }

  (0, _createClass3.default)(Grommet, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          large = _props.large,
          size = _props.size,
          small = _props.small;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--small', small), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--large', large), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), _classnames));
      return _react2.default.createElement(
        'svg',
        { className: classes, viewBox: '0 0 182 182',
          width: '182', height: '182',
          version: '1.1', role: 'img', 'aria-label': _Intl2.default.getMessage(intl, a11yTitle) },
        _react2.default.createElement('path', { role: 'presentation', strokeWidth: '18', stroke: '#865CD6', fill: 'none',
          d: 'M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164' })
      );
    }
  }]);
  return Grommet;
}(_react.Component);

Grommet.displayName = 'Grommet';
exports.default = Grommet;


Grommet.contextTypes = {
  intl: _react.PropTypes.object
};

Grommet.defaultProps = {
  a11yTitle: 'Grommet'
};

Grommet.propTypes = {
  a11yTitle: _react2.default.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
};
module.exports = exports['default'];