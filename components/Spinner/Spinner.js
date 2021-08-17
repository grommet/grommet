"use strict";

exports.__esModule = true;
exports.Spinner = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _AnnounceContext = require("../../contexts/AnnounceContext");

var _Box = require("../Box");

var _defaultProps = require("../../default-props");

var _propTypes = require("./propTypes");

var _excluded = ["ref", "size"],
    _excluded2 = ["children", "color", "size", "message"],
    _excluded3 = ["size", "color"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BasicSpinner = function BasicSpinner(_ref) {
  var ref = _ref.ref,
      size = _ref.size,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    height: size,
    width: size,
    ref: ref
  }, rest));
};
/**
 * If the user is calling <Spinner>…</Spinner> with children, it will take
 * precedence over theme styling. Yet, it will still inherit the
 * default animation and size of the spinner, and of course any additional
 * given props.
 *
 * If the user is providing an icon/svg via the theme.spinner.icon,
 * the Spinner will use it as a child and will include all its relevant
 * theme props (size/color/pad…) as well,
 * user will only need to type <Spinner />.
 * If the icon has its own animation, user can turn it off via the theme.
 *
 * If none of the above is provider, <Spinner /> will provide its default
 * border, size and friends, all configurable via theme or props.
 */


var Spinner = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var children = _ref2.children,
      colorProp = _ref2.color,
      size = _ref2.size,
      message = _ref2.message,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  (0, _react.useEffect)(function () {
    if (message != null && message.start) announce(message.start);else if (typeof message === 'string') announce(message);
    return function () {
      return (message == null ? void 0 : message.end) && announce(message.end);
    };
  }, [announce, message]); // Avoid color and size leaking into the DOM

  var _theme$spinner$contai = theme.spinner.container,
      sizeThemeProp = _theme$spinner$contai.size,
      colorThemeProp = _theme$spinner$contai.color,
      themeProps = _objectWithoutPropertiesLoose(_theme$spinner$contai, _excluded3);

  var normalizedSize = size || sizeThemeProp;
  var spinnerSize = theme.spinner.size[normalizedSize] || normalizedSize;
  var color = colorProp || colorThemeProp;
  var Icon = theme.spinner.icon; // children will take precedence over theme attributes

  if (children) {
    return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
      size: spinnerSize,
      ref: ref
    }, rest), children);
  } // In case icon is provided by the theme


  if (Icon) return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref
  }, themeProps, rest), /*#__PURE__*/(0, _react.isValidElement)(Icon) ? Icon : /*#__PURE__*/_react["default"].createElement(Icon, {
    size: spinnerSize,
    color: color
  }));
  return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref,
    border: [{
      side: 'all',
      color: 'background-contrast',
      size: size
    }, {
      side: 'top',
      color: color,
      size: size
    }]
  }, themeProps, rest));
});
exports.Spinner = Spinner;
Spinner.displayName = 'Spinner';
Spinner.propTypes = _propTypes.SpinnerPropTypes;