"use strict";

exports.__esModule = true;
exports.Heading = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _StyledHeading = require("./StyledHeading");
var _propTypes = require("./propTypes");
var _utils = require("../../utils");
var _Skeleton = require("../Skeleton");
var _HeadingSkeleton = require("./HeadingSkeleton");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _contexts = require("../../contexts");
var _excluded = ["children", "color", "fill", "level", "overflowWrap", "responsive", "weight"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Heading = exports.Heading = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref // munged to avoid styled-components putting it in the DOM
) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    _ref$level = _ref.level,
    level = _ref$level === void 0 ? 1 : _ref$level,
    overflowWrapProp = _ref.overflowWrap,
    _ref$responsive = _ref.responsive,
    responsiveProp = _ref$responsive === void 0 ? true : _ref$responsive,
    weight = _ref.weight,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var headingRef = (0, _utils.useForwardedRef)(ref);
  var _useState = (0, _react.useState)(overflowWrapProp || 'break-word'),
    overflowWrap = _useState[0],
    setOverflowWrap = _useState[1];
  var responsiveContainer = (0, _react.useContext)(_contexts.ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  var skeleton = (0, _Skeleton.useSkeleton)();

  // handle overflowWrap of heading
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    var updateOverflowWrap = function updateOverflowWrap() {
      var wrap;
      if (!overflowWrapProp && headingRef.current) {
        wrap = headingRef.current.scrollWidth > headingRef.current.offsetWidth ? 'anywhere' : 'break-word';
        setOverflowWrap(wrap);
      }
    };
    window.addEventListener('resize', updateOverflowWrap);
    updateOverflowWrap();
    return function () {
      return window.removeEventListener('resize', updateOverflowWrap);
    };
  }, [headingRef, overflowWrapProp]);
  var content = children;
  if (skeleton) {
    content = /*#__PURE__*/_react["default"].createElement(_HeadingSkeleton.HeadingSkeleton, _extends({
      level: level,
      fill: fill,
      responsive: responsive
    }, rest));
  }
  return (
    /*#__PURE__*/
    // enforce level to be a number
    _react["default"].createElement(_StyledHeading.StyledHeading, _extends({
      as: "h" + level,
      colorProp: color,
      fillProp: fill,
      level: +level,
      overflowWrap: overflowWrap,
      responsive: responsive,
      weight: weight
    }, passThemeFlag, rest, {
      ref: headingRef
    }), content)
  );
});
Heading.displayName = 'Heading';
Heading.propTypes = _propTypes.HeadingPropTypes;