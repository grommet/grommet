'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../../../components/FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "control-icon";

var Icon = (function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT, CLASS_ROOT + '-platform-internet-explorer'];
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      } else if (this.props.large) {
        classes.push(CLASS_ROOT + "--large");
      }
      if (this.props.colorIndex) {
        classes.push("color-index-" + this.props.colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "platform-internet-explorer";
      var a11yTitle = _react2.default.createElement(_FormattedMessage2.default, { id: titleLabel, defaultMessage: titleLabel });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 25.7255 24.2312', width: '24px', height: '24px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'platform-internet-explorer', transform: 'translate(-314.39464,-274.3971)' },
          _react2.default.createElement('rect', { id: '_x2E_svg_298_', x: '316.1202', y: '274.3971', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { id: 'svg', d: 'M338.3947,287.3958c0-1.8973-0.4905-3.6797-1.3507-5.2286\r c3.6665-8.2982-3.9287-7.0827-4.3516-7c-1.6092,0.3148-3.0979,0.8204-4.4711,1.4612c-0.2025-0.0114-0.4062-0.0177-0.6115-0.0177\r c-5.1248,0-9.4146,3.5745-10.5126,8.3664c2.7011-3.0303,4.5915-4.253,5.7235-4.7423c-0.1807,0.1615-0.3576,0.3247-0.5316,0.4892\r c-0.0579,0.0547-0.1137,0.1101-0.1709,0.1652c-0.1147,0.1104-0.2292,0.2208-0.341,0.3323\r c-0.0665,0.0663-0.1313,0.1332-0.1968,0.1999c-0.0992,0.101-0.1981,0.2018-0.295,0.3034\r c-0.0688,0.0721-0.1359,0.1445-0.2034,0.2167c-0.0905,0.0968-0.1804,0.1938-0.2686,0.2911\r c-0.0685,0.0756-0.136,0.1512-0.2033,0.227c-0.0836,0.0941-0.1665,0.1883-0.2482,0.2827\r c-0.0677,0.0783-0.1349,0.1566-0.2014,0.2349c-0.0775,0.0915-0.154,0.1829-0.2297,0.2744\r c-0.067,0.0809-0.1337,0.1618-0.1992,0.2426c-0.0709,0.0874-0.1402,0.1747-0.2094,0.262\r c-0.0671,0.0845-0.1342,0.1689-0.1997,0.2534c-0.0624,0.0804-0.123,0.1604-0.1841,0.2406\r c-0.0689,0.0905-0.1383,0.1811-0.2054,0.2712c-0.048,0.0645-0.094,0.1284-0.1411,0.1927\r c-0.4261,0.5815-0.8155,1.1517-1.1671,1.6995c-0.0009,0.0013-0.0018,0.0027-0.0026,0.004\r c-0.0926,0.1443-0.1819,0.2863-0.2695,0.4272c-0.0047,0.0076-0.0096,0.0153-0.0143,0.023\r c-0.0876,0.1414-0.1723,0.2804-0.2548,0.418c-0.0029,0.0048-0.0059,0.0097-0.0088,0.0145\r c-0.2219,0.3702-0.4276,0.7271-0.6129,1.0629c-0.9713,1.7603-1.4442,2.9902-1.4647,3.0632\r c-3.0673,10.966,6.5059,6.3351,7.8417,5.6439c1.4384,0.7106,3.0577,1.1106,4.7707,1.1106c4.6895,0,8.6794-2.9934,10.1646-7.1736\r h-5.6668c-0.8385,1.4166-2.4528,2.3761-4.3073,2.3761c-2.7172,0-4.9199-2.0587-4.9199-4.5984h15.4256\r C338.3643,288.33,338.3947,287.8665,338.3947,287.3958L338.3947,287.3958z M336.3799,276.7827\r c0.9287,0.6268,1.6737,1.6112,0.3944,4.9265c-1.227-1.9732-3.0729-3.5211-5.267-4.3719\r C332.5054,276.8553,334.9771,275.8358,336.3799,276.7827z M316.6427,297.0483c-0.7564-0.7758-0.8902-2.6652,0.779-6.1082\r c0.8424,2.422,2.5234,4.4515,4.6963,5.7395C321.0374,297.2743,318.1687,298.6134,316.6427,297.0483z M322.8564,285.8357\r c0.0862-2.4684,2.2344-4.4447,4.8738-4.4447c2.6393,0,4.7876,1.9763,4.8738,4.4447H322.8564L322.8564,285.8357z' })
        )
      );
    }
  }]);

  return Icon;
})(_react.Component);

Icon.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  large: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};

Icon.defaultProps = {
  a11yTitleId: '" + resolve.fileName + "-title'
};

Icon.icon = true;

module.exports = Icon;