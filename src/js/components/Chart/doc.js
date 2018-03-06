import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Chart) => {
  const DocumentedChart = describe(Chart)
    .availableAt(getAvailableAtBadge('Chart'))
    .description('A graphical chart.')
    .usage("import { Chart } from 'grommet';\n<Chart />");

  DocumentedChart.propTypes = {
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).description(
      `The limits for the values, specified as a two dimensional array.
      If not specified, the bounds will automatically be set to fit
      the provided values.`
    ),
    color: PropTypes.string.description(
      'A color identifier to use for the graphic color.'
    ).defaultValue('accent-1'),
    onClick: PropTypes.func.description(`Called when the user clicks on it.
      This is only available when the type is line or area.`),
    onHover: PropTypes.func.description(`Called with a boolean argument
      indicating when the user hovers onto or away from it.
      This is only available when the type is line or area.`),
    round: PropTypes.bool.description('Whether to round the line ends.'),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(
        ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      PropTypes.shape({
        height: PropTypes.oneOf(
          ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
        width: PropTypes.oneOf(
          ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']),
      }),
    ]).description(
      'The size of the Chart.'
    ).defaultValue({ width: 'medium', height: 'small' }),
    thickness: PropTypes.oneOf([
      'xsmall', 'small', 'medium', 'large', 'xlarge', 'none',
    ]).description(
      'The width of the stroke.'
    ).defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'line', 'area']).description(
      'The visual type of meter.'
    ).defaultValue('bar'),
    values: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string, // for accessibility of bars
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.arrayOf(PropTypes.number).isRequired,
    })).description(
      `Array of value objects describing the data.
      'value' is a tuple indicating the coordinate of the value or a triple
      indicating the x coordinate and a range of two y coordinates.
      'label' is a text string describing it.
      'onHover' and 'onClick' only work when type='bar'.`
    ).isRequired,
  };

  return DocumentedChart;
};
