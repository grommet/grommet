function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Stack } from '../Stack';
var InteractionBox = styled(Box).withConfig({
  displayName: "Resizer__InteractionBox",
  componentId: "sc-8l808w-0"
})(["cursor:col-resize;> *{opacity:0;}", " &:hover{> *{opacity:1;}}"], function (props) {
  return props.active && '> * { opacity: 1; }';
});

var Resizer = function Resizer(_ref) {
  var onResize = _ref.onResize,
      property = _ref.property;
  var theme = useContext(ThemeContext) || defaultProps.theme;

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
  var onMouseDown = useCallback(function (event) {
    if (ref.current) {
      var element = ref.current; // find TH parent

      while (element && element.nodeName !== 'TH') {
        element = element.parentNode;
      }

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

  return /*#__PURE__*/React.createElement(Stack, {
    anchor: "right"
  }, /*#__PURE__*/React.createElement(Box, _extends({
    flex: false,
    responsive: false,
    pad: {
      vertical: 'small'
    }
  }, theme.dataTable.resize)), /*#__PURE__*/React.createElement(InteractionBox, {
    active: active,
    flex: false,
    pad: {
      left: 'xsmall'
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
  })));
};

Resizer.displayName = 'Resizer';
Resizer.defaultProps = {};
Object.setPrototypeOf(Resizer.defaultProps, defaultProps);
export { Resizer };