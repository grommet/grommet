import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Distribution) => {
  const DocumentedDistribution = describe(Distribution)
    .availableAt(getAvailableAtBadge('Distribution'))
    .description(`Approximately proportionally sized grid of boxes. The
      area given to each box isn't mathematically precise according to the
      ratio to the total values. Instead, the boxes are laid out in a
      manner that makes them more visually easy to scan. For example,
      two values of 48 and 52 will actually each get 50% of the area.`)
    .usage("import { Distribution } from 'grommet';\n<Distribution />");

  DocumentedDistribution.propTypes = {
    children: PropTypes.func.description(
      'Function that will be called when each value is rendered.'
    ),
    gap: PropTypes.oneOf(
      ['xsmall', 'small', 'medium', 'large', 'xlarge']
    ).description(
      'The amount of spacing between child elements.'
    ),
    values: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number.isRequired,
    })).description(
      `Array of objects containing a value. The caller can put other
      properties in the object. The children function will be called to
      render the contents of each value.`
    ).isRequired,
  };

  return DocumentedDistribution;
};
