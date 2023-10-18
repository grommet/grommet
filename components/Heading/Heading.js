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
var _excluded = ["children", "color", "fill", "level", "overflowWrap", "weight"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Heading = exports.Heading = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref // munged to avoid styled-components putting it in the DOM
) {
  var children = _ref.children,
    color = _ref.color,
    fill = _ref.fill,
    level = _ref.level,
    overflowWrapProp = _ref.overflowWrap,
    weight = _ref.weight,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var headingRef = (0, _utils.useForwardedRef)(ref);
  var _useState = (0, _react.useState)(overflowWrapProp || 'break-word'),
    overflowWrap = _useState[0],
    setOverflowWrap = _useState[1];
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
      fill: fill
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
      weight: weight
    }, rest, {
      ref: headingRef
    }), content)
  );
});
Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true
};
Heading.propTypes = _propTypes.HeadingPropTypes;