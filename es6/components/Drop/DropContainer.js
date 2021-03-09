function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { ThemeContext } from 'styled-components';
import { FocusedContainer } from '../FocusedContainer';
import { backgroundIsDark, findScrollParents, parseMetricToNum, PortalContext } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { StyledDrop } from './StyledDrop'; // using react synthetic event to be able to stop propagation that
// would otherwise close the layer on ESC.

var preventLayerClose = function preventLayerClose(event) {
  var key = event.keyCode ? event.keyCode : event.which;

  if (key === 27) {
    event.stopPropagation();
  }
};

var defaultAlign = {
  top: 'top',
  left: 'left'
};
var defaultPortalContext = [];
var DropContainer = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var _ref$align = _ref.align,
      align = _ref$align === void 0 ? defaultAlign : _ref$align,
      background = _ref.background,
      onAlign = _ref.onAlign,
      children = _ref.children,
      dropTarget = _ref.dropTarget,
      elevation = _ref.elevation,
      onClickOutside = _ref.onClickOutside,
      onEsc = _ref.onEsc,
      onKeyDown = _ref.onKeyDown,
      _ref$overflow = _ref.overflow,
      overflow = _ref$overflow === void 0 ? 'auto' : _ref$overflow,
      plain = _ref.plain,
      responsive = _ref.responsive,
      restrictFocus = _ref.restrictFocus,
      _ref$stretch = _ref.stretch,
      stretch = _ref$stretch === void 0 ? 'width' : _ref$stretch,
      trapFocus = _ref.trapFocus,
      rest = _objectWithoutPropertiesLoose(_ref, ["align", "background", "onAlign", "children", "dropTarget", "elevation", "onClickOutside", "onEsc", "onKeyDown", "overflow", "plain", "responsive", "restrictFocus", "stretch", "trapFocus"]);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  var portalContext = useContext(PortalContext) || defaultPortalContext;
  var portalId = useMemo(function () {
    return portalContext.length;
  }, [portalContext]);
  var nextPortalContext = useMemo(function () {
    return [].concat(portalContext, [portalId]);
  }, [portalContext, portalId]);
  var dropRef = useRef();
  useEffect(function () {
    var notifyAlign = function notifyAlign() {
      var styleCurrent = (ref || dropRef).current.style;
      var alignControl = styleCurrent.top !== '' ? 'top' : 'bottom';
      onAlign(alignControl);
    }; // We try to preserve the maxHeight as changing it causes any scroll
    // position to be lost. We set the maxHeight on mount and if the window
    // is resized.


    var place = function place(preserveHeight) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var target = dropTarget;
      var container = (ref || dropRef).current;

      if (container && target) {
        // clear prior styling
        container.style.left = '';
        container.style.top = '';
        container.style.bottom = '';
        container.style.width = '';

        if (!preserveHeight) {
          container.style.maxHeight = '';
        } // get bounds


        var targetRect = target.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect(); // determine width

        var width;

        if (stretch) {
          width = Math.min(stretch === 'align' ? Math.min(targetRect.width, containerRect.width) : Math.max(targetRect.width, containerRect.width), windowWidth);
        } else {
          width = Math.min(containerRect.width, windowWidth);
        } // set left position


        var left;

        if (align.left) {
          if (align.left === 'left') {
            left = targetRect.left;
          } else if (align.left === 'right') {
            left = targetRect.left + targetRect.width;
          }
        } else if (align.right) {
          if (align.right === 'left') {
            left = targetRect.left - width;
          } else if (align.right === 'right') {
            left = targetRect.left + targetRect.width - width;
          }
        } else {
          left = targetRect.left + targetRect.width / 2 - width / 2;
        }

        if (left + width > windowWidth) {
          left -= left + width - windowWidth;
        } else if (left < 0) {
          left = 0;
        } // set top or bottom position


        var top;
        var bottom;
        var maxHeight = containerRect.height;

        if (align.top) {
          if (align.top === 'top') {
            top = targetRect.top;
          } else {
            top = targetRect.bottom;
          } // Calculate visible area underneath the control w.r.t window height


          var percentVisibleAreaBelow = 100 - targetRect.bottom / windowHeight * 100; // Check whether it is within 20% from bottom of the window or
          // visible area to flip the control
          // DropContainer doesn't fit well within visible area when
          // percentVisibleAreaBelow value<=20%
          // There is enough space from DropContainer to bottom of the window
          // when percentVisibleAreaBelow>20%.

          if (windowHeight === top || percentVisibleAreaBelow <= 20) {
            // We need more room than we have.
            // We put it below, but there's more room above, put it above
            top = '';

            if (align.top === 'bottom') {
              bottom = targetRect.top;
            } else {
              bottom = targetRect.bottom;
            }

            maxHeight = bottom;
            container.style.maxHeight = maxHeight + "px";
          } else if (top > 0) {
            maxHeight = windowHeight - top;
            container.style.maxHeight = maxHeight + "px";
          } else {
            maxHeight = windowHeight - top;
          }
        } else if (align.bottom) {
          if (align.bottom === 'bottom') {
            bottom = targetRect.bottom;
          } else {
            bottom = targetRect.top;
          }

          maxHeight = bottom;
          container.style.maxHeight = maxHeight + "px";
        } else {
          // center
          top = targetRect.top + targetRect.height / 2 - containerRect.height / 2;
          maxHeight = windowHeight - top;
        } // if we can't fit it all, or we're rather close,
        // see if there's more room the other direction


        if (responsive && (containerRect.height > maxHeight || maxHeight < windowHeight / 10)) {
          // We need more room than we have.
          if (align.top && top > windowHeight / 2) {
            // We put it below, but there's more room above, put it above
            top = '';

            if (align.top === 'bottom') {
              // top = Math.max(targetRect.top - containerRect.height, 0);
              // maxHeight = targetRect.top - top;
              bottom = targetRect.top;
            } else {
              // top = Math.max(targetRect.bottom - containerRect.height, 0);
              // maxHeight = targetRect.bottom - top;
              bottom = targetRect.bottom;
            }

            maxHeight = bottom;
          } else if (align.bottom && maxHeight < windowHeight / 2) {
            // We put it above but there's more room below, put it below
            bottom = '';

            if (align.bottom === 'bottom') {
              top = targetRect.top;
            } else {
              top = targetRect.bottom;
            }

            maxHeight = windowHeight - top;
          }
        }

        container.style.left = left + "px";

        if (stretch) {
          // offset width by 0.1 to avoid a bug in ie11 that
          // unnecessarily wraps the text if width is the same
          // NOTE: turned off for now
          container.style.width = width + 0.1 + "px";
        } // the (position:absolute + scrollTop)
        // is presenting issues with desktop scroll flickering


        if (top !== '') {
          container.style.top = top + "px";
        }

        if (bottom !== '') {
          container.style.bottom = windowHeight - bottom + "px";
        }

        if (!preserveHeight) {
          if (theme.drop && theme.drop.maxHeight) {
            maxHeight = Math.min(maxHeight, parseMetricToNum(theme.drop.maxHeight));
          }

          container.style.maxHeight = maxHeight + "px";
        }
      }

      if (onAlign) notifyAlign();
    };

    var scrollParents;

    var addScrollListeners = function addScrollListeners() {
      scrollParents = findScrollParents(dropTarget);
      scrollParents.forEach(function (scrollParent) {
        return scrollParent.addEventListener('scroll', place);
      });
    };

    var removeScrollListeners = function removeScrollListeners() {
      scrollParents.forEach(function (scrollParent) {
        return scrollParent.removeEventListener('scroll', place);
      });
      scrollParents = [];
    };

    var onClickDocument = function onClickDocument(event) {
      // determine which portal id the target is in, if any
      var clickedPortalId = null;
      var node = event.target;

      while (clickedPortalId === null && node !== document) {
        var attr = node.getAttribute('data-g-portal-id');
        if (attr !== null) clickedPortalId = parseInt(attr, 10);
        node = node.parentNode;
      }

      if (clickedPortalId === null || portalContext.indexOf(clickedPortalId) !== -1) {
        onClickOutside(event);
      }
    };

    var onResize = function onResize() {
      removeScrollListeners();
      addScrollListeners();
      place(false);
    };

    addScrollListeners();
    window.addEventListener('resize', onResize);

    if (onClickOutside) {
      document.addEventListener('mousedown', onClickDocument);
    }

    place(false);
    return function () {
      removeScrollListeners();
      window.removeEventListener('resize', onResize);

      if (onClickOutside) {
        document.removeEventListener('mousedown', onClickDocument);
      }
    };
  }, [align, onAlign, dropTarget, onClickOutside, portalContext, portalId, ref, responsive, restrictFocus, stretch, theme.drop]);
  useEffect(function () {
    if (restrictFocus) {
      (ref || dropRef).current.focus();
    }
  }, [ref, restrictFocus]);
  var content = /*#__PURE__*/React.createElement(StyledDrop, _extends({
    ref: ref || dropRef,
    as: Box,
    background: background,
    plain: plain,
    elevation: !plain ? elevation || theme.global.drop.elevation || theme.global.drop.shadowSize || // backward compatibility
    'small' : undefined,
    tabIndex: "-1",
    alignProp: align,
    overflow: overflow,
    "data-g-portal-id": portalId
  }, rest), children);

  if (background || theme.global.drop.background) {
    var dark = backgroundIsDark(background || theme.global.drop.background, theme);

    if (dark !== undefined && dark !== theme.dark) {
      content = /*#__PURE__*/React.createElement(ThemeContext.Provider, {
        value: _extends({}, theme, {
          dark: dark
        })
      }, content);
    }
  }

  return /*#__PURE__*/React.createElement(PortalContext.Provider, {
    value: nextPortalContext
  }, /*#__PURE__*/React.createElement(FocusedContainer, {
    onKeyDown: onEsc && preventLayerClose,
    trapFocus: trapFocus
  }, /*#__PURE__*/React.createElement(Keyboard // should capture keyboard event before other elements,
  // such as Layer
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  , {
    capture: true,
    onEsc: onEsc ? function (event) {
      event.stopPropagation();
      onEsc(event);
    } : undefined,
    onKeyDown: onKeyDown,
    target: "document"
  }, content)));
});
export { DropContainer };