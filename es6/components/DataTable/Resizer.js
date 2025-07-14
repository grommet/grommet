function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

// Added a temporary min-width of 2px here so that the element doesn't
// end up with a width of 0px. This is a placeholder solution until we
// revisit this in https://github.com/grommet/grommet/issues/7273
var InteractionBox = styled(Button).withConfig({
  displayName: "Resizer__InteractionBox",
  componentId: "sc-8l808w-0"
})(["min-width:2px;cursor:col-resize;> *{opacity:0;}", " &:hover{> *{opacity:1;}}"], function (props) {
  return props.active && '> * { opacity: 1; }';
});
var Resizer = function Resizer(_ref) {
  var onResize = _ref.onResize,
    property = _ref.property,
    headerText = _ref.headerText,
    messages = _ref.messages;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = useState(),
    start = _useState2[0],
    setStart = _useState2[1];
  var _useState3 = useState(),
    width = _useState3[0],
    setWidth = _useState3[1];
  var ref = useRef();
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var onMouseDown = useCallback(function (event) {
    if (ref.current) {
      var element = ref.current;
      // find TH parent
      while (element && element.nodeName !== 'TH') element = element.parentNode;
      var rect = element.getBoundingClientRect();
      setStart(event.clientX);
      setWidth(rect.width);
      setActive(true);
    }
  }, []);
  var onMouseMove = useCallback(function (event) {
    // We determined 12 empirically as being wide enough to hit but
    // not too wide to cause false hits.
    var nextWidth = Math.max(12, width + (event.clientX - start));
    onResize(property, nextWidth);
  }, [onResize, property, start, width]);
  var onMouseUp = useCallback(function () {
    setActive(false);
    setStart(undefined);
    setWidth(undefined);
  }, []);
  useEffect(function () {
    var remove = function remove() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
    if (active) {
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
      return remove;
    }
    remove();
    return undefined;
  }, [active, onMouseMove, onMouseUp]);
  var border;
  if (theme.dataTable.resize.hover && theme.dataTable.resize.hover.border) {
    var _theme$dataTable$resi = theme.dataTable.resize.hover.border,
      color = _theme$dataTable$resi.color,
      _theme$dataTable$resi2 = _theme$dataTable$resi.side,
      side = _theme$dataTable$resi2 === void 0 ? 'end' : _theme$dataTable$resi2,
      size = _theme$dataTable$resi.size;
    border = {
      color: color,
      side: side,
      size: size
    };
  }
  var onKeyDown = useCallback(function (event) {
    event.preventDefault();
    if (!ref.current) return;
    var element = ref.current;
    while (element && element.nodeName !== 'TH') element = element.parentNode;
    var currentWidth = element.getBoundingClientRect().width;
    // Used 12 here to align with the value set in onMouseMove
    var delta = event.key === 'ArrowLeft' ? -12 : 12;
    onResize(property, currentWidth + delta);
  }, [onResize, property]);
  return /*#__PURE__*/React.createElement(Stack, {
    anchor: "right",
    interactiveChild: "last"
  }, /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    responsive: false,
    pad: {
      vertical: 'small'
    }
  }, theme.dataTable.resize)), /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: onKeyDown,
    onRight: onKeyDown
  }, /*#__PURE__*/React.createElement(InteractionBox, {
    "aria-label": format({
      id: 'dataTable.resizerAria',
      values: {
        headerText: headerText
      },
      messages: messages
    }),
    active: active,
    flex: false,
    pad: {
      left: 'xsmall'
    },
    margin: {
      top: 'xsmall'
    },
    ref: ref,
    responsive: false,
    onMouseDown: onMouseDown,
    onMouseMove: start !== undefined ? onMouseMove : undefined,
    onMouseUp: start !== undefined ? onMouseUp : undefined
  }, /*#__PURE__*/React.createElement(Box, {
    pad: {
      vertical: 'small'
    },
    border: border
  }))));
};
Resizer.displayName = 'Resizer';
export { Resizer };