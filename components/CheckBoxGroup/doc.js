"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(CheckBoxGroup) {
  var DocumentedCheckBoxGroup = (0, _reactDesc.describe)(CheckBoxGroup).availableAt((0, _utils.getAvailableAtBadge)('CheckBoxGroup', 'Input')).description('A group of CheckBoxes.').usage("import { CheckBoxGroup } from 'grommet';\n        <CheckBoxGroup />").intrinsicElement('div');
  DocumentedCheckBoxGroup.propTypes = {
    value: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.string])).description("An array of the values for the checked options. \n      If options is provided as an object, the value array will be the values \n     that the valueKey maps to."),
    disabled: _reactDesc.PropTypes.bool.description("Disables all options.").defaultValue(undefined),
    labelKey: _reactDesc.PropTypes.string.description("When the options array contains objects, this property indicates how\n        to determine the label of each option. If a string is\n        provided, it is used as the key to retrieve each option's label."),
    name: _reactDesc.PropTypes.string.description("Required when used in the Context of Form and FormField."),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user clicks on a CheckBox option. \n      It will pass a React event object with the additional CheckBoxGroup \n      properties of 'option' and 'value'."),
    options: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({}))]).description("Options can be either a string or an object of CheckBox props \n      excluding the 'checked' property, use CheckBoxGroup 'value' prop instead \n      of 'checked'.").isRequired,
    valueKey: _reactDesc.PropTypes.string.description("When the options array contains objects, this property indicates how\n        to determine the value of each option. If a string is provided, \n        it is used as the key to retrieve each option's value.")
  };
  return DocumentedCheckBoxGroup;
};

exports.doc = doc;
var themeDoc = {
  'checkBoxGroup.container': {
    description: 'Any valid Box props for the CheckBoxGroup container.',
    type: 'object',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;