import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = CheckBoxGroup => {
  const DocumentedCheckBoxGroup = describe(CheckBoxGroup)
    .availableAt(getAvailableAtBadge('CheckBoxGroup', 'Input'))
    .description('A group of CheckBoxes.')
    .usage(
      `import { CheckBoxGroup } from 'grommet';
        <CheckBoxGroup />`,
    )
    .intrinsicElement('div');

  DocumentedCheckBoxGroup.propTypes = {
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ).description(
      `An array of the values for the checked options. 
      If options is provided as an object, the value array will be the values 
     that the valueKey maps to.`,
    ),
    disabled: PropTypes.bool
      .description(`Disables all options.`)
      .defaultValue(undefined),
    labelKey: PropTypes.string.description(
      `When the options array contains objects, this property indicates how
        to determine the label of each option. If a string is
        provided, it is used as the key to retrieve each option's label.`,
    ),
    name: PropTypes.string.description(
      `Required when used in the Context of Form and FormField.`,
    ),
    onChange: PropTypes.func.description(
      `Function that will be called when the user clicks on a CheckBox option. 
      It will pass a React event object with the additional CheckBoxGroup 
      properties of 'option' and 'value'.`,
    ),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]).description(
      `Options can be either a string or an object of CheckBox props 
      excluding the 'checked' property, use CheckBoxGroup 'value' prop instead 
      of 'checked'.`,
    ).isRequired,
    valueKey: PropTypes.string.description(
      `When the options array contains objects, this property indicates how
        to determine the value of each option. If a string is provided, 
        it is used as the key to retrieve each option's value.`,
    ),
  };

  return DocumentedCheckBoxGroup;
};

export const themeDoc = {
  'checkBoxGroup.container': {
    description: 'Any valid Box props for the CheckBoxGroup container.',
    type: 'object',
    defaultValue: undefined,
  },
};
