import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleDrop = function SimpleDrop() {
  var targetRef = useRef();

  var _useState = useState(false),
      setShowDrop = _useState[1];

  useEffect(function () {
    setShowDrop(true);
  }, []);
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, React.createElement(Box, {
    background: "dark-3",
    pad: "medium",
    align: "center",
    justify: "start",
    ref: targetRef
  }, "Target"), targetRef.current && React.createElement(Drop, {
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current
  }, React.createElement(Box, {
    pad: "large"
  }, "Drop Contents"))));
};

storiesOf('Drop', module).add('Simple', function () {
  return React.createElement(SimpleDrop, null);
});