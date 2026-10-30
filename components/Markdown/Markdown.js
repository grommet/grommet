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
var _excluded = ["children", "components", "options", "theme"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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