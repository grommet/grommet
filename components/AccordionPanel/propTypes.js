"use strict";

exports.__esModule = true;
exports.AccordionPanelType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var AccordionPanelType = {
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  header: _propTypes["default"].node
};
exports.AccordionPanelType = AccordionPanelType;