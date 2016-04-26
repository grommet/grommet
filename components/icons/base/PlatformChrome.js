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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-chrome', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, 'color-index-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'platform-chrome', defaultMessage: 'platform-chrome' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24.1371 24.0009', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'platform-chrome' },
          _react2.default.createElement('rect', { id: '_x2E_svg_302_', x: '0.1371', y: '0.0009', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M6.0538,10.4666L2.6192,4.5177C4.8183,1.7644,8.2032,0,12.0009,0c4.3933,0,8.2344,2.3612,10.3257,5.8832h-9.7922\r c-0.1759-0.0152-0.3537-0.0234-0.5335-0.0234C9.1442,5.8598,6.7369,7.8203,6.0538,10.4666z M16.2974,7.6177h6.8785\r c0.533,1.3578,0.8259,2.8362,0.8259,4.3831c0,6.5823-5.2996,11.926-11.8646,11.9991l4.908-8.5009\r c0.691-0.9933,1.0968-2.1992,1.0968-3.4983C18.1419,10.2858,17.4349,8.733,16.2974,7.6177z M7.6412,12.0009\r c0-2.4039,1.9558-4.3597,4.3597-4.3597s4.3597,1.9558,4.3597,4.3597s-1.9558,4.3597-4.3597,4.3597S7.6412,14.4048,7.6412,12.0009z\r M13.6459,17.9179l-3.4357,5.9507C4.4317,23.0041,0,18.0201,0,12.0009c0-2.1381,0.5598-4.1451,1.5399-5.8838l4.8995,8.4863\r c0.9814,2.0887,3.1051,3.5386,5.5615,3.5386C12.5704,18.1419,13.1221,18.0636,13.6459,17.9179z' })
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
  a11yTitleId: 'platform-chrome-title'
};

Icon.icon = true;

Icon.displayName = 'PlatformChrome';
module.exports = exports['default'];