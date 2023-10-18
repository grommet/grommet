"use strict";

exports.__esModule = true;
exports.ResponsiveContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = require("./propTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ResponsiveContext = exports.ResponsiveContext = /*#__PURE__*/_react["default"].createContext(undefined);
ResponsiveContext.propTypes = _propTypes.ResponsiveContextPropTypes;