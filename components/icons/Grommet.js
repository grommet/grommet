'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LOGO_ICON;

var Grommet = function (_Component) {
  _inherits(Grommet, _Component);

  function Grommet() {
    _classCallCheck(this, Grommet);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Grommet).apply(this, arguments));
  }

  _createClass(Grommet, [{
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
      if (this.props.a11yTitle) {
        title = _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: this.props.a11yTitle,
            defaultMessage: this.props.a11yTitle })
        );
      }
      return _react2.default.createElement(
        'svg',
        { className: classes.join(' '), viewBox: '0 0 182 182', width: '182', height: '182',
          version: '1.1', role: 'img', 'aria-labelledby': this.props.a11yTitleId },
        title,
        _react2.default.createElement('path', { role: 'presentation',
          d: 'M 91,91 m 0,-82 a 82,82 0 1,1 0,164 a 82,82 0 1,1 0,-164',
          strokeWidth: '18', stroke: '#865CD6', fill: 'none' })
      );
    }
  }]);

  return Grommet;
}(_react.Component);

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