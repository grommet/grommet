"use strict";

exports.__esModule = true;
exports.SkipLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _Anchor = require("../Anchor");

var _Box = require("../Box");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SkipLink = function SkipLink(_ref) {
  var id = _ref.id,
      label = _ref.label,
      rest = _objectWithoutPropertiesLoose(_ref, ["id", "label"]);

  return _react.default.createElement(_Box.Box, {
    margin: "small"
  }, _react.default.createElement(_Anchor.Anchor, _extends({
    href: "#" + id,
    label: label
  }, rest)));
};

exports.SkipLink = SkipLink;