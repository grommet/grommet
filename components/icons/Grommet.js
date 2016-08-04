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

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.LOGO_ICON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Grommet = function (_Component) {
  (0, _inherits3.default)(Grommet, _Component);

  function Grommet() {
    (0, _classCallCheck3.default)(this, Grommet);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Grommet).apply(this, arguments));
  }

  (0, _createClass3.default)(Grommet, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.small) {
        classes.push(CLASS_ROOT + '--small');
      } else if (this.props.large) {
        classes.push(CLASS_ROOT + '--large');
      } else if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var title = void 0;
      var a11yTitleId = this.props.a11yTitleId;
      if (this.props.a11yTitle) {
        title = _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: this.props.a11yTitle,
            defaultMessage: this.props.a11yTitle })
        );
      } else {
        a11yTitleId = undefined;
      }
      return _react2.default.createElement(
        'svg',
        { className: classes.join(' '), viewBox: '0 0 182 182',
          width: '182', height: '182',
          version: '1.1', role: 'img', 'aria-labelledby': a11yTitleId },
        title,
        _react2.default.createElement('path', { role: 'presentation',
          d: 'M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164',
          strokeWidth: '18', stroke: '#865CD6', fill: 'none' })
      );
    }
  }]);
  return Grommet;
}(_react.Component);

Grommet.displayName = 'Grommet';
exports.default = Grommet;


Grommet.defaultProps = {
  a11yTitle: 'Grommet',
  a11yTitleId: 'grommet-logo-title'
};

Grommet.propTypes = {
  a11yTitle: _react2.default.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
};
module.exports = exports['default'];