import { describe, PropTypes } from 'react-desc';

import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';

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
    children: PropTypes.func.description(
      `Function that will be called when each item is rendered. It will be
      called with three arguments, the item to render, the index of the item,
      and a boolean value indicating if the child is active. For example:
      {(item, index, { active }) => <li key={index}>{item}</li>}`,
    ),
    items: PropTypes.arrayOf(PropTypes.any).description(
      'The children callback will be called to render each item.',
    ),
    numEdgePages: PropTypes.number
      .description(
        `The number of page buttons visible at the start and end of page 
        range.`,
      )
      .defaultValue(1),
    numMiddlePages: PropTypes.number
      .description(
        `The number of page buttons visible on each side of the active page 
        button.`,
      )
      .defaultValue(1),
    onChange: PropTypes.func
      .description(
        `Function that will be called when the user clicks a page or 
      arrow button. It will be passed a React event object. The current page 
      can be accessed via event.page.`,
      )
      .defaultValue(undefined),
    page: PropTypes.number
      .description('The current page.')
      .defaultValue(undefined),
    show: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ item: PropTypes.number }),
    ])
      .description(
        `If provided as a number, the default page to show. If provided as an 
        object in the format of show={{ item: 2 }}, the default item to show.`,
      )
      .defaultValue(1),
    showFirst: PropTypes.bool
      .description('Whether a jump to first page button is visible.')
      .defaultValue(undefined),
    showLast: PropTypes.bool
      .description('Whether a jump to last page button is visible.')
      .defaultValue(undefined),
    step: PropTypes.number
      .description('The number of items per page.')
      .defaultValue(10),
  };

  return DocumentedPagination;
};

export const themeDoc = {
  pagination: {
    description: `The possible sizes of the Pagination in terms of its 
      max-width, font-size and line-height.`,
    type: 'object',
    defaultValue: `{
      small: {
        size: '14px',
        height: '20px',
        maxWidth: '336px',
       },
      medium: {
        size: '18px',
        height: '24px',
        maxWidth: '432px',
      },
      large: {
        size: '22px',
        height: '28px',
        maxWidth: '528px',
      },
      xlarge: {
        size: '26px',
        height: '32px',
        maxWidth: '624px',
      },
      xxlarge: {
        size: '34px',
        height: '40px',
        maxWidth: '816px',
      },
    }`,
  },
  'pagination.extend': {
    description: 'Any additional style for the Pagination.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  ...themeDocUtils.edgeStyle('The possible sizes for margin.'),
};
