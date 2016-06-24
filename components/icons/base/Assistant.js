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

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

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
      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var size = _props2.size;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-assistant', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _react2.default.createElement(_FormattedMessage2.default, { id: 'assistant', defaultMessage: 'assistant' });

      return _react2.default.createElement(
        'svg',
        { version: '1.1', viewBox: '0 0 24 25.5', width: '24px', height: '24px', role: 'img', className: classes, 'aria-labelledby': a11yTitleId },
        _react2.default.createElement(
          'title',
          { id: a11yTitleId },
          a11yTitle
        ),
        _react2.default.createElement(
          'g',
          { id: 'assistant' },
          _react2.default.createElement('rect', { id: '_x2E_svg_246_', y: '0', fill: 'none', width: '24', height: '24' }),
          _react2.default.createElement('path', { d: 'M9.1397,13.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1\r C10.1397,13.0523,9.692,13.5,9.1397,13.5z' }),
          _react2.default.createElement('path', { d: 'M16.1397,13.5h-1c-0.5523,0-1-0.4477-1-1v-1c0-0.5523,0.4477-1,1-1h1c0.5523,0,1,0.4477,1,1v1\r C17.1397,13.0523,16.692,13.5,16.1397,13.5z' }),
          _react2.default.createElement('circle', { cx: '12.0981', cy: '2.5417', r: '2.0417' }),
          _react2.default.createElement('path', { fill: 'none', stroke: '#000000', strokeWidth: '2', strokeMiterlimit: '10', d: 'M20.1397,18.5c-1.3553,0.71-4.1967,1.9688-8,1.9688\r c-1.53,0-4.631-0.2037-8-1.9688c0-2.3333,0-1.6667,0-4c0-4.4183,3.5817-8,8-8h0c4.4183,0,8,3.5817,8,8V18.5z M12.1397,6.5v-4\r M4.1702,13.7989c0,2.15,4.4695,2.7011,7.9695,2.7011 M12.1397,16.5c3.5,0,7.9677-0.5633,7.9677-2.7133 M8.1397,20.5\r c0,2.21,1.79,4,4,4s4-1.79,4-4' })
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
  a11yTitleId: 'assistant-title'
};

Icon.icon = true;

Icon.displayName = 'Assistant';
module.exports = exports['default'];