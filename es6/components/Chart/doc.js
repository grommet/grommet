function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Chart) {
  var DocumentedChart = describe(Chart).availableAt(getAvailableAtBadge('Chart')).description('A graphical chart.').usage("import { Chart } from 'grommet';\n<Chart />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedChart.propTypes = _extends({}, genericProps, {
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).description("The limits for the values, specified as a two dimensional array.\n      If not specified, the bounds will automatically be set to fit\n      the provided values."),
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
    })]).description('A color identifier to use for the graphic color.').defaultValue('accent-1'),
    onClick: PropTypes.func.description("Called when the user clicks on it.\n      This is only available when the type is line or area."),
    onHover: PropTypes.func.description("Called with a boolean argument\n      indicating when the user hovers onto or away from it.\n      This is only available when the type is line or area."),
    overflow: PropTypes.bool.description("Whether the chart strokes should overflow the component. Set this\n      to true for precise positioning when stacking charts or including\n      precise axes. Set this to false to have the graphical elements\n      align with the component boundaries.").defaultValue(false),
    round: PropTypes.bool.description('Whether to round the line ends.').defaultValue(false),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), PropTypes.string])
    }), PropTypes.string]).description('The size of the Chart.').defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), PropTypes.string]).description('The width of the stroke.').defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'line', 'area']).description('The visual type of meter.').defaultValue('bar'),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number), PropTypes.shape({
      label: PropTypes.string,
      // for accessibility of bars
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.arrayOf(PropTypes.number).isRequired]).isRequired
    })])).description("Array of value objects describing the data.\n      'value' is a tuple indicating the coordinate of the value or a triple\n      indicating the x coordinate and a range of two y coordinates.\n      'label' is a text string describing it.\n      'onHover' and 'onClick' only work when type='bar'.").isRequired
  });
  return DocumentedChart;
};
export var docCalcs = function docCalcs(calcs) {
  var DocumentedCalcs = describe(calcs).description("\n      A function to help calculate values for bounds and axis. Use it via:\n      const data = calcs(<myValues>, { coarseness: 5, steps: [1, 1] });\n      where 'data' will contain 'bounds' and 'axis' properties.\n    ").usage("import { calcs } from 'grommet';\nconst data = calcs(<values>, { coarseness: 5, steps: [1, 1] });");
  return DocumentedCalcs;
};
export var themeDoc = {
  'chart.extend': {
    description: 'Any additional style for the Chart.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.colors': {
    description: 'color options used for Chart fill area.',
    type: 'object',
    defaultValue: 'accent-1'
  },
  'global.edgeSize': {
    description: 'The possible sizes for the thickness in the Chart.',
    type: 'object',
    defaultValue: "{\n        none: '0px',\n        hair: '1px',\n        xxsmall: '3px',\n        xsmall: '6px',\n        small: '12px',\n        medium: '24px',\n        large: '48px',\n        xlarge: '96px',\n        responsiveBreakpoint: 'small',\n    }"
  },
  'global.opacity': {
    description: 'The opacity of the Chart stroke.',
    type: 'string',
    defaultValue: undefined
  },
  'global.size': {
    description: 'The possible sizes for Chart width and height.',
    type: 'object',
    defaultValue: "{\n      xxsmall: '48px',\n      xsmall: '96px',\n      small: '192px',\n      medium: '384px',\n      large: '768px',\n      xlarge: '1152px',\n      xxlarge: '1536px',\n      full: '100%',\n      }"
  }
};