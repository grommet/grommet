import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(RadioButton) {
  var DocumentedRadioButton = describe(RadioButton).availableAt(getAvailableAtBadge('RadioButton')).description('A radio button control.').details("RadioButton should typically not be used directly.\n      Instead, use RadioButtonGroup.").usage("import { RadioButton } from 'grommet';\n<RadioButton />").intrinsicElement('input');
  DocumentedRadioButton.propTypes = {
    checked: PropTypes.bool.description('Same as React <input checked={} />'),
    disabled: PropTypes.bool.description("Same as React <input disabled={} />. Also adds a hidden input element\nwith the same name so form submissions work."),
    id: PropTypes.string.description('The DOM id attribute value to use for the underlying <input/> element.'),
    label: PropTypes.node.description('Label text to place next to the control.'),
    name: PropTypes.string.description('The DOM name attribute value to use for the underlying <input/> element.').isRequired,
    onChange: PropTypes.func.description("Function that will be called when the user clicks the radio button. It\n      will be passed a React event object. The current state can be accessed\n      via event.target.checked. Same as React <input onChange={} />.")
  };
  return DocumentedRadioButton;
};