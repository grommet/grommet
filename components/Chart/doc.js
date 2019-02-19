"use strict";

exports.__esModule = true;
exports.themeDoc = exports.docCalcs = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Chart) {
  var DocumentedChart = (0, _reactDesc.describe)(Chart).availableAt((0, _utils.getAvailableAtBadge)('Chart')).description('A graphical chart.').usage("import { Chart } from 'grommet';\n<Chart />"); // We don't include svg due to a collision on the values property
  // .intrinsicElement('svg');

  DocumentedChart.propTypes = _extends({}, _utils.genericProps, {
    bounds: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)).description("The limits for the values, specified as a two dimensional array.\n      If not specified, the bounds will automatically be set to fit\n      the provided values."),
    color: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.shape({
      color: _reactDesc.PropTypes.string,
      opacity: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']), _reactDesc.PropTypes.bool])
    })]).description('A color identifier to use for the graphic color.').defaultValue('accent-1'),
    onClick: _reactDesc.PropTypes.func.description("Called when the user clicks on it.\n      This is only available when the type is line or area."),
    onHover: _reactDesc.PropTypes.func.description("Called with a boolean argument\n      indicating when the user hovers onto or away from it.\n      This is only available when the type is line or area."),
    overflow: _reactDesc.PropTypes.bool.description("Whether the chart strokes should overflow the component. Set this\n      to true for precise positioning when stacking charts or including\n      precise axes. Set this to false to have the graphical elements\n      align with the component boundaries.").defaultValue(false),
    round: _reactDesc.PropTypes.bool.description('Whether to round the line ends.').defaultValue(false),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.shape({
      height: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string]),
      width: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description('The size of the Chart.').defaultValue({
      width: 'medium',
      height: 'small'
    }),
    thickness: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), _reactDesc.PropTypes.string]).description('The width of the stroke.').defaultValue('medium'),
    type: _reactDesc.PropTypes.oneOf(['bar', 'line', 'area']).description('The visual type of meter.').defaultValue('bar'),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number), _reactDesc.PropTypes.shape({
      label: _reactDesc.PropTypes.string,
      // for accessibility of bars
      onClick: _reactDesc.PropTypes.func,
      onHover: _reactDesc.PropTypes.func,
      value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number.isRequired, _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).isRequired]).isRequired
    })])).description("Array of value objects describing the data.\n      'value' is a tuple indicating the coordinate of the value or a triple\n      indicating the x coordinate and a range of two y coordinates.\n      'label' is a text string describing it.\n      'onHover' and 'onClick' only work when type='bar'.").isRequired
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
exports.themeDoc = themeDoc;