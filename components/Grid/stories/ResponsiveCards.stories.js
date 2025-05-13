"use strict";

exports.__esModule = true;
exports["default"] = exports.Example = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var cards = Array(20).fill()
// eslint-disable-next-line react/no-array-index-key
.map(function (_, i) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    key: i
  }, "Card " + i);
});
var Example = exports.Example = function Example() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: size !== 'small' ? 'small' : '100%',
      gap: "small"
    }, cards.map(function (card, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_grommet.Card, {
          pad: "large",
          key: index
        }, card)
      );
    })))
    // </Grommet>
  );
};
Example.storyName = 'Responsive cards';
var _default = exports["default"] = {
  title: 'Layout/Grid/Responsive cards'
};