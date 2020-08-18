function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { colorPropType, genericProps, getAvailableAtBadge, padPropType, pointPropType } from '../../utils';
var thicknessType = PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), PropTypes.string, PropTypes.number]);
export var doc = function doc(Chart) {
  var DocumentedChart = describe(Chart).availableAt(getAvailableAtBadge('Chart')).description('A graphical chart.').usage("import { Chart } from 'grommet';\n<Chart />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedChart.propTypes = _extends({}, genericProps, {
    animate: PropTypes.bool.description('Whether to animate drawing.'),
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).description("The limits for the values, specified as a two dimensional array. \n      The first array specifies the limits of the x-axis. The second array \n      specifies the limits of the y-axis. \n      For example: [[x-min, x-max], [y-min, y-max]].\n      If not specified, the bounds will automatically be set to fit\n      the provided values."),
    color: PropTypes.oneOfType([colorPropType, PropTypes.shape({
      color: colorPropType,
      // deprecated, use top level 'opacity'
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
    }), PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      value: PropTypes.number
    }))]).description("A color identifier to use for the graphic color. If an\n      array is specified, it is used to create a gradient mask. Array objects\n      indicate what color to show at what value. In the simplest case, the\n      values should map to the Y bounds values, resulting in a vertical\n      gradient. Specifying more objects allows more fine grained control over\n      where the gradient colors change.").defaultValue('accent-1'),
    id: PropTypes.string.description("A unique identifier for the Chart. This\n      is required if more than one Chart is shown and they use color\n      gradients."),
    dash: PropTypes.bool.description("Whether to use dashed lines for line or bar charts.").defaultValue(false),
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]).description("The amount of spacing between data points. This\n      is only used when the size specifies width as 'auto'."),
    onClick: PropTypes.func.description("Called when the user clicks on the\n     visualization. Clicking on individual bars or points are handled via\n     values[].onClick for those types of charts."),
    onHover: PropTypes.func.description("Called with a boolean argument\n      indicating when the user hovers onto or away from it.\n      This is only available when the type is line or area."),
    opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool]).description("What opacity to apply to the visuals. Supercedes 'color.opacity'"),
    overflow: PropTypes.bool.description("Whether the chart strokes should overflow the component. Set this\n      to true for precise positioning when stacking charts or including\n      precise axes. Set this to false to have the graphical elements\n      align with the component boundaries.").defaultValue(false),
    pad: padPropType.description("Spacing around the outer edge of the drawing coordinate area.\n      Related to 'overflow', this allows control over how much space\n      is available for bars and points to overflow into."),
    point: pointPropType.description("When using a 'point' type, what shape the points should use.\n      If this property is not specified, points will be drawn as a square or\n      a circle, based on how 'round' is specified."),
    round: PropTypes.bool.description('Whether to round the line ends.').defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full', 'auto']), PropTypes.string])
    }), PropTypes.string]).description("The size of the Chart.\n      'full' is deprecated as 'fill' is more consistent with how that term is\n      used elsewhere.").defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: thicknessType.description('The width of the stroke.').defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'line', 'area', 'point']).description('The visual type of chart.').defaultValue('bar'),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number), PropTypes.shape({
      color: colorPropType,
      label: PropTypes.string,
      // for accessibility of bars and points
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      thickness: thicknessType,
      value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.arrayOf(PropTypes.number).isRequired]).isRequired
    })])).description("Array of value objects describing the data.\n      'value' is a tuple indicating the coordinate of the value or a triple\n      indicating the x coordinate and a range of two y coordinates.\n      'label' is a text string describing it.\n      'onHover' and 'onClick' only work when type='bar'.\n      'color', 'opacity', and 'thickness' allow bar and point charts to have\n      color variation per-value.").isRequired
  });
  return DocumentedChart;
};
export var docCalcs = function docCalcs(calcs) {
  var DocumentedCalcs = describe(calcs).description("\n      A function to help calculate values for bounds and axis. Use it via:\n      const data = calcs(<myValues>, { coarseness: 5, steps: [1, 1] });\n      where 'data' will contain 'bounds' and 'axis' properties.\n    ").usage("import { calcs } from 'grommet';\nconst data = calcs(<values>, { coarseness: 5, steps: [1, 1] });");
  return DocumentedCalcs;
};
export var themeDoc = {
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