"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var colorType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.string,
  value: _reactDesc.PropTypes.number
}))]);

var thicknessType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _reactDesc.PropTypes.string]);

var chartType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  property: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
    property: _reactDesc.PropTypes.string,
    color: colorType
  })])), _reactDesc.PropTypes.shape({
    color: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      property: _reactDesc.PropTypes.string,
      transform: _reactDesc.PropTypes.func
    })]),
    thickness: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      property: _reactDesc.PropTypes.string,
      transform: _reactDesc.PropTypes.func
    })]),
    x: _reactDesc.PropTypes.string,
    y: _reactDesc.PropTypes.string
  })]),
  color: colorType,
  dash: _reactDesc.PropTypes.bool,
  opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.number, _reactDesc.PropTypes.bool]),
  point: _propTypes.pointPropType,
  round: _reactDesc.PropTypes.bool,
  thickness: thicknessType,
  type: _reactDesc.PropTypes.oneOf(['bar', 'bars', 'line', 'area', 'point'])
})]);

var seriesType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, // property
_reactDesc.PropTypes.shape({
  label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string]),
  prefix: _reactDesc.PropTypes.string,
  property: _reactDesc.PropTypes.string,
  render: _reactDesc.PropTypes.func,
  suffix: _reactDesc.PropTypes.string
})]);

var granularityType = _reactDesc.PropTypes.oneOf(['coarse', 'medium', 'fine']);

var doc = function doc(DataChart) {
  var DocumentedDataChart = (0, _reactDesc.describe)(DataChart).availableAt((0, _mixins.getAvailableAtBadge)('DataChart', 'Visualizations')).description("Takes a data set and visualizes it. While Chart renders a\n    single value across a data set. DataChart allows multiple overlayed\n    Charts and adds guides and axes for decoration.").usage("import { DataChart } from 'grommet';\n<DataChart data={data} property={} />").intrinsicElement('div');
  DocumentedDataChart.propTypes = _extends({}, _propTypes.genericProps, {
    axis: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
      x: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
        property: _reactDesc.PropTypes.string,
        granularity: granularityType
      })]),
      y: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
        property: _reactDesc.PropTypes.string,
        granularity: granularityType
      })])
    })]).description("Whether to show an axis and how it should look.\n      If 'x' or 'y' is a string, it indicates the property to use\n      to determine the values to show.\n      If axis or 'x' is true, DataChart will look for a property called 'date'\n      or 'time' and automatically use that for the x-axis. If DataChart\n      can't find a property to use, it will use the data index for the x-axis.\n      If axis or 'y' is true, DataChart will use the first property in 'series'.\n      'granularity' indicates how many values to show.\n      'coarse' granularity shows two values, one at each end.\n      'fine' granularity shows all x-axis values and 5 y-axis values.\n      'medium' granularity picks something in between.").defaultValue(true),
    bounds: _reactDesc.PropTypes.oneOf(['align']).description("When set to 'align', indicates that the bounds of all series\n      should be aligned. When not set, the bounds of each series\n      property are based solely on the data found for that property.").defaultValue('align'),
    chart: _reactDesc.PropTypes.oneOfType([chartType, _reactDesc.PropTypes.arrayOf(chartType)]).description("How to visualize the data.\n    'property' indicates which property of the data objects to use.\n    When 'property' is an array, multiple properties are used for a\n    stacked bar chart. If only a string is specified, that is the property\n    to use and all other aspects are defaulted. If 'property' is an object,\n    it specifies a map of properties to graphic aspects: x, y, color, thickness.\n    If 'transform' is specified, it will be used to transform the data value\n    before using it. For example, to convert a data value to a hex color\n    string for the color."),
    data: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({})).description('the data set'),
    detail: _reactDesc.PropTypes.bool.description("Whether to add the ability to interact with the chart\n      via mouse or keyboard to show details on specific values in the chart.\n      It shows all properties specified in 'series', using any 'render'\n      functions therein."),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The spacing between the axes and the Charts."),
    guide: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
      x: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
        granularity: granularityType
      })]),
      y: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
        granularity: granularityType
      })])
    })]).description("Whether to put guidelines underneath the chart graphics.\n    See the description of 'granularity' under 'axis'."),
    legend: _reactDesc.PropTypes.bool.description('Whether to include a legend'),
    pad: _propTypes.padPropType.description("Spacing around the outer edge of\n    the drawing coordinate area for the graphic elements to overflow into."),
    series: _reactDesc.PropTypes.oneOfType([seriesType, _reactDesc.PropTypes.arrayOf(seriesType)]).description("Describes which parts of the 'data' are of interest and\n    how to handle them. 'property' indicates which property of the 'data'\n    objects this series refers to. 'label' indicates how to label the series\n    in a legend or hover details. 'prefix' and 'suffix' are applied to the\n    data values shown in an axis, legend, or details. 'render' allows custom\n    rendering of the data value. 'render' is called with:\n    (value, datum, property) => { return < />; }"),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['fill']), _reactDesc.PropTypes.shape({
      height: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), _reactDesc.PropTypes.string]),
      width: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), _reactDesc.PropTypes.string])
    })]).description("The size of the Charts. This does not include the axes\n      and any gap. It is passed through to the underlying Chart.")
  });
  return DocumentedDataChart;
};

exports.doc = doc;