import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(RadioButtonGroup) {
  var DocumentedRadioButtonGroup = describe(RadioButtonGroup).availableAt(getAvailableAtBadge('RadioButtonGroup')).description('A group of radio buttons.').usage("import { RadioButtonGroup } from 'grommet';\n<RadioButtonGroup />").intrinsicElement('div');
  DocumentedRadioButtonGroup.propTypes = {
    name: PropTypes.string.description('The DOM name attribute value to use for the underlying <input/> elements.').isRequired,
    onChange: PropTypes.func.description("Function that will be called when the user clicks on of the radio\n      buttons. It will be passed a React event object."),
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      id: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      value: PropTypes.string.isRequired
    }))]).description("Options can be either a string or an object.").isRequired,
    value: PropTypes.string.description("Currently selected option value.")
  };
  return DocumentedRadioButtonGroup;
};