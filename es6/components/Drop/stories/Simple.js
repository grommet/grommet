import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleDrop = function SimpleDrop() {
  var targetRef = useRef();

  var _useState = useState(false),
      setShowDrop = _useState[1];

  useEffect(function () {
    setShowDrop(true);
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
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
  }, "Target"), targetRef.current && /*#__PURE__*/React.createElement(Drop, {
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, "Drop Contents"))));
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleDrop, null);
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/Simple'
};