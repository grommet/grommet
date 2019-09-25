"use strict";

exports.__esModule = true;
exports.Paragraph = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyledParagraph = require("./StyledParagraph");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Paragraph = function Paragraph(_ref) {
  var color = _ref.color,
      fill = _ref.fill,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "fill"]);

  return _react["default"].createElement(_StyledParagraph.StyledParagraph, _extends({
    colorProp: color,
    fillProp: fill
  }, rest));
};

var ParagraphDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ParagraphDoc = require('./doc').doc(Paragraph);
}

var ParagraphWrapper = ParagraphDoc || Paragraph;
exports.Paragraph = ParagraphWrapper;