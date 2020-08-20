"use strict";

exports.__esModule = true;
exports.FocusedContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var isNotAncestorOf = function isNotAncestorOf(child) {
  return function (parent) {
    return !parent.contains(child);
  };
};

var FocusedContainer = function FocusedContainer(_ref) {
  var _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? false : _ref$hidden,
      _ref$restrictScroll = _ref.restrictScroll,
      restrictScroll = _ref$restrictScroll === void 0 ? false : _ref$restrictScroll,
      children = _ref.children,
      trapFocus = _ref.trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["hidden", "restrictScroll", "children", "trapFocus"]);

  var _useState = (0, _react.useState)(''),
      bodyOverflowStyle = _useState[0],
      setBodyOverflowStyle = _useState[1];

  var ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var removeTrap = function removeTrap() {
      var child = ref.current;
      (0, _utils.getBodyChildElements)().filter(isNotAncestorOf(child)).forEach(_utils.makeNodeFocusable);

      if (restrictScroll) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };

    var handleTrapFocus = function handleTrapFocus() {
      var child = ref.current;
      (0, _utils.getBodyChildElements)().filter(isNotAncestorOf(child)).forEach(_utils.makeNodeUnfocusable);

      if (restrictScroll && bodyOverflowStyle !== 'hidden') {
        setBodyOverflowStyle(document.body.style.overflow);
        document.body.style.overflow = 'hidden';
      }
    };

    var timer = setTimeout(function () {
      if (!hidden && trapFocus) {
        handleTrapFocus();
      }
    }, 0);
    return function () {
      removeTrap();
      clearTimeout(timer);
    };
  }, [hidden, bodyOverflowStyle, restrictScroll, trapFocus]);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children);
};

exports.FocusedContainer = FocusedContainer;