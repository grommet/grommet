"use strict";

exports.__esModule = true;
exports.SearchBorderBox = void 0;

var _styledComponents = require("styled-components");

var _react = _interopRequireWildcard(require("react"));

var _ = require("../../..");

var _contexts = require("../../../../contexts");

var _utils = require("../../../../utils");

var _excluded = ["children", "searching"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var searchingStyle = (0, _styledComponents.css)(["position:relative;outline:none;box-shadow:none;&:before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:", ";}&:after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;will-change:left,right;background:", ";animation:progress 1.5s cubic-bezier(0.4,0,0.2,1) infinite;transform:translateX(-50%) scaleX(0);}@keyframes progress{0%{transform:translateX(-50%) scaleX(0);}50%{transform:translateX(12.5%) scaleX(0.75);}100%{transform:translateX(50%) scaleX(0);}}"], function (props) {
  return (0, _utils.normalizeColor)('light-2', props.theme);
}, function (props) {
  return (0, _utils.normalizeColor)('brand', props.theme);
});
var defaultStyle = (0, _styledComponents.css)(["position:relative;outline:none;&:after{content:'';position:absolute;bottom:0;left:50%;width:0;height:2px;background:transparent;transition:width 0.2s ease,background 0.2s ease,left 0.2s ease;}", ";"], function (props) {
  return props.focus && "\n    box-shadow: none;\n    &:after {\n      left: 0;\n      width: 100%;\n      background: " + (0, _utils.normalizeColor)('brand', props.theme) + ";\n    }\n  ";
});

var SearchBorderBox = function SearchBorderBox(_ref) {
  var children = _ref.children,
      searching = _ref.searching,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = (0, _react.useState)(false),
      focus = _useState[0],
      setFocus = _useState[1];

  var boxBorderTheme = {
    box: {
      extend: searching ? searchingStyle : defaultStyle
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_contexts.ThemeContext.Extend, {
    value: boxBorderTheme
  }, /*#__PURE__*/_react["default"].createElement(_.Box, _extends({
    focus: focus,
    searching: searching,
    onFocus: function onFocus() {
      return setFocus(true);
    },
    onBlur: function onBlur() {
      return setFocus(false);
    }
  }, rest), children));
};

exports.SearchBorderBox = SearchBorderBox;