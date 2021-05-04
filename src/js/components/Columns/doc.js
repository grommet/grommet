import { describe, PropTypes } from 'react-desc';

import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

const widthSizes = PropTypes.oneOfType([
  PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  PropTypes.string,
]);

export const doc = Columns => {
  const DocumentedColumns = describe(Columns)
    .availableAt(getAvailableAtBadge('Columns', 'Layout'))
    .description(
      `
      Responsive single or multiple column layout.
      Control visibity of children via <Columns.ControlButton child={0} />.
    `,
    )
    .usage(
      `import { Columns } from 'grommet';
<Columns />`,
    )
    .intrinsicElement('div');

  DocumentedColumns.propTypes = {
    ...genericProps, // default margin is { horizontal: 'medium' }
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        hide: PropTypes.bool,
        layer: PropTypes.bool,
        responsive: PropTypes.shape({
          hide: PropTypes.bool,
          layer: PropTypes.bool,
        }),
        width: widthSizes,
      }),
    ).description(`
      How each child should be handled.
      'hide'
        true - indicates that the child should be hidden on initial render
        false - indicates that the child shouldn't be hideable,
      'layer' indicates that the child should be shown in a layer.
      'width' indicates that the child should have a fixed width.
      'responsive' indicates how the child should behave when the responsive
      size is small.
      Control visibility of children via <Columns.ControlButton child={0} />.
    `),
    width: widthSizes.description(`Maximum width of the content.`),
  };

  return DocumentedColumns;
};
