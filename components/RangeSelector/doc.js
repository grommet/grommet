"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(RangeSelector) {
  var DocumentedRangeSelector = (0, _reactDesc.describe)(RangeSelector).availableAt((0, _utils.getAvailableAtBadge)('RangeSelector')).description('A control to allow selecting a range of values.').usage("import { RangeSelector } from 'grommet';\n<RangeSelector />");
  DocumentedRangeSelector.propTypes = {
    color: _reactDesc.PropTypes.string.description('What color to use to indicate the selection.'),
    direction: _reactDesc.PropTypes.oneOf(['horizontal', 'vertical']).description('').defaultValue('horizontal'),
    invert: _reactDesc.PropTypes.bool.description('Whether to indicate what has not been selected.'),
    max: _reactDesc.PropTypes.number.description('The maximum value permitted.').defaultValue(100),
    messages: _reactDesc.PropTypes.shape({
      lower: _reactDesc.PropTypes.string,
      upper: _reactDesc.PropTypes.string
    }).description('Custom messages. Used for accessibility by screen readers.'),
    min: _reactDesc.PropTypes.number.description('The minimum value permitted.').defaultValue(0),
    onChange: _reactDesc.PropTypes.func.description("Function that will be called when the user changes one of the\n      values. It will be passed an array of two numbers indicating\n      the new values selected."),
    opacity: _reactDesc.PropTypes.oneOf(['weak', 'medium', 'strong']).description('').defaultValue('medium'),
    round: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'full']), _reactDesc.PropTypes.string]).description('How much to round the corners.'),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full']), _reactDesc.PropTypes.string]).description('How thick to make the selection indicator.').defaultValue('medium'),
    step: _reactDesc.PropTypes.number.description('The step interval between values.').defaultValue(1),
    values: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.number).description('The current values.').isRequired
  };
  return DocumentedRangeSelector;
};

exports.doc = doc;