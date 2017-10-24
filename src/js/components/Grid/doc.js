import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../utils';

const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge',
  'full', '1/2', '1/3', '2/3', '1/4', '3/4', 'flex'];
const edgeSizes = ['small', 'medium', 'large', 'none'];

export default (Grid) => {
  const DocumentedGrid = describe(Grid)
    .availableAt(getAvailableAtBadge('Grid'))
    .description(
      `A grid system for laying out content. To use, define the
rows and columns, create area names for adjacent cells, and then
place Box components inside those areas using the Box.gridArea property.
See https://css-tricks.com/snippets/css/complete-guide-grid/.`
    ).usage(
      `import { Grid } from 'grommet';
<Grid />`
    );

  DocumentedGrid.propTypes = {
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description(
      `How to align the individual items inside the grid when there is extra
space in the column axis.`
    ).defaultValue('stretch'),
    alignContent: PropTypes.oneOf(
      ['start', 'center', 'end', 'between', 'around', 'stretch']
    ).description('How to align the contents along the column axis.'),
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        start: PropTypes.arrayOf(PropTypes.number),
        end: PropTypes.arrayOf(PropTypes.number),
      }),
    ).description('Area names and column,row coordinates.'),
    columns: PropTypes.arrayOf(PropTypes.oneOf(sizes)).description('Column sizes.'),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf(edgeSizes),
      PropTypes.shape({
        horizontal: PropTypes.oneOf(edgeSizes),
        vertical: PropTypes.oneOf(edgeSizes),
      }),
    ]).description(
      'Gap sizes between rows and/or columns.'
    ),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'stretch']).description(
      `How to align the individual items inside the grid when there is extra
space in the row axis.`
    ).defaultValue('stretch'),
    justifyContent: PropTypes.oneOf(
      ['start', 'center', 'end', 'between', 'around', 'stretch']
    ).description('How to align the contents along the row axis.'),
    rows: PropTypes.arrayOf(PropTypes.oneOf(sizes)).description('Row sizes.'),
    tag: PropTypes.string.description(
      'The DOM tag to use for the element.'
    ).defaultValue('div'),
  };

  return DocumentedGrid;
};
