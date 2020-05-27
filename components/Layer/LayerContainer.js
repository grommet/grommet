"use strict";

exports.__esModule = true;
exports.LayerContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _defaultProps = require("../../default-props");

var _FocusedContainer = require("../FocusedContainer");

var _Keyboard = require("../Keyboard");

var _utils = require("../../utils");

var _StyledLayer = require("./StyledLayer");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var HiddenAnchor = _styledComponents["default"].a.withConfig({
  displayName: "LayerContainer__HiddenAnchor",
  componentId: "sc-1srj14c-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);

var fullBounds = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var LayerContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var children = _ref.children,
      _ref$full = _ref.full,
      full = _ref$full === void 0 ? false : _ref$full,
      id = _ref.id,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? 'none' : _ref$margin,
      _ref$modal = _ref.modal,
      modal = _ref$modal === void 0 ? true : _ref$modal,
      onClickOutside = _ref.onClickOutside,
      onEsc = _ref.onEsc,
      plain = _ref.plain,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'center' : _ref$position,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      layerTarget = _ref.target,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "full", "id", "margin", "modal", "onClickOutside", "onEsc", "plain", "position", "responsive", "target"]);

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var _useState = (0, _react.useState)(fullBounds),
      targetBounds = _useState[0],
      setTargetBounds = _useState[1];

  var anchorRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  var layerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (position !== 'hidden') {
      var node = layerRef.current || containerRef.current || ref.current;
      if (node && node.scrollIntoView) node.scrollIntoView(); // Once layer is open we make sure it has focus so that you
      // can start tabbing inside the layer. If the caller put focus
      // on an element already, we honor that. Otherwise, we put
      // the focus in the hidden anchor.

      var element = document.activeElement;

      while (element) {
        if (element === containerRef.current) {
          // already have focus inside the container
          break;
        }

        element = element.parentElement;
      }

      if (modal && !element && anchorRef.current) {
        anchorRef.current.focus();
      }
    }
  }, [modal, position, ref]);
  (0, _react.useEffect)(function () {
    if (position !== 'hidden') {
      var node = layerRef.current || containerRef.current || ref.current;
      if (node && node.scrollIntoView) node.scrollIntoView();
    }
  }, [position, ref]);
  (0, _react.useEffect)(function () {
    if (layerTarget) {
      var updateBounds = function updateBounds() {
        var rect = (0, _utils.findVisibleParent)(layerTarget).getBoundingClientRect();
        setTargetBounds({
          left: rect.left,
          right: window.innerWidth - rect.right,
          top: rect.top,
          bottom: window.innerHeight - rect.bottom
        });
      };

      updateBounds();
      window.addEventListener('resize', updateBounds);
      return function () {
        return window.removeEventListener('resize', updateBounds);
      };
    }

    setTargetBounds(fullBounds);
    return undefined;
  }, [layerTarget]);

  var content = /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledContainer, _extends({
    ref: ref || containerRef,
    id: id,
    full: full,
    margin: margin,
    modal: modal,
    targetBounds: !modal ? targetBounds : fullBounds
  }, rest, {
    position: position,
    plain: plain,
    responsive: responsive,
    dir: theme.dir
  }), /*#__PURE__*/_react["default"].createElement(HiddenAnchor, {
    ref: anchorRef,
    tabIndex: "-1",
    "aria-hidden": "true"
  }), children);

  if (modal) {
    content = /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledLayer, {
      ref: layerRef,
      id: id,
      targetBounds: targetBounds,
      plain: plain,
      position: position,
      responsive: responsive,
      tabIndex: "-1",
      dir: theme.dir
    }, /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledOverlay, {
      plain: plain,
      onMouseDown: onClickOutside,
      responsive: responsive
    }), content);
  }

  if (onEsc) {
    content = /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onEsc: onEsc
    }, content);
  }

  if (theme.layer.background) {
    var dark = (0, _utils.backgroundIsDark)(theme.layer.background, theme);

    if (dark !== undefined && dark !== theme.dark) {
      content = /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Provider, {
        value: _extends({}, theme, {
          dark: dark
        })
      }, content);
    }
  }

  if (modal) {
    content = /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      hidden: position === 'hidden',
      restrictScroll: true
    }, content);
  }

  return content;
});
exports.LayerContainer = LayerContainer;