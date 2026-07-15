"use strict";

exports.__esModule = true;
exports.AccordionPanelPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    header: _propTypes["default"].node
  };
}
var AccordionPanelPropTypes = exports.AccordionPanelPropTypes = PropType;