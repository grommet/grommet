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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-centos', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-centos');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M5.1609863,6.25070841 L3.24873581,8.1633816 L3.24873581,3.22722505 L8.18367123,3.22722505 L6.23953033,5.17169472 L6.093182,5.31809002 L6.23953033,5.46453229 L10.7544892,9.98066536 L10.7544892,10.7189824 L9.92411742,10.7189824 L5.45678278,6.25066145 L5.30719374,6.10102544 L5.1609863,6.25070841 L5.1609863,6.25070841 Z M10.7545362,9.39193738 L10.7545362,3.22722505 L8.77239922,3.22722505 L6.68190998,5.31813699 L10.7545362,9.39193738 L10.7545362,9.39193738 Z M5.30728767,6.6930411 L3.24873581,8.75225049 L3.24873581,10.7190294 L9.33224266,10.7190294 L5.30728767,6.6930411 L5.30728767,6.6930411 Z M13.2714364,9.36319374 L17.3154599,5.31809002 L15.1964149,3.19848141 L13.2714364,3.19848141 L13.2714364,9.36319374 L13.2714364,9.36319374 Z M17.9071937,5.31809002 L17.7576047,5.46453229 L13.2713894,9.95516243 L13.2713894,10.7189824 L14.0572368,10.7189824 L18.5340117,6.24108023 L18.680454,6.09463796 L18.8299022,6.24108023 L20.7899648,8.20147162 L20.7899648,3.19852838 L15.785002,3.19852838 L17.7576047,5.17174168 L17.9071937,5.31809002 L17.9071937,5.31809002 Z M11.1714129,2.80720157 L11.1714129,3.01723679 L11.1714129,9.80886106 L11.998638,10.636274 L12.8545127,9.78011742 L12.8545127,2.99168689 L12.8545127,2.78155773 L13.064454,2.78155773 L14.7794912,2.78155773 L11.998638,-1.77635684e-15 L9.19223483,2.80720157 L10.9613777,2.80720157 L11.1714129,2.80720157 L11.1714129,2.80720157 Z M14.6490176,10.7190294 L20.7900587,10.7190294 L20.7900587,8.79358121 L18.6805479,6.68355382 L14.6490176,10.7190294 L14.6490176,10.7190294 Z M10.6241096,12.011225 L9.75231311,11.1391468 L3.03870059,11.1391468 L2.83190607,11.1391468 L2.83190607,10.9291115 L2.83190607,9.16917417 L0,12.0015499 L2.8318591,14.8342544 L2.8318591,13.0167358 L2.8318591,12.8101292 L3.03865362,12.8101292 L9.82539335,12.8101292 L10.6241096,12.011225 L10.6241096,12.011225 Z M13.2714364,14.6909589 L13.2714364,20.747225 L15.2345049,20.747225 L17.2803757,18.7008376 L13.2714364,14.6909589 L13.2714364,14.6909589 Z M5.31691585,17.3197808 L9.40861057,13.226865 L3.24873581,13.226865 L3.24873581,15.2508493 L5.31691585,17.3197808 L5.31691585,17.3197808 Z M18.6805479,17.3197808 L20.7900587,15.2098474 L20.7900587,13.226865 L14.5918121,13.226865 L18.6805479,17.3197808 L18.6805479,17.3197808 Z M21.2099413,14.789589 L23.9970881,12.0015969 L21.2099413,9.21365166 L21.2099413,10.9291585 L21.2099413,11.1391937 L20.9997652,11.1391937 L14.229135,11.1391937 L13.3667319,12.0015969 L14.1750294,12.8101761 L20.9998121,12.8101761 L21.2099883,12.8101761 L21.2099883,13.0167828 L21.2099883,14.789589 L21.2099413,14.789589 Z M18.6805479,17.9083679 L18.5341057,17.7623014 L14.0000783,13.2269119 L13.2714364,13.2269119 L13.2714364,14.1022309 L17.7226614,18.5543953 L17.8689159,18.7008845 L17.7226614,18.8504736 L15.8261918,20.747319 L20.7900117,20.747319 L20.7900117,15.8015342 L18.8299491,17.7622544 L18.6805479,17.9083679 L18.6805479,17.9083679 Z M12.8545127,21.1643836 L12.8545127,20.9542544 L12.8545127,14.2738004 L11.9827162,13.4020509 L11.184,14.2005793 L11.184,20.9542544 L11.184,21.1643836 L10.9741526,21.1643836 L9.14461057,21.1643836 L11.9827162,24 L14.8177221,21.1643836 L13.064407,21.1643836 L12.8545127,21.1643836 L12.8545127,21.1643836 Z M6.09322896,18.7008376 L6.2395773,18.5543483 L10.7672642,14.0256282 L10.7672642,13.226865 L9.99733855,13.226865 L5.46321722,17.7622544 L5.31691585,17.9083209 L5.17047358,17.7622544 L3.24873581,15.8398121 L3.24873581,20.7471781 L8.13590607,20.7471781 L6.2395773,18.8503327 L6.09322896,18.7008376 L6.09322896,18.7008376 Z M10.7672642,14.6176908 L6.68190998,18.7008376 L8.72768689,20.747225 L10.7672642,20.747225 L10.7672642,14.6176908 L10.7672642,14.6176908 Z' })
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

Icon.displayName = 'PlatformCentos';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];