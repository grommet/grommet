function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge, padPropType, pointPropType } from '../../utils';
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
export var doc = function doc(DataChart) {
  var DocumentedDataChart = describe(DataChart).availableAt(getAvailableAtBadge('DataChart')).description("Takes a data set and visualizes it. While Chart renders a\n    single value across a data set. DataChart allows multiple overlayed\n    Charts and adds guides and axes for decoration.").usage("import { DataChart } from 'grommet';\n<DataChart data={data} property={} />").intrinsicElement('div');
  DocumentedDataChart.propTypes = _extends({}, genericProps, {
    axis: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.shape({
        property: PropTypes.string,
        granularity: granularityType
      })]),
      y: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.shape({
        property: PropTypes.string,
        granularity: granularityType
      })])
    })]).description("Whether to show an axis and how it should look.\n      If 'x' or 'y' is a string, it indicates the property to use\n      to determine the values to show.\n      If axis or 'x' is true, DataChart will look for a property called 'date'\n      or 'time' and automatically use that for the x-axis. If DataChart\n      can't find a property to use, it will use the data index for the x-axis.\n      If axis or 'y' is true, DataChart will use the first property in 'series'.\n      'granularity' indicates how many values to show.\n      'coarse' granularity shows two values, one at each end.\n      'fine' granularity shows all x-axis values and 5 y-axis values.\n      'medium' granularity picks something in between.").defaultValue(true),
    bounds: PropTypes.oneOf(['align']).description("When set to 'align', indicates that the bounds of all series\n      should be aligned. When not set, the bounds of each series\n      property are based solely on the data found for that property.").defaultValue('align'),
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)]).description("How to visualize the data.\n    'property' indicates which property of the data objects to use.\n    When 'property' is an array, multiple properties are used for a\n    stacked bar chart. If only a string is specified, that is the property\n    to use and all other aspects are defaulted. If 'property' is an object,\n    it specifies a map of properties to graphic aspects: x, y, color, thickness.\n    If 'transform' is specified, it will be used to transform the data value\n    before using it. For example, to convert a data value to a hex color\n    string for the color."),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set'),
    detail: PropTypes.bool.description("Whether to add the ability to interact with the chart\n      via mouse or keyboard to show details on specific values in the chart.\n      It shows all properties specified in 'series', using any 'render'\n      functions therein."),
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The spacing between the axes and the Charts."),
    guide: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        granularity: granularityType
      })]),
      y: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        granularity: granularityType
      })])
    })]).description("Whether to put guidelines underneath the chart graphics.\n    See the description of 'granularity' under 'axis'."),
    legend: PropTypes.bool.description('Whether to include a legend'),
    pad: padPropType.description("Spacing around the outer edge of\n    the drawing coordinate area for the graphic elements to overflow into."),
    series: PropTypes.oneOfType([seriesType, PropTypes.arrayOf(seriesType)]).description("Describes which parts of the 'data' are of interest and\n    how to handle them. 'property' indicates which property of the 'data'\n    objects this series refers to. 'label' indicates how to label the series\n    in a legend or hover details. 'prefix' and 'suffix' are applied to the\n    data values shown in an axis, legend, or details. 'render' allows custom\n    rendering of the data value. 'render' is called with:\n    (value, datum, property) => { return < />; }"),
    size: PropTypes.oneOfType([PropTypes.oneOf(['fill']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), PropTypes.string])
    })]).description("The size of the Charts. This does not include the axes\n      and any gap. It is passed through to the underlying Chart.")
  });
  return DocumentedDataChart;
};