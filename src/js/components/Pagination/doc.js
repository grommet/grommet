import { describe, PropTypes } from 'react-desc';

import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Pagination => {
  const DocumentedPagination = describe(Pagination)
    .availableAt(getAvailableAtBadge('Pagination', 'Controls'))
    .description(
      `A control that enables selection of a single page from a 
      range of pages.`,
    )
    .usage(
      `import { Pagination } from 'grommet';
      <Pagination />`,
    )
    .intrinsicElement('nav');

  DocumentedPagination.propTypes = {
    ...genericProps,
    numberEdgePages: PropTypes.number
      .description(
        `The number of pagination buttons visible at the start and end of page 
        range.`,
      )
      .defaultValue(1),
    numberItems: PropTypes.number
      .description('The total number of items to paginate.')
      .defaultValue(undefined),
    numberMiddlePages: PropTypes.number
      .description(
        `The number of pagination buttons visible in the middle of the 
        controls.`,
      )
      .defaultValue(3),
    onChange: PropTypes.func
      .description(
        `Function called when the user clicks a page or arrow button. The 
        single argument is an event containing the target page via 
        \`event.page\`, and the startIndex and endIndex for items contained 
        in the target page via \`event.startIndex\` and \`event.endIndex\`, 
        respectively.`,
      )
      .defaultValue(undefined),
    page: PropTypes.number
      .description(
        `The default page. If used with onChange, it can be used to control the 
        active page via state.`,
      )
      .defaultValue(undefined),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
      .description(
        'Specifies what size the pagination control buttons should be.',
      )
      .defaultValue('medium'),
    step: PropTypes.number
      .description('The number of items per page.')
      .defaultValue(10),
  };

  return DocumentedPagination;
};

export const themeDoc = {
  'pagination.button': {
    description: 'Any valid Button theming to apply on the pagination buttons.',
    type: 'object',
    defaultValue: `{
      active: {
        background: {
          color: 'active-background',
        },
      },
      color: 'text-strong',
      hover: {
        background: {
          color: 'background-contrast',
        },
        color: undefined,
      },
      size: {
        small: {
          border: {
            radius: 3px,
            width: 2px,
          },
          pad: {
            vertical: 4px,
            horizontal: 4px,
          },
          font: 14px,
          height: 30px,
          width: 30px,
        },
        medium: {
          border: {
            radius: 4px,
            width: 2px,
          },
          pad: {
            vertical: 4px,
            horizontal: 4px,
          },
          font: 18px,
          height: 36px,
          width: 36px,
        },
        large: {
          border: {
            radius: 6px,
            width: 2px,
          },
          pad: {
            vertical: 4px,
            horizontal: 4px,
          },
          font: 22px,
          height: 48px,
          width: 48px,
        },
      },
    }`,
  },
  'pagination.container': {
    description: `Any valid Box props for the Box wrapping the 
    pagination controls.`,
    type: 'object',
  },
  'pagination.container.extend': {
    description: `Any additional style for the Box wrapping 
    the pagination controls.`,
    type: 'string | (props) => {}',
  },
  'pagination.controls.align': {
    description: `How the pagination controls should be aligned 
    within the containing Box.`,
    type: 'string',
    defaultValue: 'center',
  },
  'pagination.controls.direction': {
    description: `Direction in which the containing Box should 
    display the pagination controls.`,
    type: 'string',
    defaultValue: 'row',
  },
  'pagination.controls.gap': {
    description: `Amount of gap spacing between each control.`,
    type: 'string',
    defaultValue: 'xxsmall',
  },
  'pagination.controls.margin': {
    description: `Amount of margin surrounding the controls.`,
    type: 'string',
    defaultValue: 'none',
  },
  'pagination.controls.pad': {
    description: `Amount of pad surrounding the controls.`,
    type: 'string',
    defaultValue: 'none',
  },
  'pagination.icons.color': {
    description: `The color used for the icon.`,
    type: 'string | { dark: string, light: string }',
  },
  'pagination.icons.next': {
    description: `Icon to use as the 'next page' control.`,
    type: 'element',
    defaultValue: '<Next />',
  },
  'pagination.icons.previous': {
    description: `Icon to use as the 'previous page' control.`,
    type: 'element',
    defaultValue: '<Previous />',
  },
};
