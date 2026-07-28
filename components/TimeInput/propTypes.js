"use strict";

exports.__esModule = true;
exports.TimeInputPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    defaultValue: _propTypes["default"].string,
    disabled: _propTypes["default"].bool,
    format: _propTypes["default"].oneOf(['12', '24']),
    id: _propTypes["default"].string,
    messages: _propTypes["default"].shape({
      activePeriodValue: _propTypes["default"].string,
      activeSection: _propTypes["default"].string,
      activeSectionValue: _propTypes["default"].string,
      chooseTime: _propTypes["default"].string,
      currentValue: _propTypes["default"].string,
      inputLabel: _propTypes["default"].string,
      invalidTime: _propTypes["default"].string,
      openDrop: _propTypes["default"].string,
      sectionHours: _propTypes["default"].string,
      sectionMeridiem: _propTypes["default"].string,
      sectionMinutes: _propTypes["default"].string,
      sectionSeconds: _propTypes["default"].string
    }),
    minuteStep: _propTypes["default"].number,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    readOnly: _propTypes["default"].bool,
    value: _propTypes["default"].string
  };
}
var TimeInputPropTypes = exports.TimeInputPropTypes = PropType;