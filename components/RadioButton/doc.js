"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RadioButton) {
  var DocumentedRadioButton = (0, _reactDesc.describe)(RadioButton).availableAt((0, _utils.getAvailableAtBadge)('RadioButton')).description('A radio button control.').details("RadioButton should typically not be used directly.\n      Instead, use RadioButtonGroup.").usage("import { RadioButton } from 'grommet';\n<RadioButton />").intrinsicElement('input');
  DocumentedRadioButton.propTypes = {
    checked: _reactDesc.PropTypes.bool.description('Same as React <input checked={} />'),
    disabled: _reactDesc.PropTypes.bool.description("Same as React <input disabled={} />. Also adds a hidden input element\nwith the same name so form submissions work."),
    id: _reactDesc.PropTypes.string.description('The DOM id attribute value to use for the underlying <input/> element.'),
    label: _reactDesc.PropTypes.node.description('Label text to place next to the control.'),
    name: _reactDesc.PropTypes.string.description('The DOM name attribute value to use for the underlying <input/> element.').isRequired,
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user clicks the radio button. It\n      will be passed a React event object. The current state can be accessed\n      via event.target.checked. Same as React <input onChange={} />.")
  };
  return DocumentedRadioButton;
};

exports.doc = doc;