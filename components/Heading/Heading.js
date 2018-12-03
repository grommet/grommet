"use strict";

exports.__esModule = true;
exports.Heading = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyledHeading = require("./StyledHeading");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Heading = function Heading(props) {
  var color = props.color,
      level = props.level,
      rest = _objectWithoutPropertiesLoose(props, ["color", "level"]); // enforce level to be a number


  return _react.default.createElement(_StyledHeading.StyledHeading, _extends({
    as: "h" + level,
    colorProp: color,
    level: +level
  }, rest));
};

Heading.defaultProps = {
  level: 1,
  responsive: true
};
var HeadingDoc;

if (process.env.NODE_ENV !== 'production') {
  HeadingDoc = require('./doc').doc(Heading); // eslint-disable-line global-require
}

var HeadingWrapper = HeadingDoc || Heading;
exports.Heading = HeadingWrapper;