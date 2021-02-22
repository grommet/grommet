import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Switch => {
  const DocumentedSwitch = describe(Switch)
    .availableAt(getAvailableAtBadge('Switch'))
    .description(
      'A control to select values, with customized radiobutton group.')
    .usage(
      `import { Switch } from 'mnet-ui-base';
      <Switch />`,
    );
  // We don't include svg due to a collision on the values property
  // .intrinsicElement('select');

  DocumentedSwitch.propTypes = {
    ...genericProps,
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.object,
        ]),
      ),
    ])
      .description(
        `Whether the entire select or individual options should be disabled.
        An array of numbers indicates the indexes into 'options' of the
        disabled options. An array of strings or objects work the same way
        as the 'value' to indicate which options are disabled.`,
      )
      .defaultValue(false),

    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).description(
      `The selected current value of the component`,
    ),

    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).description(
      `The list of options for Switch`,
    ),

    onValueChange: PropTypes.func.description(
      `Change event is handled here`,
    ),
    
  };

  return DocumentedSwitch;
};
