"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = require("../../..");

var _SearchBorderBox = require("./SearchBorderBox");

var _SearchInputContext = require("./SearchInputContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SearchInput = function SearchInput(props) {
  var textInputRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var focusTimeout = setTimeout(function () {
      textInputRef.current.focus();
    }, 300);
    return function () {
      clearTimeout(focusTimeout);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_SearchInputContext.SearchInputContext.Consumer, null, function (_ref) {
    var searching = _ref.searching;
    return /*#__PURE__*/_react["default"].createElement(_SearchBorderBox.SearchBorderBox, {
      searching: searching
    }, /*#__PURE__*/_react["default"].createElement(_.TextInput, _extends({}, props, {
      plain: true,
      ref: textInputRef
    })));
  });
};

exports.SearchInput = SearchInput;