import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: {
        dark: 'neutral-2',
        light: 'background-contrast'
      },
      border: {
        radius: '10px'
      },
      // impacting 'round' behavior
      zIndex: '13',
      elevation: 'large',
      // impacting the elevation
      margin: 'xsmall',
      intelligentMargin: true
    }
  }
});

var ThemedDrop = function ThemedDrop() {
  var _useState = useState(false),
      setShowDrop = _useState[1];

  var targetRef = useRef();
  useEffect(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Box"), targetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      top: 'bottom',
      left: 'right'
    },
    target: targetRef.current
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small"
  }, "This Drop uses a custom theme"))));
};

export var Themed = function Themed() {
  return /*#__PURE__*/React.createElement(ThemedDrop, null);
};
Themed.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/Themed'
};