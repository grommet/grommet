import { describe, PropTypes } from 'react-desc';

import { colorPropType, genericProps } from '../../utils/prop-types';
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
    defaultPage: PropTypes.number
      .description('The default active page.')
      .defaultValue(1),
    edgeCount: PropTypes.number
      .description(
        'The number of visible pages at the start and end of page range.',
      )
      .defaultValue(1),
    middleCount: PropTypes.number
      .description(
        `The number of visible pages on either side of the current page.`,
      )
      .defaultValue(true),
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
    totalPages: PropTypes.number
      .description('The total number of pages.')
      .defaultValue(undefined),
  };

  return DocumentedPagination;
};

export const themeDoc = {
  pagination: {
    description: `The possible sizes of the Pagination in terms of its max-width,
     font-size and line-height.`,
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
