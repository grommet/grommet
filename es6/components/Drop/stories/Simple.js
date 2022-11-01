import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop } from 'grommet';
var align = {
  top: 'bottom',
  left: 'left'
};
var SimpleDrop = function SimpleDrop() {
  var targetRef = useRef();
  var _useState = useState(false),
    setShowDrop = _useState[1];
  useEffect(function () {
    setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "dark-2",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: targetRef
    }, "Target"), targetRef.current && /*#__PURE__*/React.createElement(Drop, {
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "Drop Contents")))
    // </Grommet>
  );
};

export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(SimpleDrop, null);
};
Simple.parameters = {
  chromatic: {
    disable: true
  }
};
Simple.args = {
  full: true
};
export default {
  title: 'Controls/Drop/Simple'
};