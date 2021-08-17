"use strict";

exports.__esModule = true;
exports.FocusedContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _RootsContext = require("../contexts/RootsContext");

var _excluded = ["hidden", "restrictScroll", "children", "trapFocus"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FocusedContainer = function FocusedContainer(_ref) {
  var _ref$hidden = _ref.hidden,
      hidden = _ref$hidden === void 0 ? false : _ref$hidden,
      _ref$restrictScroll = _ref.restrictScroll,
      restrictScroll = _ref$restrictScroll === void 0 ? false : _ref$restrictScroll,
      children = _ref.children,
      trapFocus = _ref.trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = (0, _react.useState)(''),
      bodyOverflowStyle = _useState[0],
      setBodyOverflowStyle = _useState[1];

  var ref = (0, _react.useRef)(null);
  var roots = (0, _react.useContext)(_RootsContext.RootsContext);

  var _useState2 = (0, _react.useState)(roots),
      nextRoots = _useState2[0],
      setNextRoots = _useState2[1];

  (0, _react.useEffect)(function () {
    // make sure value of null is not added to array
    if (ref.current) setNextRoots([].concat(roots, [ref.current]));
  }, [roots]);
  (0, _react.useEffect)(function () {
    if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
      setBodyOverflowStyle(document.body.style.overflow);
      document.body.style.overflow = 'hidden';
    }

    return function () {
      if (bodyOverflowStyle !== 'hidden' && !hidden && restrictScroll && trapFocus) {
        document.body.style.overflow = bodyOverflowStyle;
      }
    };
  }, [bodyOverflowStyle, hidden, trapFocus, restrictScroll]);
  (0, _react.useEffect)(function () {
    var timer = setTimeout(function () {
      if (!hidden && trapFocus && roots && roots[0]) {
        roots.forEach(_utils.makeNodeUnfocusable);
      }
    }, 0);
    return function () {
      // remove trap and restore ability to focus on the last root only
      if (roots && roots[0]) (0, _utils.makeNodeFocusable)(roots[roots.length - 1]);
      clearTimeout(timer);
    };
  }, [hidden, roots, trapFocus]);
  return /*#__PURE__*/_react["default"].createElement(_RootsContext.RootsContext.Provider, {
    value: nextRoots
  }, /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref,
    "aria-hidden": hidden
  }, rest), children));
};

exports.FocusedContainer = FocusedContainer;