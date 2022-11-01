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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var GrommetMarkdown = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
exports.Markdown = GrommetMarkdown;
GrommetMarkdown.propTypes = _propTypes.MarkdownPropTypes;