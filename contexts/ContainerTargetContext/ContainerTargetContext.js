"use strict";

exports.__esModule = true;
exports.ContainerTargetContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContainerTargetContext = /*#__PURE__*/_react["default"].createContext(typeof document === 'object' ? document.body : undefined);

exports.ContainerTargetContext = ContainerTargetContext;