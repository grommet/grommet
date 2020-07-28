import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
var customTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: {
        dark: 'neutral-2',
        light: 'neutral-2'
      },
      border: {
        radius: '10px'
      },
      zIndex: '13'
    }
  }
});

var Custom = function Custom() {
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

storiesOf('Drop', module).add('Custom', function () {
  return /*#__PURE__*/React.createElement(Custom, null);
});