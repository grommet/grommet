function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { Fragment, useCallback, useContext, useMemo, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { Grid } from '../Grid';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle, parseMetricToNum, unfocusStyle } from '../../utils';
import { Swatch } from './Swatch';
var DetailControl = styled(Box).withConfig({
  displayName: "Detail__DetailControl",
  componentId: "sc-huiwg9-0"
})(["&:focus{", "}&:focus:not(:focus-visible){", "}"], focusStyle(), unfocusStyle());
var Detail = function Detail(_ref) {
  var activeProperty = _ref.activeProperty,
    axis = _ref.axis,
    data = _ref.data,
    horizontalProp = _ref.horizontal,
    padProp = _ref.pad,
    series = _ref.series,
    seriesStyles = _ref.seriesStyles,
    renderValue = _ref.renderValue,
    thickness = _ref.thickness;
  var theme = useContext(ThemeContext) || defaultProps.theme;
  var _useState = useState(),
    detailIndex = _useState[0],
    setDetailIndex = _useState[1];
  var activeIndex = useRef();
  var detailRefs = useMemo(function () {
    return [];
  }, []);
  var pad = useMemo(function () {
    // ensure the hit targets and center lines align with
    // the data/guide lines
    var horizontal = (padProp == null ? void 0 : padProp.horizontal) || typeof padProp === 'string' && padProp || 0;
    horizontal = theme.global.edgeSize[horizontal] || horizontal;
    horizontal = parseMetricToNum(horizontal);
    var vertical = (padProp == null ? void 0 : padProp.vertical) || typeof padProp === 'string' && padProp || 0;
    vertical = theme.global.edgeSize[vertical] || vertical;
    vertical = parseMetricToNum(vertical);
    return {
      horizontal: horizontal - parseMetricToNum(thickness) / 2 + "px",
      vertical: vertical + "px"
    };
  }, [padProp, theme.global.edgeSize, thickness]);
  var onMouseLeave = useCallback(function (event) {
    // Only remove detail if the mouse isn't over the active index.
    // This helps distinguish leaving the drop on the edge where it is
    // anchored.
    var rect = activeIndex.current.getBoundingClientRect();
    if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top || event.pageY > rect.bottom) {
      activeIndex.current = undefined;
      setDetailIndex(undefined);
    }
  }, []);
  var dropAlign = useMemo(function () {
    var res;
    if (detailIndex > data.length / 2) {
      if (horizontalProp) res = {
        bottom: 'top'
      };else res = {
        right: 'left'
      };
    } else if (horizontalProp) res = {
      top: 'bottom'
    };else res = {
      left: 'right'
    };
    return res;
  }, [data.length, detailIndex, horizontalProp]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: function onLeft() {
      if (detailIndex === undefined) setDetailIndex(data.length - 1);else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
    },
    onRight: function onRight() {
      if (detailIndex === undefined) setDetailIndex(0);else if (detailIndex < data.length - 1) setDetailIndex(detailIndex + 1);
    }
  }, /*#__PURE__*/React.createElement(DetailControl, _extends({
    key: "band",
    tabIndex: 0,
    fill: true,
    justify: "between",
    responsive: false
  }, horizontalProp ? {
    direction: 'column'
  } : {
    direction: 'row',
    pad: pad
  }, {
    onFocus: function onFocus() {},
    onBlur: function onBlur() {
      return setDetailIndex(undefined);
    }
  }), data.map(function (_, i) {
    var ref = function ref(c) {
      detailRefs[i] = c;
    };
    return /*#__PURE__*/React.createElement(Box
    // eslint-disable-next-line react/no-array-index-key
    , _extends({
      key: i,
      responsive: false
    }, horizontalProp ? {
      justify: 'center',
      height: thickness
    } : {
      align: 'center',
      width: thickness
    }, {
      onMouseOver: function onMouseOver(event) {
        activeIndex.current = event.currentTarget;
        setDetailIndex(i);
      },
      onMouseLeave: onMouseLeave,
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }), /*#__PURE__*/React.createElement(Box
    // for horizontal, ref will be placed on child box so
    // drop is restricted to drop dimensions as opposed
    // to filling the chart width
    , _extends({}, horizontalProp ? {
      fill: 'horizontal'
    } : {
      ref: ref,
      fill: 'vertical'
    }, {
      border: detailIndex === i ? true : undefined
    }), horizontalProp ? /*#__PURE__*/React.createElement(Box, {
      alignSelf: "center",
      ref: ref
    }) : null));
  }))), detailIndex !== undefined && detailRefs[detailIndex] && /*#__PURE__*/React.createElement(Drop, {
    key: "drop",
    target: detailRefs[detailIndex],
    align: dropAlign,
    plain: true,
    onMouseLeave: onMouseLeave
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    background: {
      color: 'background-back'
    }
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: ['auto', 'auto', 'auto'],
    gap: "xsmall",
    align: "center"
  }, series.filter(function (_ref2) {
    var _data$detailIndex;
    var property = _ref2.property;
    return (!activeProperty || activeProperty === property) && (data == null || (_data$detailIndex = data[detailIndex]) == null ? void 0 : _data$detailIndex[property]) !== undefined || axis && axis.x && axis.x.property === property;
  }).map(function (serie) {
    var propertyStyle = seriesStyles[serie.property];
    var axisValue = horizontalProp ? data[detailIndex][serie.property] : detailIndex;
    return /*#__PURE__*/React.createElement(Fragment, {
      key: serie.property
    }, propertyStyle ? /*#__PURE__*/React.createElement(Swatch, propertyStyle) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, serie.label || serie.property), /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, renderValue(serie, axisValue)));
  })))));
};
export { Detail };