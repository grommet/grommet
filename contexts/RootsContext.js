"use strict";

exports.__esModule = true;
exports.RootsContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// When toggling aria-hidden values, we only want to affect elements
// in the DOM that come from Grommet, so we track those elements in this
// context value. See FocusedContainer.js
var RootsContext = /*#__PURE__*/_react["default"].createContext([]);

exports.RootsContext = RootsContext;