import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Drop } from '../Drop';
import { Grid } from '../Grid';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle } from '../../utils';
import { Swatch } from './Swatch';
var DetailControl = styled(Box).withConfig({
  displayName: "Detail__DetailControl",
  componentId: "huiwg9-0"
})(["&:focus{", "}"], focusStyle());

var Detail = function Detail(_ref) {
  var activeProperty = _ref.activeProperty,
      axis = _ref.axis,
      data = _ref.data,
      pad = _ref.pad,
      series = _ref.series,
      seriesStyles = _ref.seriesStyles,
      renderValue = _ref.renderValue;

  var _useState = useState(),
      detailIndex = _useState[0],
      setDetailIndex = _useState[1];

  var activeIndex = useRef();
  var detailRefs = useMemo(function () {
    return [];
  }, []);
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Keyboard, {
    onLeft: function onLeft() {
      if (detailIndex === undefined) setDetailIndex(data.length - 1);else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
    },
    onRight: function onRight() {
      if (detailIndex === undefined) setDetailIndex(0);else if (detailIndex < data.length - 1) setDetailIndex(detailIndex + 1);
    }
  }, /*#__PURE__*/React.createElement(DetailControl, {
    key: "band",
    tabIndex: 0,
    direction: "row",
    fill: true,
    justify: "between",
    responsive: false,
    onFocus: function onFocus() {},
    onBlur: function onBlur() {
      return setDetailIndex(undefined);
    }
  }, data.map(function (_, i) {
    return /*#__PURE__*/React.createElement(Box // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      align: "center",
      responsive: false,
      pad: {
        horizontal: pad.horizontal
      },
      onMouseOver: function onMouseOver(event) {
        activeIndex.current = event.currentTarget;
        setDetailIndex(i);
      },
      onMouseLeave: onMouseLeave,
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, /*#__PURE__*/React.createElement(Box, {
      ref: function ref(c) {
        detailRefs[i] = c;
      },
      fill: "vertical",
      border: detailIndex === i ? true : undefined
    }));
  }))), detailIndex !== undefined && detailRefs[detailIndex] && /*#__PURE__*/React.createElement(Drop, {
    key: "drop",
    target: detailRefs[detailIndex],
    align: detailIndex > data.length / 2 ? {
      right: 'left'
    } : {
      left: 'right'
    },
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
    var property = _ref2.property;
    return !activeProperty || activeProperty === property || axis && axis.x && axis.x.property === property;
  }).map(function (serie) {
    var propertyStyle = seriesStyles[serie.property];
    return /*#__PURE__*/React.createElement(Fragment, {
      key: serie.property
    }, propertyStyle ? /*#__PURE__*/React.createElement(Swatch, propertyStyle) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, serie.label || serie.property), /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold"
    }, renderValue(serie, detailIndex)));
  })))));
};

export { Detail };