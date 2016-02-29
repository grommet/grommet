'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      var a11yTitle = _props.a11yTitle;
      var a11yTitleId = _props.a11yTitleId;
      var className = _props.className;
      var colorIndex = _props.colorIndex;
      var large = _props.large;
      var size = _props.size;

      if (!size && large) {
        size = 'large';
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-overview', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      var titleLabel = a11yTitle || 'overview';
      a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'overview' },
          _react2.default.createElement('rect', { id: '_x2E_svg_120_', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('circle', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', cx: '18.5', cy: '16.5', r: '4.5' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '10', y1: '7.1', x2: '14', y2: '7.1' }),
          _react2.default.createElement('line', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', x1: '10', y1: '16.5', x2: '14', y2: '16.5' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M1.3684,14.7138C2.0597,13.1171,3.6494,12,5.5,12\r c2.4853,0,4.5,2.0147,4.5,4.5V6.1c0-1.3807-1.1193-2.5-2.5-2.5c-1.0888,0-2.015,0.696-2.358,1.6674l-3.7584,9.414L1.3684,14.7138z' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M22.6164,14.6814l-3.7584-9.414\r C18.515,4.296,17.5888,3.6,16.5,3.6c-1.3807,0-2.5,1.1193-2.5,2.5v10.4c0-2.4853,2.0147-4.5,4.5-4.5\r c1.8506,0,3.4403,1.1171,4.1315,2.7138L22.6164,14.6814z' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M10,16.5c0,2.4853-2.0147,4.5-4.5,4.5\r S1,18.9853,1,16.5S3.0147,12,5.5,12S10,14.0147,10,16.5z' })
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
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
};

Icon.defaultProps = {
  a11yTitleId: 'overview-title'
};

Icon.icon = true;

Icon.displayName = 'Overview';
module.exports = exports['default'];