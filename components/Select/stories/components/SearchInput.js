"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = require("../../..");

var _SearchBorderBox = require("./SearchBorderBox");

var _excluded = ["searching"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/* Need ForwardRef since this functional component
   is being passed into a custom theme for SearchInput
*/
var SearchInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, textInputRef) {
  var searching = _ref.searching,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  (0, _react.useEffect)(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, [textInputRef]);
  return /*#__PURE__*/_react["default"].createElement(_SearchBorderBox.SearchBorderBox, {
    searching: searching
  }, /*#__PURE__*/_react["default"].createElement(_.TextInput, _extends({}, props, {
    plain: true,
    ref: textInputRef
  })));
});
exports.SearchInput = SearchInput;