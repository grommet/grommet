function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge, padPropType } from '../../utils';
var colorType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  color: PropTypes.string,
  opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
}), PropTypes.arrayOf(PropTypes.shape({
  color: PropTypes.string,
  value: PropTypes.number
}))]);
var thicknessType = PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), PropTypes.string]);
var chartType = PropTypes.shape({
  key: PropTypes.string,
  keys: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    color: colorType
  })),
  a11yTitle: PropTypes.string,
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  color: colorType,
  dash: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  overflow: PropTypes.bool,
  round: PropTypes.bool,
  thickness: thicknessType,
  type: PropTypes.oneOf(['bar', 'line', 'area', 'point'])
});
export var doc = function doc(DataChart) {
  var DocumentedDataChart = describe(DataChart).availableAt(getAvailableAtBadge('DataChart')).description("Takes a data set and visualizes it. While Chart renders a\n    single value across a data set. DataChart allows multiple overlayed\n    Charts and adds guides and axes for decoration.").usage("import { DataChart } from 'grommet';\n<DataChart data={data} chart={} />").intrinsicElement('div');
  DocumentedDataChart.propTypes = _extends({}, genericProps, {
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)]).description("Chart properties indicating how to visualize the data.\n    'key' indicates which property of the data objects to use. 'keys' indicates\n    that multiple properties should be used for a stacked bar chart. DataChart\n    uses the key/keys to build the right 'values' for the underlying Chart.\n    All of the other properties in 'chart' are passed through to the Chart."),
    data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set'),
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The spacing between the axes and the Charts."),
    pad: padPropType.description("Spacing around the outer edge of\n    the drawing coordinate area for the graphic elements to overflow into."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['fill']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), PropTypes.string])
    })]).description("The size of the Charts. This does not include the axes\n      and any gap. It is passed through to the underlying Chart.").defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: thicknessType.description("Chart thickness given to all\n    Charts if not specified per Chart in 'chart'."),
    xAxis: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      guide: PropTypes.bool,
      key: PropTypes.string,
      labels: PropTypes.number,
      // default undefined, all data points
      // (value, data, dataIndex, axisIndex) => element
      // value is only defined when a 'key' is provided.
      render: PropTypes.func
    })]).description("x-axis configuration. 'guide' specifies that vertical\n    guide lines should be drawn under the Chart, one per label.\n    'key' specifies what property in the 'data' should be used as\n    any label content. 'labels' specifies how many labels to show.\n    'render' allows for custom rendering of the labels. It will be\n    called with the current data index and axis index and should return\n    the element to render: (dataIndex, axisIndex) => element."),
    yAxis: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      guide: PropTypes.bool,
      labels: PropTypes.number,
      // default 2, top and bottom
      prefix: PropTypes.string,
      render: PropTypes.func,
      // (value, axisIndex) => element
      suffix: PropTypes.string
    })]).description("y-axis configuration. 'guide' specifies that horizontal\n    guide lines should be drawn under the Chart, one per label.\n    'labels' specifies how many labels to show.\n    'render' allows for custom rendering of the labels. It will be\n    called with the value and axis index and should return\n    the element to render: (value, axisIndex) => element")
  });
  return DocumentedDataChart;
};