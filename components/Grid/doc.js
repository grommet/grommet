"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var fixedSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'flex', 'auto'];
var edgeSizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none'];

var doc = function doc(Grid) {
  var DocumentedGrid = (0, _reactDesc.describe)(Grid).availableAt((0, _utils.getAvailableAtBadge)('Grid')).description("A grid system for laying out content. To use, define the\nrows and columns, create area names for adjacent cells, and then\nplace Box components inside those areas using the gridArea property.\nSee https://css-tricks.com/snippets/css/complete-guide-grid/.\nThe availability of Grid can be tested via `Grid.available`. Use this\nto create fallback rendering for older browsers, like ie11.").usage("import { Grid } from 'grommet';\n<Grid />").intrinsicElement('div');
  DocumentedGrid.propTypes = _extends({}, _utils.genericProps, {
    align: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align the individual items inside the grid when there is extra\nspace in the column axis.").defaultValue('stretch'),
    alignContent: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the column axis.'),
    areas: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      name: _reactDesc.PropTypes.string,
      start: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number),
      end: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number)
    })), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string))]).description("Grid areas.\n      Either area names and column,row coordinates.\n      Or, an array of string arrays that specify named grid areas."),
    columns: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(sizes), _reactDesc.PropTypes.string])), _reactDesc.PropTypes.oneOf(sizes), _reactDesc.PropTypes.string])), _reactDesc.PropTypes.oneOf(fixedSizes), _reactDesc.PropTypes.shape({
      count: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['fit', 'fill']), _reactDesc.PropTypes.number]),
      size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(fixedSizes), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOf(sizes)), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description("Column sizes.\n      If an array value is an array, the inner array indicates the\n      minimum and maximum sizes for the column.\n      Specifying a single string will repeat multiple columns\n      of that size, as long as there is room for more.\n      Specifying an object allows indicating how the columns\n      stretch to fit the available space."),
    fill: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['horizontal', 'vertical']), _reactDesc.PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    gap: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(edgeSizes), _reactDesc.PropTypes.shape({
      row: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(edgeSizes), _reactDesc.PropTypes.string]),
      column: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(edgeSizes), _reactDesc.PropTypes.string])
    }), _reactDesc.PropTypes.string]).description('Gap sizes between rows and/or columns.'),
    justify: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align the individual items inside the grid when there is extra\nspace in the row axis.").defaultValue('stretch'),
    justifyContent: _reactDesc.PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the row axis.'),
    pad: _utils.padPropType,
    responsive: _reactDesc.PropTypes.bool.description("Whether margin and pad sizes should be scaled for mobile\n        environments.").defaultValue(true),
    rows: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(sizes), _reactDesc.PropTypes.string])), _reactDesc.PropTypes.oneOf(sizes), _reactDesc.PropTypes.string])), _reactDesc.PropTypes.oneOf(fixedSizes), _reactDesc.PropTypes.string]).description("Row sizes.\n      If an array value is an array, the inner array indicates the\n      minimum and maximum sizes for the row.\n      Specifying a single string will cause automatically added rows to be\n      the specified size."),
    tag: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description("The DOM tag to use for the element. NOTE: This is deprecated\n      in favor of indicating the DOM tag via the 'as' property."),
    as: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.func]).description('The DOM tag or react component to use for the element.').defaultValue('div')
  });
  return DocumentedGrid;
};

exports.doc = doc;

var themeDoc = _extends({
  'global.size': {
    description: 'The possible sizes for row and column.',
    type: 'object',
    defaultValue: "{\n      xxsmall: '48px',\n      xsmall: '96px',\n      small: '192px',\n      medium: '384px',\n      large: '768px',\n      xlarge: '1152px',\n      xxlarge: '1536px',\n      full: '100%',\n    }"
  },
  'grid.extend': {
    description: 'Any additional style for the Grid.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
}, _utils.themeDocUtils.edgeStyle('The possible sizes for the grid margin and gap.'));

exports.themeDoc = themeDoc;