'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGO_ICON;

var Grommet = function (_Component) {
  _inherits(Grommet, _Component);

  function Grommet() {
    _classCallCheck(this, Grommet);

    return _possibleConstructorReturn(this, (Grommet.__proto__ || Object.getPrototypeOf(Grommet)).apply(this, arguments));
  }

  _createClass(Grommet, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          invert = _props.invert,
          large = _props.large,
          size = _props.size,
          small = _props.small;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--small', small), _defineProperty(_classnames, CLASS_ROOT + '--large', large), _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _classnames), className);
      var stroke = invert ? '#fff' : '#865CD6';
      return _react2.default.createElement(
        'svg',
        { className: classes, viewBox: '0 0 182 182',
          width: '182', height: '182',
          version: '1.1', role: 'img', 'aria-label': _Intl2.default.getMessage(intl, a11yTitle) },
        _react2.default.createElement('path', { role: 'presentation', strokeWidth: '18', stroke: stroke, fill: 'none',
          d: 'M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164' })
      );
    }
  }]);

  return Grommet;
}(_react.Component);

Grommet.displayName = 'Grommet';
exports.default = Grommet;


Grommet.contextTypes = {
  intl: _propTypes2.default.object
};

Grommet.defaultProps = {
  a11yTitle: 'Grommet'
};

Grommet.propTypes = {
  a11yTitle: _propTypes2.default.string,
  invert: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'xlarge'])
};
module.exports = exports['default'];