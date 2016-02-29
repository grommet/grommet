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

      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-twitter', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      var titleLabel = a11yTitle || 'social-twitter';
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
          { id: 'social-twitter' },
          _react2.default.createElement('rect', { id: '_x2E_svg_307_', x: '0', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M24,4.5565c-0.8831,0.3923-1.8319,0.6563-2.828,0.7755c1.0164-0.6093,1.7974-1.5744,2.1648-2.7242\r c-0.9512,0.5646-2.0053,0.974-3.1265,1.1953c-0.8982-0.9575-2.1779-1.5551-3.5941-1.5551c-2.7195,0-4.924,2.2045-4.924,4.924\r c0,0.386,0.0434,0.7617,0.1275,1.1216C7.7275,8.0887,4.0991,6.1282,1.671,3.1489C1.247,3.8761,1.0044,4.722,1.0044,5.625\r c0,1.7075,0.8689,3.2151,2.1904,4.0981C2.3875,9.6969,1.6282,9.4757,0.9644,9.1075c-0.0004,0.02-0.0007,0.0407-0.0007,0.0613\r c0,2.3858,1.6975,4.3759,3.9499,4.8281c-0.4129,0.1131-0.8482,0.173-1.297,0.173c-0.3174,0-0.6256-0.031-0.9265-0.0889\r c0.6266,1.9564,2.4451,3.3805,4.5996,3.4205c-1.6854,1.3201-3.8082,2.1073-6.1151,2.1073c-0.3978,0-0.7897-0.0234-1.1747-0.0683\r c2.179,1.396,4.7671,2.2115,7.5479,2.2115c9.0568,0,14.0094-7.5028,14.0094-14.0094c0-0.213-0.0049-0.4254-0.0145-0.6363\r C22.5052,6.4115,23.3399,5.5443,24,4.5565z' })
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
  a11yTitleId: 'social-twitter-title'
};

Icon.icon = true;

Icon.displayName = 'SocialTwitter';
module.exports = exports['default'];