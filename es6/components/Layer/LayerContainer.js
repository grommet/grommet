var _excluded = ["background", "children", "full", "id", "margin", "modal", "onClickOutside", "onEsc", "plain", "position", "responsive", "target"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FocusedContainer } from '../FocusedContainer';
import { Keyboard } from '../Keyboard';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { OptionsContext } from '../../contexts/OptionsContext';
import { ContainerTargetContext } from '../../contexts/ContainerTargetContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { backgroundIsDark, findVisibleParent, PortalContext, styledComponentsConfig } from '../../utils';
import { StyledLayer, StyledContainer, StyledOverlay } from './StyledLayer';
import { useThemeValue } from '../../utils/useThemeValue';

// The FocusSpan ensures the LayerContainer has focus when
// it is opened for user to start tabbing inside it.
// It helps for escaping the LayerContainer using the keyboard.
// It is hidden visually but still part of the accessibility tree.
var FocusSpan = styled.span.withConfig(styledComponentsConfig).withConfig({
  displayName: "LayerContainer__FocusSpan",
  componentId: "sc-1srj14c-0"
})(["width:0;height:0;overflow:hidden;position:absolute;clip-path:inset(50%);white-space:nowrap;border:0;&:focus{outline:none;}"]);
var LayerContainer = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var background = _ref.background,
    children = _ref.children,
    _ref$full = _ref.full,
    full = _ref$full === void 0 ? false : _ref$full,
    id = _ref.id,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? 'none' : _ref$margin,
    modal = _ref.modal,
    onClickOutside = _ref.onClickOutside,
    onEsc = _ref.onEsc,
    plain = _ref.plain,
    _ref$position = _ref.position,
    position = _ref$position === void 0 ? 'center' : _ref$position,
    _ref$responsive = _ref.responsive,
    responsive = _ref$responsive === void 0 ? true : _ref$responsive,
    layerTarget = _ref.target,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var containerTarget = useContext(ContainerTargetContext);
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var size = useContext(ResponsiveContext);
  // layerOptions was created to preserve backwards compatibility but
  // should not be supported in v3
  var _useContext = useContext(OptionsContext),
    layerOptions = _useContext.layer;
  var focusSpanRef = useRef();
  var containerRef = useRef();
  var layerRef = useRef();
  var portalContext = useContext(PortalContext);
  var portalId = useMemo(function () {
    return portalContext.length;
  }, [portalContext]);
  var nextPortalContext = useMemo(function () {
    return [].concat(portalContext, [portalId]);
  }, [portalContext, portalId]);
  var sendAnalytics = useAnalytics();
  useEffect(function () {
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
  useEffect(function () {
    if (position !== 'hidden') {
      var node = layerRef.current || containerRef.current || ref.current;
      if (node && node.scrollIntoView) node.scrollIntoView();
      // Once layer is open we make sure it has focus so that you
      // can start tabbing inside the layer. If the caller put focus
      // on an element already, we honor that. Otherwise, we put
      // the focus on the hidden span.
      var element = document.activeElement;
      while (element) {
        if (element === containerRef.current) {
          // already have focus inside the container
          break;
        }
        element = element.parentElement;
      }
      if (modal && !element && focusSpanRef.current) {
        focusSpanRef.current.focus();
      }
    }
  }, [modal, position, ref]);
  useEffect(function () {
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
        var target = findVisibleParent(layerTarget);
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
  var content = /*#__PURE__*/React.createElement(StyledContainer, _extends({
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
  }, passThemeFlag, rest, {
    position: position,
    plain: plain,
    responsive: responsive,
    layerTarget: layerTarget,
    dir: theme.dir
    // portalId is used to determine if click occurred inside
    // or outside of the layer
    ,
    "data-g-portal-id": portalId
  }), /*#__PURE__*/React.createElement(FocusSpan, {
    ref: focusSpanRef,
    tabIndex: "-1"
  }), children);
  content = /*#__PURE__*/React.createElement(StyledLayer, _extends({
    ref: layerRef,
    id: id,
    plain: plain,
    position: position,
    responsive: responsive,
    layerTarget: layerTarget,
    tabIndex: "-1",
    dir: theme.dir
  }, passThemeFlag), modal && /*#__PURE__*/React.createElement(StyledOverlay, _extends({
    plain: plain,
    responsive: responsive,
    onMouseDown: onClickOutside
  }, passThemeFlag)), content);
  if (onEsc) {
    content = /*#__PURE__*/React.createElement(Keyboard, {
      onEsc: onEsc ? function (event) {
        // prevent further capturing or bubbling of event to other
        // child or parent elements
        event.stopPropagation();
        onEsc(event);
      } : undefined,
      target: modal === false ? 'document' : undefined
    }, content);
  }
  var themeContextValue = useMemo(function () {
    var dark = backgroundIsDark(theme.layer.background, theme);
    return _extends({}, theme, {
      dark: dark
    });
  }, [theme]);
  if (theme.layer.background) {
    var dark = themeContextValue.dark;
    if (dark !== undefined && dark !== theme.dark) {
      content = /*#__PURE__*/React.createElement(ThemeContext.Provider, {
        value: themeContextValue
      }, content);
    }
  }
  content = /*#__PURE__*/React.createElement(PortalContext.Provider, {
    value: nextPortalContext
  }, content);
  var hitResponsiveBreakpoint = responsive && size === theme.layer.responsiveBreakpoint;
  // if layer is responsive and we've hit the breakpoint,
  // the layer will be filling the viewport, so we want to
  // restrict the scroll to the layer and not allow the
  // body to scroll
  if (modal || hitResponsiveBreakpoint) {
    content = /*#__PURE__*/React.createElement(FocusedContainer, {
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
export { LayerContainer };