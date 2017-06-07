'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

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

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-edge', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-edge');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M5.487,6.3566 C2.632,8.1336 1,10.6596 1,10.6596 C1,10.6596 1.423,5.3636 5.487,2.2646 C7.103,1.0326 9.313,-0.0004 12.285,-0.0004 C13.402,-0.0004 15.744,0.1946 17.853,1.4946 C19.962,2.7946 20.814,3.8846 21.764,5.4786 C22.174,6.1666 22.508,7.0506 22.716,7.9036 C23.107,9.5016 23.154,11.4116 23.154,11.4116 L23.154,13.9286 L8.081,13.9286 C8.081,13.9286 7.713,18.9936 14.645,18.9936 C17.056,18.9936 17.9,18.6146 18.693,18.3796 C19.934,18.0126 21.133,17.1926 21.133,17.1926 L21.135,22.2526 C21.135,22.2526 18.298,23.9996 14.012,23.9996 C12.805,23.9996 11.533,23.8986 10.306,23.5006 C9.234,23.1526 6.99,22.2146 5.487,20.0166 C4.956,19.2386 4.38,18.2036 4.094,17.1926 C3.786,16.0996 3.79,15.0376 3.79,14.4526 C3.79,12.2646 4.537,10.1756 5.834,8.6656 C7.515,6.7096 9.638,5.8476 9.638,5.8476 C9.638,5.8476 8.947,6.6546 8.521,7.6586 C8.096,8.6626 7.979,9.6726 7.979,9.6726 L16.49,9.6726 C16.49,9.6726 16.988,4.5866 11.675,4.5866 C9.672,4.5866 7.213,5.2816 5.487,6.3566' })
      );
    }
  }]);

  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _propTypes2.default.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'PlatformEdge';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];