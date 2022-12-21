"use strict";

exports.__esModule = true;
exports.DataContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var DataContext = /*#__PURE__*/_react["default"].createContext({
  data: []
});
exports.DataContext = DataContext;