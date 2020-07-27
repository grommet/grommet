import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

const sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
const sides = [
  'horizontal',
  'vertical',
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'end',
];

const padShapeSides = {};
sides.forEach(side => {
  padShapeSides[side] = PropTypes.oneOf(sizes);
});

const borderTypes = [
  PropTypes.bool,
  PropTypes.oneOf(sides),
  PropTypes.shape({
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string,
      }),
    ]),
    side: PropTypes.oneOf(sides),
    size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string]),
  }),
];

export const doc = List => {
  const DocumentedList = describe(List)
    .availableAt(getAvailableAtBadge('List'))
    .description('An ordered list of items.')
    .usage(
      `import { List } from 'grommet';
<List data={[...]} />`,
    )
    .intrinsicElement('ol');

  DocumentedList.propTypes = {
    ...genericProps,
    as: PropTypes.string
      .description('The DOM tag or react component to use for the element.')
      .defaultValue('ul'),
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).description(
      `Item background. An array value indicates that items should have
      different backgrounds, modulo the array index.`,
    ),
    border: PropTypes.oneOfType(borderTypes).description(`Item border.`),
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    ).description('Array of data objects.'),
    children: PropTypes.func.description(
      `Function that will be called when each data item is rendered.
      It will be passed three arguments, the individual data item, its index,
      and an object indicating the state of the item, if any. It
      should return a react element.
      For example:
      \`children={(item, index, { active }) => <Box ...>{...}</Box>}\`
      `,
    ),
    itemProps: PropTypes.shape({}).description(
      `Item specific background, border, and pad, keyed by data index.
      For example:
      { 27: { background: ..., border: ..., pad: ... }},
      where the background, border, and pad accept the same values as
      the same named properties on List.`,
    ),
    onMore: PropTypes.func.description(
      `Use this to indicate that 'data' doesn't contain all that it could.
      It will be called when all of the data items have been rendered.
      This might be used when the total number of items that could be retrieved
      is more than you'd want to load into the browser. 'onMore' allows you
      to lazily fetch more from the server only when needed.`,
    ),
    onClickItem: PropTypes.func.description(
      `When supplied, this function will be called with an event object that
      include a 'item' property containing the data value associated with
      the clicked item and an 'index' property containing the index in 'data'
      of the clicked item. You should not include interactive elements, like
      Anchor or Button inside 'primaryKey' or 'secondaryKey' as that can
      cause confusion with overlapping interactive elements.`,
    ),
    pad: PropTypes.oneOfType([
      PropTypes.oneOf(sizes),
      PropTypes.string,
      PropTypes.shape(padShapeSides),
    ]).description(`Item padding.`),
    primaryKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).description(
      `When a string is supplied, it indicates the property in a data item
      object to use to get the primary content. If a function is supplied, it
      will be called with the current data item object and should return
      a React element that will be rendered as the primary content.`,
    ),
    secondaryKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).description(
      `When a string is supplied, it indicates the property in a data item
      object to use to get the secondary content. If a function is supplied, it
      will be called with the current data item object and should return
      a React element that will be rendered as the secondary content.`,
    ),
    step: PropTypes.number
      .description('How many items to render at a time.')
      .defaultValue(50),
  };

  return DocumentedList;
};

export const themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering over an interactive item.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }",
  },
  'global.hover.color': {
    description: 'The text color when hovering over an interactive item.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }",
  },
  'list.extend': {
    description: 'Any additional style for the list.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'list.item.background': {
    description: 'Background color for list items.',
    type: 'string | [string]',
    defaultValue: undefined,
  },
  'list.item.border': {
    description: 'Border for list items.',
    type: 'boolean | string | object',
    defaultValue: 'horizontal',
  },
  'list.item.pad': {
    description: 'Border for list items.',
    type: 'boolean | string | object',
    defaultValue: "{ horizontal: 'medium', vertical: 'small' }",
  },
  'list.item.extend': {
    description: 'Any additional style for the list items.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
