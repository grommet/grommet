"use strict";

exports.__esModule = true;
exports.DefaultSelectTextInput = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledSelect = require("./StyledSelect");
var _excluded = ["disabled", "id"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var DefaultSelectTextInput = exports.DefaultSelectTextInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var disabled = _ref.disabled,
    id = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_StyledSelect.SelectTextInput
  // When Select is disabled, we want to show a default cursor
  // but not have disabled styling come from TextInput
  // Disabled can be a bool or an array of options to disable.
  // We only want to disable the TextInput if the control
  // button should be disabled which occurs when disabled
  // equals true.
  , _extends({
    defaultCursor: disabled === true || undefined,
    focusIndicator: false,
    id: id ? id + "__input" : undefined,
    ref: ref
  }, rest, {
    tabIndex: "-1",
    type: "text",
    plain: true,
    readOnly: true
  }));
});