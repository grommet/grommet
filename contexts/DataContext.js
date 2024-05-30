"use strict";

exports.__esModule = true;
exports.DataContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var DataContext = exports.DataContext = /*#__PURE__*/_react["default"].createContext({
  data: [],
  addToolbarKey: function addToolbarKey() {}
});