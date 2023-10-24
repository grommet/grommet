"use strict";

exports.__esModule = true;
exports.LayerContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _defaultProps = require("../../default-props");
var _FocusedContainer = require("../FocusedContainer");
var _Keyboard = require("../Keyboard");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _OptionsContext = require("../../contexts/OptionsContext");
var _ContainerTargetContext = require("../../contexts/ContainerTargetContext");
var _AnalyticsContext = require("../../contexts/AnalyticsContext");
var _utils = require("../../utils");
var _StyledLayer = require("./StyledLayer");
var _excluded = ["background", "children", "full", "id", "margin", "modal", "onClickOutside", "onEsc", "plain", "position", "responsive", "target"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var HiddenAnchor = _styledComponents["default"].a.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "LayerContainer__HiddenAnchor",
  componentId: "sc-1srj14c-0"
})(["width:0;height:0;overflow:hidden;position:absolute;"]);
var LayerContainer = exports.LayerContainer = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var background = _ref.background,
    children = _ref.children,
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
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var containerTarget = (0, _react.useContext)(_ContainerTargetContext.ContainerTargetContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  // layerOptions was created to preserve backwards compatibility but
  // should not be supported in v3
  var _useContext = (0, _react.useContext)(_OptionsContext.OptionsContext),
    layerOptions = _useContext.layer;
  var anchorRef = (0, _react.useRef)();
  var containerRef = (0, _react.useRef)();
  var layerRef = (0, _react.useRef)();
  var portalContext = (0, _react.useContext)(_utils.PortalContext);
  var portalId = (0, _react.useMemo)(function () {
    return portalContext.length;
  }, [portalContext]);
  var nextPortalContext = (0, _react.useMemo)(function () {
    return [].concat(portalContext, [portalId]);
  }, [portalContext, portalId]);
  var sendAnalytics = (0, _AnalyticsContext.useAnalytics)();
  (0, _react.useEffect)(function () {
    var start = new Date();
    var element = layerRef.current;
    var isHidden = position === 'hidden';
    if (!isHidden) {
      sendAnalytics({
        type: 'layerOpen',
        element: element
      });
    }
    return function () {
      if (!isHidden) {
        sendAnalytics({
          type: 'layerClose',
          element: element,
          elapsed: new Date().getTime() - start.getTime()
        });
      }
    };
  }, [sendAnalytics, layerRef, position]);
  (0, _react.useEffect)(function () {
    if (position !== 'hidden') {
      var node = layerRef.current || containerRef.current || ref.current;
      if (node && node.scrollIntoView) node.scrollIntoView();
      // Once layer is open we make sure it has focus so that you
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
      var node = event.composed && event.composedPath()[0] || event.target;
      while (clickedPortalId === null && node && node !== document && !(node instanceof ShadowRoot)) {
        // check if user click occurred within the layer
        var attr = node.getAttribute('data-g-portal-id');
        if (attr !== null && attr !== '') clickedPortalId = parseInt(attr, 10);
        // loop upward through parents to see if clicked element is a child
        // of the Layer. if so, click was inside Layer
        else node = node.parentNode;
      }
      if ((clickedPortalId === null || portalContext.indexOf(clickedPortalId) !== -1) && node !== null) {
        // if the click occurred outside of the Layer portal, call
        // the user's onClickOutside function
        onClickOutside(event);
      }
    };

    // if user provides an onClickOutside function, listen for mousedown event
    if (onClickOutside) {
      document.addEventListener('mousedown', onClickDocument);
    }
    if (layerTarget) {
      var updateBounds = function updateBounds() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var target = (0, _utils.findVisibleParent)(layerTarget);

        // affects StyledLayer
        var layer = layerRef.current;
        if (layer && target) {
          // clear prior styling
          layer.style.left = '';
          layer.style.top = '';
          layer.style.bottom = '';
          layer.style.width = '';

          // get bounds
          var targetRect = target.getBoundingClientRect();
          var layerRect = layer.getBoundingClientRect();

          // ensure that layer moves with the target
          layer.style.left = targetRect.left + "px";
          layer.style.right = windowWidth - targetRect.right + "px";
          layer.style.top = targetRect.top + "px";
          layer.style.bottom = windowHeight - targetRect.bottom + "px";
          layer.style.maxHeight = targetRect.height;
          layer.style.maxWidth = Math.min(layerRect.width, windowWidth);
        }
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
    return function () {
      if (onClickOutside) {
        document.removeEventListener('mousedown', onClickDocument);
      }
    };
  }, [containerTarget, layerTarget, onClickOutside, portalContext, portalId]);
  var content = /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledContainer, _extends({
    ref: ref || containerRef,
    background: background,
    elevation: theme.layer.container.elevation
    // layerOptions was created to preserve backwards compatibility but
    // should not be supported in v3. In v3, this should always be
    // ${id}__container
    ,
    id: layerOptions && layerOptions.singleId ? id + "__container" : id,
    full: full,
    margin: margin,
    modal: modal
  }, rest, {
    position: position,
    plain: plain,
    responsive: responsive,
    layerTarget: layerTarget,
    dir: theme.dir
    // portalId is used to determine if click occurred inside
    // or outside of the layer
    ,
    "data-g-portal-id": portalId
  }), /*#__PURE__*/_react["default"].createElement(HiddenAnchor, {
    ref: anchorRef,
    tabIndex: "-1",
    "aria-hidden": "true"
  }), children);
  content = /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledLayer, {
    ref: layerRef,
    id: id,
    plain: plain,
    position: position,
    responsive: responsive,
    layerTarget: layerTarget,
    tabIndex: "-1",
    dir: theme.dir
  }, modal && /*#__PURE__*/_react["default"].createElement(_StyledLayer.StyledOverlay, {
    plain: plain,
    responsive: responsive,
    onMouseDown: onClickOutside
  }), content);
  if (onEsc) {
    content = /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
      onEsc: onEsc ? function (event) {
        // prevent further capturing or bubbling of event to other
        // child or parent elements
        event.stopPropagation();
        onEsc(event);
      } : undefined,
      target: modal === false ? 'document' : undefined
    }, content);
  }
  var themeContextValue = (0, _react.useMemo)(function () {
    var dark = (0, _utils.backgroundIsDark)(theme.layer.background, theme);
    return _extends({}, theme, {
      dark: dark
    });
  }, [theme]);
  if (theme.layer.background) {
    var dark = themeContextValue.dark;
    if (dark !== undefined && dark !== theme.dark) {
      content = /*#__PURE__*/_react["default"].createElement(_styledComponents.ThemeContext.Provider, {
        value: themeContextValue
      }, content);
    }
  }
  content = /*#__PURE__*/_react["default"].createElement(_utils.PortalContext.Provider, {
    value: nextPortalContext
  }, content);
  var hitResponsiveBreakpoint = responsive && size === theme.layer.responsiveBreakpoint;
  // if layer is responsive and we've hit the breakpoint,
  // the layer will be filling the viewport, so we want to
  // restrict the scroll to the layer and not allow the
  // body to scroll
  if (modal || hitResponsiveBreakpoint) {
    content = /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      hidden: position === 'hidden'
      // if layer has a target, do not restrict scroll.
      // restricting scroll could inhibit the user's
      // ability to scroll the page while the layer is open.
      ,
      restrictScroll: !layerTarget && (modal || hitResponsiveBreakpoint) ? true : undefined,
      trapFocus: true
    }, content);
  }
  return content;
});