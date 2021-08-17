"use strict";

exports.__esModule = true;
exports.Markdown = void 0;

var _react = _interopRequireDefault(require("react"));

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

var _excluded = ["components", "options", "theme"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var GrommetMarkdown = function GrommetMarkdown(_ref) {
  var components = _ref.components,
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
      component: _TableCell.TableCell
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
  return /*#__PURE__*/_react["default"].createElement(_markdownToJsx["default"], _extends({
    options: _extends({}, options, {
      overrides: overrides
    })
  }, rest));
};

exports.Markdown = GrommetMarkdown;
GrommetMarkdown.propTypes = _propTypes.MarkdownPropTypes;