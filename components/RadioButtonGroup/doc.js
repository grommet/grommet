"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RadioButtonGroup) {
  var DocumentedRadioButtonGroup = (0, _reactDesc.describe)(RadioButtonGroup).availableAt((0, _utils.getAvailableAtBadge)('RadioButtonGroup')).description('A group of radio buttons.').usage("import { RadioButtonGroup } from 'grommet';\n<RadioButtonGroup />").intrinsicElement('div');
  DocumentedRadioButtonGroup.propTypes = {
    children: _reactDesc.PropTypes.func.description("Function that will be called to render the visual representation.\n      It will be passed an object indicating whether the button is checked. It\n      should return a react element.\n      For example:\n      `children={(option, { checked }) => <Box ...>{...}</Box>}`\n      "),
    disabled: _reactDesc.PropTypes.bool.description("Disables all options.").defaultValue(false),
    name: _reactDesc.PropTypes.string.description("The DOM name attribute value to use for the underlying <input/> \n      elements.").isRequired,
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user clicks on one of the radio\n      buttons. It will be passed a React event object."),
    options: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.bool), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      disabled: _reactDesc.PropTypes.bool,
      id: _reactDesc.PropTypes.string,
      label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.element]),
      value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.number, _reactDesc.PropTypes.bool]).isRequired
    }))]).description("Options can be either a string, boolean, number \n      or an object. Each option is rendered as a single RadioButton.").isRequired,
    value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.number, _reactDesc.PropTypes.bool, _reactDesc.PropTypes.object]).description("Currently selected option value.")
  };
  return DocumentedRadioButtonGroup;
};

exports.doc = doc;
var themeDoc = {
  'radioButtonGroup.container': {
    description: 'Any valid Box props for the RadioButtonGroup container.',
    type: 'object',
    defaultValue: 'undefined'
  }
};
exports.themeDoc = themeDoc;