import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(CheckBoxGroup) {
  var DocumentedCheckBoxGroup = describe(CheckBoxGroup).availableAt(getAvailableAtBadge('CheckBoxGroup', 'Input')).description('A group of CheckBoxes.').usage("import { CheckBoxGroup } from 'grommet';\n        <CheckBoxGroup />").intrinsicElement('div');
  DocumentedCheckBoxGroup.propTypes = {
    value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).description("An array of the values for the checked options. \n      If options is provided as an object, the value array will be the values \n     that the valueKey maps to."),
    disabled: PropTypes.bool.description("Disables all options.").defaultValue(undefined),
    labelKey: PropTypes.string.description("When the options array contains objects, this property indicates how\n        to determine the label of each option. If a string is\n        provided, it is used as the key to retrieve each option's label."),
    name: PropTypes.string.description("Required when used in the Context of Form and FormField."),
    onChange: PropTypes.func.description("Function that will be called when the user clicks on a CheckBox option. \n      It will pass a React event object with the additional CheckBoxGroup \n      properties of 'option' and 'value'."),
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({}))]).description("Options can be either a string or an object of CheckBox props \n      excluding the 'checked' property, use CheckBoxGroup 'value' prop instead \n      of 'checked'.").isRequired,
    valueKey: PropTypes.string.description("When the options array contains objects, this property indicates how\n        to determine the value of each option. If a string is provided, \n        it is used as the key to retrieve each option's value.")
  };
  return DocumentedCheckBoxGroup;
};
export var themeDoc = {
  'checkBoxGroup.container': {
    description: 'Any valid Box props for the CheckBoxGroup container.',
    type: 'object',
    defaultValue: undefined
  }
};