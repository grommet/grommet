import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Add } from 'grommet-icons/icons/Add';
import { Subtract } from 'grommet-icons/icons/Subtract';
import { Box } from '../Box';
import { Button } from '../Button';
import { DropButton } from '../DropButton';
import { Keyboard } from '../Keyboard';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

// We determined 12 empirically as being wide enough to hit but
// not too wide to cause false hits.
var STEP = 12; // Used to determine the width change on resize

var StyledResizer = styled(DropButton).withConfig({
  displayName: "Resizer__StyledResizer",
  componentId: "sc-8l808w-0"
})(["display:flex;justify-content:center;padding-top:", ";padding-bottom:", ";margin-right:-", ";position:absolute;right:0;width:24px;height:100%;top:0;cursor:col-resize;z-index:1;"], function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return props.theme.global.edgeSize.xsmall;
}, function (props) {
  return props.theme.global.edgeSize.small;
});
var Resizer = function Resizer(_ref) {
  var _theme$dataTable$icon, _theme$dataTable$icon2;
  var onResize = _ref.onResize,
    property = _ref.property,
    headerText = _ref.headerText,
    messages = _ref.messages,
    headerId = _ref.headerId;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = useState(),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = useState(0),
    width = _useState3[0],
    setWidth = _useState3[1];
  var ref = useRef();
  var thRef = useRef();
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var ResizeIncreaseIcon = ((_theme$dataTable$icon = theme.dataTable.icons) == null ? void 0 : _theme$dataTable$icon.resizeIncrease) || Add;
  var ResizeDecreaseIcon = ((_theme$dataTable$icon2 = theme.dataTable.icons) == null ? void 0 : _theme$dataTable$icon2.resizeDecrease) || Subtract;

  // Set the initial width based on the TH element's width and
  // store th element ref
  useEffect(function () {
    if (ref.current) {
      var element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      thRef.current = element;
      var rect = element.getBoundingClientRect();
      // Set initial width based on the TH element's width
      setWidth(rect.width);
    }
  }, []);
  var onResizeStart = useCallback(function (event) {
    var clientX = event.touches ? event.touches[0].clientX : event.clientX;
    if (thRef.current) {
      var element = thRef.current;
      var rect = element.getBoundingClientRect();
      setStart(clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);
  var onResizeMove = useCallback(function (event) {
    var clientX = event.touches ? event.touches[0].clientX : event.clientX;
    var nextWidth = Math.max(STEP, width + (clientX - start));
    onResize(property, nextWidth);
  }, [onResize, property, start, width]);
  var onResizeEnd = useCallback(function () {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);
  useEffect(function () {
    var remove = function remove() {
      document.removeEventListener('mouseup', onResizeEnd);
      document.removeEventListener('mousemove', onResizeMove);
      document.removeEventListener('touchend', onResizeEnd);
      document.removeEventListener('touchmove', onResizeMove);
    };
    if (active) {
      document.addEventListener('mouseup', onResizeEnd);
      document.addEventListener('mousemove', onResizeMove);
      document.addEventListener('touchend', onResizeEnd);
      document.addEventListener('touchmove', onResizeMove);
      return remove;
    }
    remove();
    return undefined;
  }, [active, onResizeMove, onResizeEnd]);
  var border;
  if (theme.dataTable.resize.border.color && theme.dataTable.resize.border.side) {
    var _theme$dataTable$resi = theme.dataTable.resize.border,
      color = _theme$dataTable$resi.color,
      _theme$dataTable$resi2 = _theme$dataTable$resi.side,
      side = _theme$dataTable$resi2 === void 0 ? 'end' : _theme$dataTable$resi2;
    border = {
      color: color,
      side: side
    };
  }
  var hoverBorder = border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    var _theme$dataTable$resi3 = theme.dataTable.resize.hover.border,
      _color = _theme$dataTable$resi3.color,
      _theme$dataTable$resi4 = _theme$dataTable$resi3.side,
      _side = _theme$dataTable$resi4 === void 0 ? 'end' : _theme$dataTable$resi4,
      size = _theme$dataTable$resi3.size;
    hoverBorder = {
      color: _color,
      side: _side,
      size: size
    };
  }
  var onKeyDown = useCallback(function (event) {
    event.preventDefault();
    if (!ref.current) return;
    if (thRef.current) {
      var element = thRef.current;
      var currentWidth = element.getBoundingClientRect().width;
      // Used STEP here to align with the value set in onMouseMove
      var delta = event.key === 'ArrowLeft' ? -STEP : STEP;
      onResize(property, currentWidth + delta);
      setWidth(currentWidth + delta);
    }
  }, [onResize, property]);
  var onDecrease = useCallback(function () {
    if (thRef.current) {
      var element = thRef.current;
      var rect = element.getBoundingClientRect();
      var currentWidth = rect.width;
      var nextWidth = Math.max(STEP, currentWidth - STEP);
      setWidth(nextWidth);
      onResize(property, nextWidth);
    }
  }, [onResize, property]);
  var onIncrease = useCallback(function () {
    if (thRef.current) {
      var element = thRef.current;
      var rect = element.getBoundingClientRect();
      var currentWidth = rect.width;
      var nextWidth = Math.max(STEP, currentWidth + STEP);
      setWidth(nextWidth);
      onResize(property, nextWidth);
    }
  }, [onResize, property]);
  var _useState4 = useState(false),
    hover = _useState4[0],
    setHover = _useState4[1];
  var ariaLabel = format({
    id: 'dataTable.resizerAria',
    values: {
      headerText: headerText
    },
    messages: messages
  });
  return /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: onKeyDown,
    onRight: onKeyDown
  }, /*#__PURE__*/React.createElement(StyledResizer, {
    "aria-label": width ? ariaLabel + " " + Math.trunc(width) + " pixels" : ariaLabel,
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    },
    ref: ref,
    role: "separator",
    "aria-valuenow": width,
    "aria-valuetext": width ? ariaLabel + " " + Math.trunc(width) + " pixels" : ariaLabel,
    "aria-controls": headerId,
    "aria-orientation": "vertical",
    onMouseDown: onResizeStart,
    onMouseMove: start !== undefined ? onResizeMove : undefined,
    onMouseUp: start !== undefined ? onResizeEnd : undefined,
    onTouchStart: onResizeStart,
    onTouchMove: start !== undefined ? onResizeMove : undefined,
    onTouchEnd: start !== undefined ? onResizeEnd : undefined,
    dropContent: /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Button, {
      "aria-label": format({
        id: 'dataTable.decrease',
        values: {
          headerText: headerText
        },
        messages: messages
      }),
      icon: /*#__PURE__*/React.createElement(ResizeDecreaseIcon, null),
      onClick: onDecrease,
      autoFocus: true
    }), /*#__PURE__*/React.createElement(Button, {
      "aria-label": format({
        id: 'dataTable.increase',
        values: {
          headerText: headerText
        },
        messages: messages
      }),
      icon: /*#__PURE__*/React.createElement(ResizeIncreaseIcon, null),
      onClick: onIncrease
    })),
    dropAlign: {
      top: 'bottom'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    border: hover || active ? hoverBorder : border,
    height: "100%",
    alignSelf: "center"
  })));
};
Resizer.displayName = 'Resizer';
export { Resizer };