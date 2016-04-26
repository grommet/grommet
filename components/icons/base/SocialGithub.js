'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'control-icon';

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var large = _props.large;
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-github', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'social-github', defaultMessage: 'social-github' });

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
          { id: 'social-github' },
          _react2.default.createElement('rect', { id: '_x2E_svg_282_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M23.0014,13.7188c0,4.5554-2.75,8.25-11,8.25s-11-3.696-11-8.25c0-1.9635,0.451-3.7647,1.6486-5.1824\r c-0.3493-0.9446-1.0422-3.6135,0.7576-6.743c3.2739,0.8223,4.8661,2.8875,5.4615,3.8734c0.9405-0.1265,1.9759-0.198,3.1322-0.198\r c1.1495,0,2.1808,0.0784,3.1226,0.2145c0.5871-0.9804,2.178-3.0621,5.4711-3.8899c1.8631,3.2409,1.056,5.9868,0.7219,6.8365\r C22.5036,10.0324,23.0014,11.7965,23.0014,13.7188z M19.2187,13.0312C17.4807,12.1623,15.4375,12,12,12\r s-5.4807,0.1623-7.2187,1.0312c-2.0625,1.0312-2.0625,4.4688,0,5.8438C6.3226,19.9021,8.2916,20.5938,12,20.5938\r c3.707,0,5.676-0.6916,7.2188-1.7188C21.2812,17.5,21.2812,14.0625,19.2187,13.0312z M15.4389,13.375\r c-1.4355,0-2.0625,1.2306-2.0625,2.75c0,1.518,0.5775,2.75,2.0625,2.75s2.0625-1.232,2.0625-2.75\r C17.5014,14.6056,16.8757,13.375,15.4389,13.375z M8.5639,13.375c-1.4355,0-2.0625,1.2306-2.0625,2.75\r c0,1.518,0.5775,2.75,2.0625,2.75s2.0625-1.232,2.0625-2.75C10.6264,14.6056,10.0007,13.375,8.5639,13.375z' })
        )
      );
    }
  }]);

  return Icon;
}(_react.Component);

exports.default = Icon;
;

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'social-github-title'
};

Icon.icon = true;

Icon.displayName = 'SocialGithub';
module.exports = exports['default'];