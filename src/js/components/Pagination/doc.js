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
    numberEdgePages: PropTypes.number
      .description(
        `The number of page buttons visible at the start and end of page 
        range.`,
      )
      .defaultValue(1),
    numberItems: PropTypes.number
      .description('The number of items to paginate.')
      .defaultValue(undefined),
    numberMiddlePages: PropTypes.number
      .description(
        `The number of page buttons visible in the middle of the controls.`,
      )
      .defaultValue(3),
    onChange: PropTypes.func
      .description(
        `Function that will be called when the user clicks a page or 
        arrow button. The single argument is an event containing the latest 
        page via \`event.page\`, and the startIndex and endIndex for data on 
        this page via \`event.startIndex\` and \`event.endIndex\`, 
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
