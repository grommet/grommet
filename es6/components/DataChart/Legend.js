function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Swatch } from './Swatch';
import { useThemeValue } from '../../utils/useThemeValue';
var Legend = function Legend(_ref) {
  var activeProperty = _ref.activeProperty,
    seriesProp = _ref.series,
    seriesStyles = _ref.seriesStyles,
    setActiveProperty = _ref.setActiveProperty;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var series = useMemo(function () {
    return seriesProp.filter(function (s) {
      return seriesStyles[s.property];
    });
  }, [seriesProp, seriesStyles]);
  var interactive = useMemo(
  // filter out properties that are used in point chart aspects
  function () {
    return series.filter(function (_ref2) {
      var property = _ref2.property;
      return !seriesStyles[property].aspect;
    }).length > 1;
  }, [series, seriesStyles]);
  return /*#__PURE__*/React.createElement(Box, {
    margin: theme.dataChart.legend.margin,
    direction: "row",
    wrap: true,
    gap: theme.dataChart.legend.gap
  }, series.map(function (_ref3) {
    var _theme$dataChart, _theme$dataChart2;
    var property = _ref3.property,
      label = _ref3.label;
    var isActive = property === activeProperty;
    var swatchProps = {};
    var textProps = {};
    if (activeProperty !== undefined) {
      if (!isActive) {
        // swatchProps.color = 'status-disabled';
        textProps.color = 'text-xweak';
      } else {
        textProps.color = 'text-strong';
      }
    }
    var content = /*#__PURE__*/React.createElement(Box, {
      key: property,
      direction: "row",
      align: "center",
      pad: (_theme$dataChart = theme.dataChart) == null || (_theme$dataChart = _theme$dataChart.legend) == null || (_theme$dataChart = _theme$dataChart.item) == null ? void 0 : _theme$dataChart.pad,
      gap: (_theme$dataChart2 = theme.dataChart) == null || (_theme$dataChart2 = _theme$dataChart2.legend) == null || (_theme$dataChart2 = _theme$dataChart2.item) == null ? void 0 : _theme$dataChart2.gap
    }, /*#__PURE__*/React.createElement(Swatch, _extends({}, seriesStyles[property], swatchProps)), /*#__PURE__*/React.createElement(Text, textProps, label || property));
    if (interactive) {
      content = /*#__PURE__*/React.createElement(Button, {
        key: property,
        active: isActive,
        "aria-pressed": isActive ? 'true' : 'false',
        onClick: function onClick() {
          return setActiveProperty(isActive ? undefined : property);
        },
        hoverIndicator: true
      }, content);
    }
    return content;
  }));
};
export { Legend };