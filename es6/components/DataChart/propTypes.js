function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps, padPropType, pointPropType } from '../../utils/general-prop-types';
var colorType = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
  color: PropTypes.string,
  value: PropTypes.number
}))]);
var thicknessType = PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), PropTypes.string]);
var chartType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  property: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    property: PropTypes.string,
    color: colorType
  })])), PropTypes.shape({
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      property: PropTypes.string,
      transform: PropTypes.func
    })]),
    thickness: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      property: PropTypes.string,
      transform: PropTypes.func
    })]),
    x: PropTypes.string,
    y: PropTypes.string
  })]),
  color: colorType,
  dash: PropTypes.bool,
  opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.number, PropTypes.bool]),
  point: pointPropType,
  round: PropTypes.bool,
  thickness: thicknessType,
  type: PropTypes.oneOf(['bar', 'bars', 'line', 'area', 'point'])
})]);
var seriesType = PropTypes.oneOfType([PropTypes.string, // property
PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string]),
  prefix: PropTypes.string,
  property: PropTypes.string,
  render: PropTypes.func,
  suffix: PropTypes.string
})]);
var granularityType = PropTypes.oneOf(['coarse', 'medium', 'fine']);
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    axis: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.shape({
        property: PropTypes.string,
        granularity: granularityType
      })]),
      y: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.shape({
        property: PropTypes.string,
        granularity: granularityType
      })])
    })]),
    bounds: PropTypes.oneOf(['align']),
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    detail: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    guide: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        granularity: granularityType
      })]),
      y: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        granularity: granularityType
      })])
    })]),
    legend: PropTypes.bool,
    pad: padPropType,
    series: PropTypes.oneOfType([seriesType, PropTypes.arrayOf(seriesType)]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['fill']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), PropTypes.string])
    })])
  });
}

export var DataChartPropTypes = PropType;