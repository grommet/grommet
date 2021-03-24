function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, padPropType } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
var sizes = ['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right', 'start', 'end'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = PropTypes.oneOf(sizes);
});
var borderTypes = [PropTypes.bool, PropTypes.oneOf(sides), PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(sides),
  size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])
})];
export var doc = function doc(List) {
  var DocumentedList = describe(List).availableAt(getAvailableAtBadge('List', 'Visualizations')).description('An ordered list of items.').usage("import { List } from 'grommet';\n<List data={[...]} />").intrinsicElement('ol');
  DocumentedList.propTypes = _extends({}, genericProps, {
    action: PropTypes.func.description("Accepts a function that allows for a custom rendering\n       of a component, it should be passed with an item and\n        index of an array and return a react element\n      'action = ({item, index}) => <Content />'"),
    as: PropTypes.string.description('The DOM tag or react component to use for the element.').defaultValue('ul'),
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).description("Item background. An array value indicates that items should have\n      different backgrounds, modulo the array index."),
    border: PropTypes.oneOfType(borderTypes).description("Item border."),
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])).description('Array of data objects.'),
    children: PropTypes.func.description("Function that will be called when each data item is rendered.\n      It will be passed three arguments, the individual data item, its index,\n      and an object indicating the state of the item, if any. It\n      should return a react element.\n      For example:\n      'children={(item, index, { active }) => <Box ...>{...}</Box>}'"),
    itemProps: PropTypes.shape({}).description("Item specific background, border, and pad, keyed by data index.\n      For example:\n      { 27: { background: ..., border: ..., pad: ... }},\n      where the background, border, and pad accept the same values as\n      the same named properties on List."),
    onMore: PropTypes.func.description("Use this to indicate that 'data' doesn't contain all that it could.\n      It will be called when all of the data items have been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed."),
    onClickItem: PropTypes.func.description("When supplied, this function will be called with an event object that\n      include a 'item' property containing the data value associated with\n      the clicked item and an 'index' property containing the index in 'data'\n      of the clicked item. You should not include interactive elements, like\n      Anchor or Button inside 'primaryKey' or 'secondaryKey' as that can\n      cause confusion with overlapping interactive elements."),
    pad: PropTypes.oneOfType([padPropType]).description("Item padding."),
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).description("Whether to paginate the data. If providing an object, any Box props or \n    Pagination props are valid and will be used to style the underlying \n    pagination component.").defaultValue(undefined),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("When a string is supplied, it indicates the property in a data item\n      object to use to get the primary content. If a function is supplied, it\n      will be called with the current data item object and should return\n      a React element that will be rendered as the primary content."),
    secondaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).description("When a string is supplied, it indicates the property in a data item\n      object to use to get the secondary content. If a function is supplied, it\n      will be called with the current data item object and should return\n      a React element that will be rendered as the secondary content."),
    show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
      page: PropTypes.number
    })]).description("If provided as a number, the index of an item to show. If using \n        paginate and provided as an object in the format of show={{ page: 2 }}, \n        the default page to show.").defaultValue(undefined),
    step: PropTypes.number.description('How many items to render at a time.').defaultValue(50)
  });
  return DocumentedList;
};
export var themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering over an interactive item.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }"
  },
  'global.hover.color': {
    description: 'The text color when hovering over an interactive item.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }"
  },
  'list.container': {
    description: "When using paginate, any valid Box props for the container \n    surrounding the List and Pagination components.",
    type: 'object',
    defaultValue: "{ gap: 'small' }"
  },
  'list.container.extend': {
    description: "Any additional style for the container \n    surrounding the List and Pagination components.",
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'list.extend': {
    description: 'Any additional style for the list.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'list.item.background': {
    description: 'Background color for list items.',
    type: 'string | [string]',
    defaultValue: undefined
  },
  'list.item.border': {
    description: 'Border for list items.',
    type: 'boolean | string | object',
    defaultValue: 'horizontal'
  },
  'list.item.pad': {
    description: 'Border for list items.',
    type: 'boolean | string | object',
    defaultValue: "{ horizontal: 'medium', vertical: 'small' }"
  },
  'list.item.extend': {
    description: 'Any additional style for the list items.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};