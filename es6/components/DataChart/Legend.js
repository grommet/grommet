function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Swatch } from './Swatch';

var Legend = function Legend(_ref) {
  var activeProperty = _ref.activeProperty,
      seriesProp = _ref.series,
      seriesStyles = _ref.seriesStyles,
      setActiveProperty = _ref.setActiveProperty;
  var series = useMemo(function () {
    return seriesProp.filter(function (s) {
      return seriesStyles[s.property];
    });
  }, [seriesProp, seriesStyles]);
  var interactive = useMemo( // filter out properties that are used in point chart aspects
  function () {
    return series.filter(function (_ref2) {
      var property = _ref2.property;
      return !seriesStyles[property].aspect;
    }).length > 1;
  }, [series, seriesStyles]);
  return /*#__PURE__*/React.createElement(Box, {
    margin: {
      top: 'small'
    },
    direction: "row",
    wrap: true,
    gap: "small"
  }, series.map(function (_ref3) {
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
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      gap: "xsmall"
    }, /*#__PURE__*/React.createElement(Swatch, _extends({}, seriesStyles[property], swatchProps)), /*#__PURE__*/React.createElement(Text, textProps, label || property));

    if (interactive) {
      content = /*#__PURE__*/React.createElement(Button, {
        key: property,
        active: isActive,
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