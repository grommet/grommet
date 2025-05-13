"use strict";

exports.__esModule = true;
exports.Markdown = void 0;
var _react = _interopRequireWildcard(require("react"));
var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));
var _utils = require("../../utils");
var _Heading = require("../Heading");
var _Paragraph = require("../Paragraph");
var _Anchor = require("../Anchor");
var _Image = require("../Image");
var _Table = require("../Table");
var _TableBody = require("../TableBody");
var _TableCell = require("../TableCell");
var _TableFooter = require("../TableFooter");
var _TableHeader = require("../TableHeader");
var _TableRow = require("../TableRow");
var _propTypes = require("./propTypes");
var _excluded = ["children", "components", "options", "theme"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var GrommetMarkdown = exports.Markdown = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
    components = _ref.components,
    options = _ref.options,
    theme = _ref.theme,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var heading = [1, 2, 3, 4].reduce(function (obj, level) {
    var result = _extends({}, obj);
    result["h" + level] = {
      component: _Heading.Heading,
      props: {
        level: level
      }
    };
    return result;
  }, {});
  var overrides = (0, _utils.deepMerge)({
    a: {
      component: _Anchor.Anchor
    },
    img: {
      component: _Image.Image
    },
    p: {
      component: _Paragraph.Paragraph
    },
    table: {
      component: _Table.Table
    },
    td: {
      component: _TableCell.TableCell,
      props: {
        plain: true
      }
    },
    tbody: {
      component: _TableBody.TableBody
    },
    tfoot: {
      component: _TableFooter.TableFooter
    },
    th: {
      component: _TableCell.TableCell
    },
    thead: {
      component: _TableHeader.TableHeader
    },
    tr: {
      component: _TableRow.TableRow
    }
  }, heading, components, options && options.overrides);

  // we use Fragment as the wrapper so we can assign the ref with the div
  // wrapper can still be overridden with the options.
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    ref: ref
  }, rest), /*#__PURE__*/_react["default"].createElement(_markdownToJsx["default"], {
    children: children,
    options: _extends({
      wrapper: _react.Fragment
    }, options, {
      overrides: overrides
    })
  }));
});
GrommetMarkdown.propTypes = _propTypes.MarkdownPropTypes;