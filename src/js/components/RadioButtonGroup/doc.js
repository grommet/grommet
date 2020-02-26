import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = RadioButtonGroup => {
  const DocumentedRadioButtonGroup = describe(RadioButtonGroup)
    .availableAt(getAvailableAtBadge('RadioButtonGroup'))
    .description('A group of radio buttons.')
    .usage(
      `import { RadioButtonGroup } from 'grommet';
<RadioButtonGroup />`,
    )
    .intrinsicElement('div');

  DocumentedRadioButtonGroup.propTypes = {
    children: PropTypes.func.description(
      `Function that will be called to render the visual representation.
      It will be passed an object indicating whether the button is checked. It
      should return a react element.
      For example:
      \`children={(option, { checked }) => <Box ...>{...}</Box>}\`
      `,
    ),
    disabled: PropTypes.bool
      .description(`Disables all options.`)
      .defaultValue(false),
    name: PropTypes.string.description(
      `The DOM name attribute value to use for the underlying <input/> 
      elements.`,
    ).isRequired,
    onChange: PropTypes.func.description(
      `Function that will be called when the user clicks on of the radio
      buttons. It will be passed a React event object.`,
    ),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          disabled: PropTypes.bool,
          id: PropTypes.string,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
          value: PropTypes.string.isRequired,
        }),
      ),
    ]).description(`Options can be either a string or an object.`).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).description(`Currently selected option value.`),
  };

  return DocumentedRadioButtonGroup;
};
