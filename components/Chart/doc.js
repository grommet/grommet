"use strict";

exports.__esModule = true;
exports.themeDoc = exports.docCalcs = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var thicknessType = _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _reactDesc.PropTypes.string, _reactDesc.PropTypes.number]);

var doc = function doc(Chart) {
  var DocumentedChart = (0, _reactDesc.describe)(Chart).availableAt((0, _utils.getAvailableAtBadge)('Chart')).description('A graphical chart.').usage("import { Chart } from 'grommet';\n<Chart />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedChart.propTypes = _extends({}, _utils.genericProps, {
    animate: _reactDesc.PropTypes.bool.description('Whether to animate drawing.'),
    bounds: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)).description("The limits for the values, specified as a two dimensional array. \n      The first array specifies the limits of the x-axis. The second array \n      specifies the limits of the y-axis. \n      For example: [[x-min, x-max], [y-min, y-max]].\n      If not specified, the bounds will automatically be set to fit\n      the provided values."),
    color: _reactDesc.PropTypes.oneOfType([_utils.colorPropType, _reactDesc.PropTypes.shape({
      color: _utils.colorPropType,
      // deprecated, use top level 'opacity'
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
    }), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      color: _utils.colorPropType,
      value: _reactDesc.PropTypes.number
    }))]).description("A color identifier to use for the graphic color. If an\n      array is specified, it is used to create a gradient mask. Array objects\n      indicate what color to show at what value. In the simplest case, the\n      values should map to the Y bounds values, resulting in a vertical\n      gradient. Specifying more objects allows more fine grained control over\n      where the gradient colors change.").defaultValue('accent-1'),
    id: _reactDesc.PropTypes.string.description("A unique identifier for the Chart. This\n      is required if more than one Chart is shown and they use color\n      gradients."),
    dash: _reactDesc.PropTypes.bool.description("Whether to use dashed lines for line or bar charts.").defaultValue(false),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _reactDesc.PropTypes.string]).description("The amount of spacing between data points. This\n      is only used when the size specifies width as 'auto'."),
    onClick: _reactDesc.PropTypes.func.description("Called when the user clicks on the\n     visualization. Clicking on individual bars or points are handled via\n     values[].onClick for those types of charts."),
    onHover: _reactDesc.PropTypes.func.description("Called with a boolean argument\n      indicating when the user hovers onto or away from it.\n      This is only available when the type is line or area."),
    opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool]).description("What opacity to apply to the visuals. Supercedes 'color.opacity'"),
    overflow: _reactDesc.PropTypes.bool.description("Whether the chart strokes should overflow the component. Set this\n      to true for precise positioning when stacking charts or including\n      precise axes. Set this to false to have the graphical elements\n      align with the component boundaries.").defaultValue(false),
    pad: _utils.padPropType.description("Spacing around the outer edge of the drawing coordinate area.\n      Related to 'overflow', this allows control over how much space\n      is available for bars and points to overflow into."),
    point: _utils.pointPropType.description("When using a 'point' type, what shape the points should use.\n      If this property is not specified, points will be drawn as a square or\n      a circle, based on how 'round' is specified."),
    round: _reactDesc.PropTypes.bool.description('Whether to round the line ends.').defaultValue(false),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), _reactDesc.PropTypes.shape({
      height: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), _reactDesc.PropTypes.string]),
      width: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full', 'auto']), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description("The size of the Chart.\n      'full' is deprecated as 'fill' is more consistent with how that term is\n      used elsewhere.").defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: thicknessType.description('The width of the stroke.').defaultValue('medium'),
    type: _reactDesc.PropTypes.oneOf(['bar', 'line', 'area', 'point']).description('The visual type of chart.').defaultValue('bar'),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number), _reactDesc.PropTypes.shape({
      color: _utils.colorPropType,
      label: _reactDesc.PropTypes.string,
      // for accessibility of bars and points
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.number]),
      thickness: thicknessType,
      value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number.isRequired, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).isRequired]).isRequired
    })])).description("Array of value objects describing the data.\n      'value' is a tuple indicating the coordinate of the value or a triple\n      indicating the x coordinate and a range of two y coordinates.\n      'label' is a text string describing it.\n      'onHover' and 'onClick' only work when type='bar'.\n      'color', 'opacity', and 'thickness' allow bar and point charts to have\n      color variation per-value.").isRequired
  });
  return DocumentedChart;
};

exports.doc = doc;

var docCalcs = function docCalcs(calcs) {
  var DocumentedCalcs = (0, _reactDesc.describe)(calcs).description("\n      A function to help calculate values for bounds and axis. Use it via:\n      const data = calcs(<myValues>, { coarseness: 5, steps: [1, 1] });\n      where 'data' will contain 'bounds' and 'axis' properties.\n    ").usage("import { calcs } from 'grommet';\nconst data = calcs(<values>, { coarseness: 5, steps: [1, 1] });");
  return DocumentedCalcs;
};

exports.docCalcs = docCalcs;
var themeDoc = {
  'chart.color': {
    description: 'Color of the Chart.',
    type: 'string | {dark: string, light: string}',
    defaultValue: 'accent-1'
  },
  'chart.extend': {
    description: 'Any additional style for the Chart.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.colors': {
    description: 'Color options.',
    type: 'object',
    defaultValue: "{\n      \"accent-1\": \"#6FFFB0\",\n      \"graph-0\": \"accent-1\",\n      ...\n    }"
  },
  'global.edgeSize': {
    description: 'The possible sizes for the thickness in the Chart.',
    type: 'object',
    defaultValue: "{\n        none: '0px',\n        hair: '1px',\n        xxsmall: '3px',\n        xsmall: '6px',\n        small: '12px',\n        medium: '24px',\n        large: '48px',\n        xlarge: '96px',\n        responsiveBreakpoint: 'small',\n    }"
  },
  'global.opacity': {
    description: 'The opacity of the Chart stroke.',
    type: 'object',
    defaultValue: "{\n      strong: 0.8,\n      medium: 0.4,\n      weak: 0.1,\n    }"
  },
  'global.size': {
    description: 'The possible sizes for Chart width and height.',
    type: 'object',
    defaultValue: "{\n      xxsmall: '48px',\n      xsmall: '96px',\n      small: '192px',\n      medium: '384px',\n      large: '768px',\n      xlarge: '1152px',\n      xxlarge: '1536px',\n      full: '100%',\n      }"
  }
};
exports.themeDoc = themeDoc;