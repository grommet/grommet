"use strict";

exports.__esModule = true;
exports.DataChartPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var colorType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].shape({
  color: _propTypes["default"].string,
  value: _propTypes["default"].number
}))]);

var thicknessType = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _propTypes["default"].string]);

var chartType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
  property: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    property: _propTypes["default"].string,
    color: colorType
  })])), _propTypes["default"].shape({
    color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      property: _propTypes["default"].string,
      transform: _propTypes["default"].func
    })]),
    thickness: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      property: _propTypes["default"].string,
      transform: _propTypes["default"].func
    })]),
    x: _propTypes["default"].string,
    y: _propTypes["default"].string
  })]),
  color: colorType,
  dash: _propTypes["default"].bool,
  opacity: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['weak', 'medium', 'strong']), _propTypes["default"].number, _propTypes["default"].bool]),
  point: _generalPropTypes.pointPropType,
  round: _propTypes["default"].bool,
  thickness: thicknessType,
  type: _propTypes["default"].oneOf(['bar', 'bars', 'line', 'area', 'point'])
})]);

var seriesType = _propTypes["default"].oneOfType([_propTypes["default"].string, // property
_propTypes["default"].shape({
  label: _propTypes["default"].oneOfType([_propTypes["default"].string]),
  prefix: _propTypes["default"].string,
  property: _propTypes["default"].string,
  render: _propTypes["default"].func,
  suffix: _propTypes["default"].string
})]);

var granularityType = _propTypes["default"].oneOf(['coarse', 'medium', 'fine']);

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    axis: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      x: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string, _propTypes["default"].shape({
        property: _propTypes["default"].string,
        granularity: granularityType
      })]),
      y: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string, _propTypes["default"].shape({
        property: _propTypes["default"].string,
        granularity: granularityType
      })])
    })]),
    bounds: _propTypes["default"].oneOf(['align']),
    chart: _propTypes["default"].oneOfType([chartType, _propTypes["default"].arrayOf(chartType)]),
    data: _propTypes["default"].arrayOf(_propTypes["default"].shape({})),
    detail: _propTypes["default"].bool,
    gap: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    guide: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      x: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
        granularity: granularityType
      })]),
      y: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
        granularity: granularityType
      })])
    })]),
    legend: _propTypes["default"].bool,
    pad: _generalPropTypes.padPropType,
    series: _propTypes["default"].oneOfType([seriesType, _propTypes["default"].arrayOf(seriesType)]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['fill']), _propTypes["default"].shape({
      height: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), _propTypes["default"].string]),
      width: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), _propTypes["default"].string])
    })])
  });
}

var DataChartPropTypes = PropType;
exports.DataChartPropTypes = DataChartPropTypes;