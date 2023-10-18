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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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