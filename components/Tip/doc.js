"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _mixins = require("../../utils/mixins");

var doc = function doc(Tip) {
  var DocumentedTip = (0, _reactDesc.describe)(Tip).availableAt((0, _mixins.getAvailableAtBadge)('Tip', 'Controls')).description("Tooltip or a hint when hovering over an element. The tooltip will render \n      when hovering on top of the Tip's child node or string.").usage("import { Tip } from 'grommet';\n<Tip />");
  DocumentedTip.propTypes = {
    content: _reactDesc.PropTypes.node.description("The tooltip content inside the drop."),
    dropProps: _reactDesc.PropTypes.object.description('Any valid Drop prop to style the Tip drop container.').defaultValue({
      plain: true,
      trapFocus: false
    }),
    plain: _reactDesc.PropTypes.bool.description("Whether content should have default styling.").defaultValue(undefined)
  };
  return DocumentedTip;
};

exports.doc = doc;
var themeDoc = {
  'tip.content': {
    description: 'Any valid Box property for the Tip container.',
    type: 'object',
    defaultValue: "{ background: 'background-contrast', elevation: 'small', \n    margin: 'xsmall', pad: { vertical: 'xsmall', horizontal: 'small' }, \n    round: 'small'}"
  },
  'tip.drop': {
    description: 'Any valid Drop property for the Tooltip.',
    type: 'object',
    defaultValue: "{align: { top: 'bottom' }}"
  }
};
exports.themeDoc = themeDoc;