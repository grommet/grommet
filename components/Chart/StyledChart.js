"use strict";

exports.__esModule = true;
exports.StyledChart = void 0;
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var animateStyle = function animateStyle(_ref) {
  var theme = _ref.theme,
    typeProp = _ref.typeProp;
  var animateBounds;
  if (typeProp === 'line')
    // 200% allows the line to be squiggly
    animateBounds = ['stroke-dashoffset: 200%;', 'stroke-dashoffset: 0%;'];else if (typeProp === 'point') animateBounds = ['opacity: 0;', 'opacity: 1;'];else animateBounds = ['transform: scaleY(0);', 'transform: scaleY(1);'];
  return (0, _styledComponents.css)(["", " animation:", " ", " forwards;", ""], typeProp === 'line' && 'stroke-dasharray: 200%;', (0, _styledComponents.keyframes)(["from{", "}to{", "}"], animateBounds[0], animateBounds[1]), theme.global.animation.duration, (typeProp === 'bar' || typeProp === 'area') && 'transform-origin: center bottom 0;');
};
var StyledChart = exports.StyledChart = _styledComponents["default"].svg.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledChart",
  componentId: "sc-1nae0gf-0"
})(["display:block;max-width:100%;overflow:visible;", " ", " ", ";"], _utils.genericStyles, function (props) {
  return props.animate && animateStyle(props);
}, function (props) {
  return props.theme.chart && props.theme.chart.extend;
});