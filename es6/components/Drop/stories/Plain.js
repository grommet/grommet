import React, { useEffect, useRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var PlainDrop = function PlainDrop() {
  var targetRef = useRef();

  var _useState = useState(false),
      setShowDrop = _useState[1];

  useEffect(function () {
    return setShowDrop(true);
  }, []);
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    background: "brand",
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
    plain: true,
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current
  }, React.createElement(Box, {
    pad: "large"
  }, "No background no shadow"))));
};

storiesOf('Drop', module).add('Plain', function () {
  return React.createElement(PlainDrop, null);
});