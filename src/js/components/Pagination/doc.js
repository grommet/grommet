import { describe, PropTypes } from 'react-desc';

import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Pagination => {
  const DocumentedPagination = describe(Pagination)
    .availableAt(getAvailableAtBadge('Pagination'))
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
  'pagination.button.active.background.color': {
    description: `Background color when the button is active.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'active-background',
  },
  'pagination.button.color': {
    description: `The color of the text label.`,
    type: 'string | { dark: string, light: string }',
    defaultValue: 'text-strong',
  },
  'pagination.button.hover.background.color': {
    description: 'Background color of the button when hovered.',
    type: 'string | { dark: string, light: string }',
    defaultValue: 'background-contrast',
  },
  'pagination.button.hover.color': {
    description: 'The color of the text label when hovered.',
    type: 'string | { dark: string, light: string }',
    defaultValue: undefined,
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
  'pagination.control.extend': {
    description: `Any additional style for each control.`,
    type: 'string | (props) => {}',
  },
  'pagination.control.pad': {
    description: `Padding around each control's label.`,
    type: 'string | object',
    defaultValue: '4px',
  },
  'pagination.control.size.small.border.radius': {
    description: `Rounding of the corners for each control.`,
    type: 'string',
    defaultValue: '3px',
  },
  'pagination.control.size.small.border.width': {
    description: `Border thickness for each control.`,
    type: 'string',
    defaultValue: '2px',
  },
  'pagination.control.size.small.font.size': {
    description: `The font size of each control's label.`,
    type: 'string',
    defaultValue: '14px',
  },
  'pagination.control.size.small.font.height': {
    description: `The line-height of each control's label.`,
    type: 'string',
    defaultValue: '20px',
  },
  'pagination.control.size.small.height': {
    description: `The height for each control.`,
    type: 'string',
    defaultValue: '30px',
  },
  'pagination.control.size.small.width': {
    description: `The minimum width for each control. 
    Width will scale up fitting the control's label.`,
    type: 'string',
    defaultValue: '30px',
  },
  'pagination.control.size.medium.border.radius': {
    description: `Rounding of the corners for each control.`,
    type: 'string',
    defaultValue: '4px',
  },
  'pagination.control.size.medium.border.width': {
    description: `Border thickness for each control.`,
    type: 'string',
    defaultValue: '2px',
  },
  'pagination.control.size.medium.font.size': {
    description: `The font size of each control's label.`,
    type: 'string',
    defaultValue: '18px',
  },
  'pagination.control.size.medium.font.height': {
    description: `The line-height of each control's label.`,
    type: 'string',
    defaultValue: '24px',
  },
  'pagination.control.size.medium.height': {
    description: `The height for each control.`,
    type: 'string',
    defaultValue: '36px',
  },
  'pagination.control.size.medium.width': {
    description: `The minimum width for each control. 
    Width will scale up fitting the control's label.`,
    type: 'string',
    defaultValue: '36px',
  },
  'pagination.control.size.large.border.radius': {
    description: `Rounding of the corners for each control.`,
    type: 'string',
    defaultValue: '4px',
  },
  'pagination.control.size.large.border.width': {
    description: `Border thickness for each control.`,
    type: 'string',
    defaultValue: '6px',
  },
  'pagination.control.size.large.font.size': {
    description: `The font size of each control's label.`,
    type: 'string',
    defaultValue: '22px',
  },
  'pagination.control.size.large.font.height': {
    description: `The line-height of each control's label.`,
    type: 'string',
    defaultValue: '28px',
  },
  'pagination.control.size.large.height': {
    description: `The height for each control.`,
    type: 'string',
    defaultValue: '48px',
  },
  'pagination.control.size.large.width': {
    description: `The minimum width for each control. 
    Width will scale up fitting the control's label.`,
    type: 'string',
    defaultValue: '48px',
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
