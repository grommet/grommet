import { describe, PropTypes } from 'react-desc';

export default (Meter) => {
  const DocumentedMeter = describe(Meter).description('A graphical meter.').usage(
    `import { Meter } from 'grommet';
    <Meter/>`
  );

  DocumentedMeter.propTypes = {
    background: PropTypes.string.description(
      `A color identifier to use for the background color. For example:
      'light-1'.`
    ),
    round: PropTypes.bool.description('Whether to round the line ends'),
    size: PropTypes.oneOf(
      ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full']
    ).description('The size of the Meter.').defaultValue('medium'),
    thickness: PropTypes.oneOf(
      ['xsmall', 'small', 'medium', 'large', 'xlarge']
    ).description(
      'The size of the Meter.'
    ).defaultValue('medium'),
    type: PropTypes.oneOf(['bar', 'circle']).description('The visual type of meter.'),
    values: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      highlight: PropTypes.bool,
      label: PropTypes.string.isRequired, // for accessibility
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      value: PropTypes.number.isRequired,
    })).description(
      `Array of value objects describing the data.
      'value' is the actual numeric value.
      'label' is a text string describing it.
      'color' indicates the color name to use. If not specified a default one
      will be chosen.
      'onClick' will be called when the user clicks on it.
      Set 'highlight' to call attention to it.
      'onHover' will be called with a boolean argument indicating when the
      user hovers onto or away from it.`
    ),
  };

  return DocumentedMeter;
};
