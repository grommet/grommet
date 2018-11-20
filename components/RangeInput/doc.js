"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RangeInput) {
  var DocumentedRangeInput = (0, _reactDesc.describe)(RangeInput).availableAt((0, _utils.getAvailableAtBadge)('RangeInput')).description('A range input with custom styles.').usage("import { RangeInput } from 'grommet';\n<RangeInput />");
  DocumentedRangeInput.propTypes = {
    id: _reactDesc.PropTypes.string.description('The id attribute of the range input.'),
    min: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.string]).description('The minimum value permitted.'),
    max: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.string]).description('The maximum value permitted.'),
    name: _reactDesc.PropTypes.string.description('The name attribute of the range input.'),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user changes the value. It will\n      be passed an event object. The new input value will be available\n      via 'event.target.value'."),
    step: _reactDesc.PropTypes.number.description('The step interval between values.'),
    value: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.number, _reactDesc.PropTypes.string]).description('The current value.')
  };
  return DocumentedRangeInput;
};

exports.doc = doc;