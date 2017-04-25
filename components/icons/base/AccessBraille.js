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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-access-braille', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'access-braille');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: 'none', stroke: '#000', strokeWidth: '2', d: 'M6.59459459,6.18918919 C8.02754962,6.18918919 9.18918919,5.02754962 9.18918919,3.59459459 C9.18918919,2.16163957 8.02754962,1 6.59459459,1 C5.16163957,1 4,2.16163957 4,3.59459459 C4,5.02754962 5.16163957,6.18918919 6.59459459,6.18918919 Z M16.9189189,6.18918919 C18.3518739,6.18918919 19.5135135,5.02754962 19.5135135,3.59459459 C19.5135135,2.16163957 18.3518739,1 16.9189189,1 C15.4859639,1 14.3243243,2.16163957 14.3243243,3.59459459 C14.3243243,5.02754962 15.4859639,6.18918919 16.9189189,6.18918919 Z M6.59459459,14.5945946 C8.02754962,14.5945946 9.18918919,13.432955 9.18918919,12 C9.18918919,10.567045 8.02754962,9.40540541 6.59459459,9.40540541 C5.16163957,9.40540541 4,10.567045 4,12 C4,13.432955 5.16163957,14.5945946 6.59459459,14.5945946 Z M16.9189189,14.5945946 C18.3518739,14.5945946 19.5135135,13.432955 19.5135135,12 C19.5135135,10.567045 18.3518739,9.40540541 16.9189189,9.40540541 C15.4859639,9.40540541 14.3243243,10.567045 14.3243243,12 C14.3243243,13.432955 15.4859639,14.5945946 16.9189189,14.5945946 Z M16.9189189,4.56756757 C17.4562771,4.56756757 17.8918919,4.13195273 17.8918919,3.59459459 C17.8918919,3.05723646 17.4562771,2.62162162 16.9189189,2.62162162 C16.3815608,2.62162162 15.9459459,3.05723646 15.9459459,3.59459459 C15.9459459,4.13195273 16.3815608,4.56756757 16.9189189,4.56756757 Z M16.9189189,12.972973 C17.4562771,12.972973 17.8918919,12.5373581 17.8918919,12 C17.8918919,11.4626419 17.4562771,11.027027 16.9189189,11.027027 C16.3815608,11.027027 15.9459459,11.4626419 15.9459459,12 C15.9459459,12.5373581 16.3815608,12.972973 16.9189189,12.972973 Z M6.59459459,23 C8.02754962,23 9.18918919,21.8383604 9.18918919,20.4054054 C9.18918919,18.9724504 8.02754962,17.8108108 6.59459459,17.8108108 C5.16163957,17.8108108 4,18.9724504 4,20.4054054 C4,21.8383604 5.16163957,23 6.59459459,23 Z M6.59459459,21.3783784 C7.13195273,21.3783784 7.56756757,20.9427635 7.56756757,20.4054054 C7.56756757,19.8680473 7.13195273,19.4324324 6.59459459,19.4324324 C6.05723646,19.4324324 5.62162162,19.8680473 5.62162162,20.4054054 C5.62162162,20.9427635 6.05723646,21.3783784 6.59459459,21.3783784 Z M16.9189189,23 C18.3518739,23 19.5135135,21.8383604 19.5135135,20.4054054 C19.5135135,18.9724504 18.3518739,17.8108108 16.9189189,17.8108108 C15.4859639,17.8108108 14.3243243,18.9724504 14.3243243,20.4054054 C14.3243243,21.8383604 15.4859639,23 16.9189189,23 Z' })
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

Icon.displayName = 'AccessBraille';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];