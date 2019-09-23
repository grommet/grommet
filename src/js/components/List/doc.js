import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

const sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
const sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];

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
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).description(
      `Item background. An array value indicates that items should have
      different backgrounds, modulo the array index.`,
    ),
    border: PropTypes.oneOfType([...borderTypes]).description(`Item border.`),
    data: PropTypes.arrayOf(PropTypes.shape({})).description(
      'Array of data objects.',
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
      include a 'datum' property containing the data value associated with
      the clicked item. You should not include interactive elements, like
      Anchor or Button inside item as that can cause confusion with
      overlapping interactive elements.`,
    ),
    pad: PropTypes.oneOfType([
      PropTypes.oneOf(sizes),
      PropTypes.string,
      PropTypes.shape(padShapeSides),
    ]).description(`Item padding.`),
    primaryKey: PropTypes.string.description(
      `When supplied, indicates the property for a data object to use to
      get a unique identifier.`,
    ),
    itemProps: PropTypes.shape({}).description(
      `Item specific background, border, and pad, keyed by data index.
      For example:
      { 27: { background: ..., border: ..., pad: ... }},
      where the background, border, and pad accept the same values as
      the same named properties on List.`,
    ),
    step: PropTypes.number
      .description('How many items to render at a time.')
      .defaultValue(50),
  };

  return DocumentedList;
};

export const themeDoc = {
  'global.hover.background': {
    description: 'The background style when hovering over an interactive row.',
    type: 'string | { color: string, opacity: string }',
    defaultValue: "{ color: 'active', opacity: 'medium' }",
  },
  'global.hover.color': {
    description: 'The text color when hovering over an interactive row.',
    type: 'string | { dark: string, light: string }',
    defaultValue: "{ dark: 'white', light: 'black' }",
  },
  'list.item.hover.background': {
    description: 'The background color when hovering over an interactive item.',
    type: 'string | { color: string, opacity: string }',
  },
  'list.item.hover.color': {
    description: 'The text color when hovering over an interactive item.',
    type: 'string | { dark: string, light: string }',
  },
};
