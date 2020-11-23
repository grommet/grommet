function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getBorderPropType, padPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';
var fixedSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'flex', 'auto'];
var edgeSizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none'];
var BORDER_SHAPE = getBorderPropType({
  includeBetween: false
});
export var doc = function doc(Grid) {
  var DocumentedGrid = describe(Grid).availableAt(getAvailableAtBadge('Grid', 'Layout')).description("A grid system for laying out content. To use, define the\nrows and columns, create area names for adjacent cells, and then\nplace Box components inside those areas using the gridArea property.\nSee https://css-tricks.com/snippets/css/complete-guide-grid/.\nThe availability of Grid can be tested via `Grid.available`. Use this\nto create fallback rendering for older browsers, like ie11.").usage("import { Grid } from 'grommet';\n<Grid />").intrinsicElement('div');
  DocumentedGrid.propTypes = _extends({}, genericProps, {
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align the individual items inside the grid when there is extra\nspace in the column axis.").defaultValue('stretch'),
    alignContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the column axis.'),
    areas: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      start: PropTypes.arrayOf(PropTypes.number),
      end: PropTypes.arrayOf(PropTypes.number)
    })), PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))]).description("Grid areas.\n      Either area names and column,row coordinates.\n      Or, an array of string arrays that specify named grid areas."),
    border: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all']), BORDER_SHAPE, PropTypes.arrayOf(BORDER_SHAPE)]).description("Include a border."),
    columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(fixedSizes), PropTypes.shape({
      count: PropTypes.oneOfType([PropTypes.oneOf(['fit', 'fill']), PropTypes.number]),
      size: PropTypes.oneOfType([PropTypes.oneOf(fixedSizes), PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.string])
    }), PropTypes.string]).description("Column sizes.\n      If an array value is an array, the inner array indicates the\n      minimum and maximum sizes for the column.\n      Specifying a single string will repeat multiple columns\n      of that size, as long as there is room for more.\n      Specifying an object allows indicating how the columns\n      stretch to fit the available space."),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]).description('Whether the width and/or height should fill the container.'),
    gap: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.shape({
      row: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.string]),
      column: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.string])
    }), PropTypes.string]).description('Gap sizes between rows and/or columns.'),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description("How to align the individual items inside the grid when there is extra\nspace in the row axis.").defaultValue('stretch'),
    justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']).description('How to align the contents along the row axis.'),
    pad: padPropType,
    responsive: PropTypes.bool.description("Whether margin and pad sizes should be scaled for mobile\n        environments.").defaultValue(true),
    rows: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(fixedSizes), PropTypes.string]).description("Row sizes.\n      If an array value is an array, the inner array indicates the\n      minimum and maximum sizes for the row.\n      Specifying a single string will cause automatically added rows to be\n      the specified size."),
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("The DOM tag to use for the element. NOTE: This is deprecated\n      in favor of indicating the DOM tag via the 'as' property."),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description('The DOM tag or react component to use for the element.').defaultValue('div')
  });
  return DocumentedGrid;
};
export var themeDoc = _extends({
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
}, themeDocUtils.edgeStyle('The possible sizes for the grid margin and gap.'));