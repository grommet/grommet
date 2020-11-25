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

var defaultPortalContext = [];
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
  var portalContext = (0, _react.useContext)(_utils.PortalContext) || defaultPortalContext;
  var portalId = (0, _react.useMemo)(function () {
    return portalContext.length;
  }, [portalContext]);
  var nextPortalContext = (0, _react.useMemo)(function () {
    return [].concat(portalContext, [portalId]);
  }, [portalContext, portalId]);
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
    var onClickDocument = function onClickDocument(event) {
      // determine which portal id the target is in, if any
      var clickedPortalId = null;
      var node = event.target;

      while (clickedPortalId === null && node !== document && node !== null) {
        // check if user click occurred within the layer
        var attr = node.getAttribute('data-g-portal-id');
        if (attr !== null && attr !== '') clickedPortalId = parseInt(attr, 10); // loop upward through parents to see if clicked element is a child
        // of the Layer. if so, click was inside Layer
        else node = node.parentNode;
      }

      if ((clickedPortalId === null || portalContext.indexOf(clickedPortalId) !== -1) && node !== null) {
        // if the click occurred outside of the Layer portal, call
        // the user's onClickOutside function
        onClickOutside(event);
      }
    }; // if user provides an onClickOutside function, listen for mousedown event


    if (onClickOutside) {
      document.addEventListener('mousedown', onClickDocument);
    }

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
      window.addEventListener('scroll', updateBounds, true);
      return function () {
        window.removeEventListener('resize', updateBounds);
        window.removeEventListener('scroll', updateBounds, true);

        if (onClickOutside) {
          document.removeEventListener('mousedown', onClickDocument);
        }
      };
    }

    setTargetBounds(fullBounds);
    return function () {
      if (onClickOutside) {
        document.removeEventListener('mousedown', onClickDocument);
      }
    };
  }, [layerTarget, onClickOutside, portalContext, portalId]);

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
    dir: theme.dir // portalId is used to determine if click occurred inside
    // or outside of the layer
    ,
    "data-g-portal-id": portalId
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
      responsive: responsive,
      onMouseDown: onClickOutside
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

  content = /*#__PURE__*/_react["default"].createElement(_utils.PortalContext.Provider, {
    value: nextPortalContext
  }, content);

  if (modal) {
    content = /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      hidden: position === 'hidden' // if layer has a target, do not restrict scroll.
      // restricting scroll could inhibit the user's
      // ability to scroll the page while the layer is open.
      ,
      restrictScroll: !layerTarget ? true : undefined,
      trapFocus: true
    }, content);
  }

  return content;
});
exports.LayerContainer = LayerContainer;