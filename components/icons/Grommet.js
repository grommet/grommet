'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedMessage = require('../FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "logo-icon";

var Grommet = function (_Component) {
  _inherits(Grommet, _Component);

  function Grommet() {
    _classCallCheck(this, Grommet);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Grommet).apply(this, arguments));
  }

  _createClass(Grommet, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.small || 'small' === this.props.size) {
        classes.push(CLASS_ROOT + "--small");
      }
      if (this.props.large || 'large' === this.props.size) {
        classes.push(CLASS_ROOT + "--large");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var title = void 0;
      if (this.props.a11yTitle) {
        title = _react2.default.createElement(
          'title',
          { id: this.props.a11yTitleId },
          _react2.default.createElement(_FormattedMessage2.default, { id: this.props.a11yTitle,
            defaultMessage: this.props.a11yTitle })
        );
      }
      return _react2.default.createElement(
        'svg',
        { className: classes.join(' '), viewBox: '0 0 140 140', width: '140', height: '140',
          version: '1.1', role: 'img', 'aria-labelledby': this.props.a11yTitleId },
        title,
        _react2.default.createElement('path', { role: 'presentation', d: 'M119.49603,20.5014878 L100.989057,39.0094878 C105.89805,43.9184878 109.859044,49.7734878 111.669042,55.3734878 C122.692025,89.4684878 93.3250687,120.604488 59.5321185,112.820488 C44.9911399,109.470488 30.5211612,94.9984878 27.1751661,80.4564878 C20.432176,51.1514878 42.9571429,25.1854878 71.2931012,25.9974878 L93.3090687,3.98048778 C86.0960794,1.43348778 78.3420908,0.0304877767 70.2641027,0.000487776719 C32.014159,-0.141512223 0.549205302,30.7384878 0.00720609982,68.9844878 C-0.547793083,108.124488 31.0271604,140.024488 70.045103,139.999488 C108.802046,139.975488 140,108.756488 140,70.0004878 C140,50.6694878 132.164012,33.1694878 119.49603,20.5014878 L119.49603,20.5014878 Z', fill: '#8C50FF' }),
        _react2.default.createElement('path', { role: 'presentation', d: 'M27.1736636,80.457549 C30.5194807,94.999549 44.98869,109.472549 59.5288954,112.821549 C93.3190487,120.605549 122.685444,89.469549 111.663046,55.374549 C109.852145,49.774549 105.891362,43.918549 100.98363,39.010549 L69.9953234,70.000549 L100.083679,70.001549 C100.083679,86.762549 86.3804279,100.322549 69.5663468,100.089549 C53.4302287,99.865549 40.23095,86.746549 39.9119674,70.611549 C39.7429767,62.061549 43.140791,54.304549 48.7174862,48.725549 L48.6404904,48.648549 L71.2872528,25.998549 C42.9548011,25.186549 20.4310321,51.152549 27.1736636,80.457549 L27.1736636,80.457549 Z', fill: '#333333' })
      );
    }
  }]);

  return Grommet;
}(_react.Component);

exports.default = Grommet;


Grommet.defaultProps = {
  a11yTitle: 'Grommet',
  a11yTitleId: 'grommet-logo-title'
};

Grommet.propTypes = {
  a11yTitle: _react2.default.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large'])
};
module.exports = exports['default'];