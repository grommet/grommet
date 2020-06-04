"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var colorType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.string,
  opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
}), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
  color: _reactDesc.PropTypes.string,
  value: _reactDesc.PropTypes.number
}))]);

var thicknessType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _reactDesc.PropTypes.string]);

var chartType = _reactDesc.PropTypes.shape({
  key: _reactDesc.PropTypes.string,
  keys: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
    key: _reactDesc.PropTypes.string,
    color: colorType
  })),
  a11yTitle: _reactDesc.PropTypes.string,
  bounds: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)),
  color: colorType,
  dash: _reactDesc.PropTypes.bool,
  onClick: _reactDesc.PropTypes.func,
  onHover: _reactDesc.PropTypes.func,
  overflow: _reactDesc.PropTypes.bool,
  round: _reactDesc.PropTypes.bool,
  thickness: thicknessType,
  type: _reactDesc.PropTypes.oneOf(['bar', 'line', 'area', 'point'])
});

var doc = function doc(DataChart) {
  var DocumentedDataChart = (0, _reactDesc.describe)(DataChart).availableAt((0, _utils.getAvailableAtBadge)('DataChart')).description("Takes a data set and visualizes it. While Chart renders a\n    single value across a data set. DataChart allows multiple overlayed\n    Charts and adds guides and axes for decoration.").usage("import { DataChart } from 'grommet';\n<DataChart data={data} chart={} />").intrinsicElement('div');
  DocumentedDataChart.propTypes = _extends({}, _utils.genericProps, {
    chart: _reactDesc.PropTypes.oneOfType([chartType, _reactDesc.PropTypes.arrayOf(chartType)]).description("Chart properties indicating how to visualize the data.\n    'key' indicates which property of the data objects to use. 'keys' indicates\n    that multiple properties should be used for a stacked bar chart. DataChart\n    uses the key/keys to build the right 'values' for the underlying Chart.\n    All of the other properties in 'chart' are passed through to the Chart."),
    data: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({})).description('the data set'),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The spacing between the axes and the Charts."),
    pad: _utils.padPropType.description("Spacing around the outer edge of\n    the drawing coordinate area for the graphic elements to overflow into."),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['fill']), _reactDesc.PropTypes.shape({
      height: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill']), _reactDesc.PropTypes.string]),
      width: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'auto']), _reactDesc.PropTypes.string])
    })]).description("The size of the Charts. This does not include the axes\n      and any gap. It is passed through to the underlying Chart.").defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: thicknessType.description("Chart thickness given to all\n    Charts if not specified per Chart in 'chart'."),
    xAxis: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
      guide: _reactDesc.PropTypes.bool,
      key: _reactDesc.PropTypes.string,
      labels: _reactDesc.PropTypes.number,
      // default undefined, all data points
      // (value, data, dataIndex, axisIndex) => element
      // value is only defined when a 'key' is provided.
      render: _reactDesc.PropTypes.func
    })]).description("x-axis configuration. 'guide' specifies that vertical\n    guide lines should be drawn under the Chart, one per label.\n    'key' specifies what property in the 'data' should be used as\n    any label content. 'labels' specifies how many labels to show.\n    'render' allows for custom rendering of the labels. It will be\n    called with the current data index and axis index and should return\n    the element to render: (dataIndex, axisIndex) => element."),
    yAxis: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.shape({
      guide: _reactDesc.PropTypes.bool,
      labels: _reactDesc.PropTypes.number,
      // default 2, top and bottom
      prefix: _reactDesc.PropTypes.string,
      render: _reactDesc.PropTypes.func,
      // (value, axisIndex) => element
      suffix: _reactDesc.PropTypes.string
    })]).description("y-axis configuration. 'guide' specifies that horizontal\n    guide lines should be drawn under the Chart, one per label.\n    'labels' specifies how many labels to show.\n    'render' allows for custom rendering of the labels. It will be\n    called with the value and axis index and should return\n    the element to render: (value, axisIndex) => element")
  });
  return DocumentedDataChart;
};

exports.doc = doc;