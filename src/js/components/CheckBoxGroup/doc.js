import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = CheckBoxGroup => {
  const DocumentedCheckBoxGroup = describe(CheckBoxGroup)
    .availableAt(getAvailableAtBadge('CheckBoxGroup'))
    .description('A group of CheckBoxes.')
    .usage(
      `import { CheckBoxGroup } from 'grommet';
        <CheckBoxGroup />`,
    )
    .intrinsicElement('div');

  DocumentedCheckBoxGroup.propTypes = {
    checked: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ).description(
      `An array of the checked options. If options is provided as an object, the
      checked array will be the strings of the checked option valueKey.`,
    ),
    disabled: PropTypes.bool
      .description(`Disables all options.`)
      .defaultValue(undefined),
    labelKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).description(
      `When the options array contains objects, this property indicates how
        to determine the label of each option. If a string is
        provided, it is used as the key to retrieve each option's label.`,
    ),
    name: PropTypes.string.description(
      `The name attribute value to use for the underlying <input/> 
      elements. Required when used in the Context of FormField.`,
    ),
    onChange: PropTypes.func.description(
      `Function that will be called when the user clicks on a CheckBox option. 
      It will be passed a React event object with a value.`,
    ),
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]).description(
      `Options can be either a string or an object of CheckBox props.`,
    ).isRequired,
    valueKey: PropTypes.string.description(
      `When the options array contains objects, this property indicates how
        to determine the value of each option. If a string is
        provided, it is used as the key to retrieve each option's value.`,
    ),
  };

  return DocumentedCheckBoxGroup;
};
