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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-docker', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-docker');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M6.94221099,14.9002344 C6.9980621,14.9002344 7.05128211,14.9107588 7.10043586,14.9297745 C7.04721586,14.9606302 7.01109801,15.018335 7.01109801,15.0842919 C7.01109801,15.1828984 7.09098782,15.2626686 7.18959432,15.2626686 C7.25710599,15.2626686 7.31570779,15.2251754 7.34608506,15.1698027 C7.36743286,15.2214082 7.37939241,15.2780367 7.37939241,15.3374756 C7.37939241,15.578939 7.18361455,15.774657 6.94221099,15.774657 C6.70080744,15.774657 6.50496978,15.578939 6.50496978,15.3374756 C6.50496978,15.0959525 6.70080744,14.9002344 6.94221099,14.9002344 L6.94221099,14.9002344 Z M6.94221099,16.0853662 C6.52978585,16.0853662 6.19420083,15.7499008 6.19420083,15.3374756 C6.19420083,14.9250505 6.52978585,14.5895253 6.94221099,14.5895253 C7.35457634,14.5895253 7.69010156,14.9250505 7.69010156,15.3374756 C7.69010156,15.7499008 7.35457634,16.0853662 6.94221099,16.0853662 L6.94221099,16.0853662 Z M20.3859431,11.1838037 C18.2619865,16.8117894 13.4653093,19.318631 7.81023526,19.318631 C5.13823222,19.318631 3.00656172,18.3995992 1.64323262,16.8672219 L1.65327865,16.8605843 C2.04609012,16.880497 2.39758135,16.8872541 2.75439457,16.8872541 C3.08065114,16.8872541 3.39979178,16.8838457 3.6953721,16.8672219 C3.72108514,16.8657867 3.75325633,16.8621989 3.77878997,16.8605843 C3.77902916,16.8605245 3.86998155,16.8546046 3.82549202,16.853887 C4.57667146,16.8075437 5.15892224,16.7031368 5.70188589,16.5482008 C5.70200548,16.548141 5.70212508,16.548141 5.70224467,16.5480812 C5.80091098,16.5198567 5.89658739,16.4901372 5.98825735,16.4583846 C6.09081051,16.4228049 6.14510687,16.3108635 6.109587,16.2083104 C6.07406714,16.1056974 5.96218553,16.0512815 5.85957258,16.0869807 C5.16992503,16.3259326 4.26010213,16.4574876 3.14505333,16.4821841 L3.14475434,16.4821841 C2.57739321,16.4947416 1.95717085,16.4797922 1.28450587,16.4365584 L1.28444607,16.4365584 C1.14529669,16.2507668 1.01649231,16.0576798 0.89869073,15.8577161 L0.71248051,15.5172277 C0.149903198,14.4112083 -0.0964037696,13.1191582 0.0343141305,11.7160038 L16.3965356,11.7160038 C17.7407294,11.7160038 19.0534696,11.2143604 19.6764427,10.6609919 C18.5601381,9.75332174 18.670764,7.59731356 19.3822377,6.774616 C19.9997093,7.270758 20.9954018,8.31584342 20.824141,9.64622396 C21.6011531,9.255625 22.9506091,9.06259783 24,9.66816973 C23.3411483,10.9541803 21.8929064,11.3383809 20.3859431,11.1838037 L20.3859431,11.1838037 Z M2.25508329,11.3188869 L4.46771995,11.3188869 L4.46771995,9.1061306 L2.25508329,9.1061306 L2.25508329,11.3188869 Z M4.80808879,11.3188869 L7.02096464,11.3188869 L7.02096464,9.1061306 L4.80808879,9.1061306 L4.80808879,11.3188869 Z M4.80808879,8.76576176 L7.02096464,8.76576176 L7.02096464,6.5530653 L4.80808879,6.5530653 L4.80808879,8.76576176 Z M7.36127369,11.3188869 L9.57402994,11.3188869 L9.57402994,9.1061306 L7.36127369,9.1061306 L7.36127369,11.3188869 Z M7.36127369,8.76576176 L9.57402994,8.76576176 L9.57402994,6.5530653 L7.36127369,6.5530653 L7.36127369,8.76576176 Z M9.91433899,11.3188869 L12.1270952,11.3188869 L12.1270952,9.1061306 L9.91433899,9.1061306 L9.91433899,11.3188869 Z M9.91433899,8.76576176 L12.1270952,8.76576176 L12.1270952,6.5530653 L9.91433899,6.5530653 L9.91433899,8.76576176 Z M9.91433899,6.21275626 L12.1270952,6.21275626 L12.1270952,4 L9.91433899,4 L9.91433899,6.21275626 Z M12.4674043,11.3188869 L14.6801605,11.3188869 L14.6801605,9.1061306 L12.4674043,9.1061306 L12.4674043,11.3188869 Z' })
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

Icon.displayName = 'PlatformDocker';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];