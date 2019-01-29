"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RadioButtonGroup) {
  var DocumentedRadioButtonGroup = (0, _reactDesc.describe)(RadioButtonGroup).availableAt((0, _utils.getAvailableAtBadge)('RadioButtonGroup')).description('A group of radio buttons.').usage("import { RadioButtonGroup } from 'grommet';\n<RadioButtonGroup />").intrinsicElement('div');
  DocumentedRadioButtonGroup.propTypes = {
    name: _reactDesc.PropTypes.string.description('The DOM name attribute value to use for the underlying <input/> elements.').isRequired,
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user clicks on of the radio\n      buttons. It will be passed a React event object."),
    options: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.string), _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      disabled: _reactDesc.PropTypes.bool,
      id: _reactDesc.PropTypes.string,
      label: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.element]),
      value: _reactDesc.PropTypes.string.isRequired
    }))]).description("Options can be either a string or an object.").isRequired,
    value: _reactDesc.PropTypes.string.description("Currently selected option value.")
  };
  return DocumentedRadioButtonGroup;
};

exports.doc = doc;