import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop } from 'grommet';
var align = {
  top: 'bottom',
  left: 'left'
};
var InlineDrop = function InlineDrop() {
  var targetRef = useRef();

  // trigger re-render so we have the targetRef
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
    }, "Target", targetRef.current && /*#__PURE__*/React.createElement(Drop, {
      container: "inline",
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "Drop Contents"))))
    // </Grommet>
  );
};

export var Inline = function Inline() {
  return /*#__PURE__*/React.createElement(InlineDrop, null);
};
Inline.parameters = {
  chromatic: {
    disable: true
  }
};
Inline.args = {
  full: true
};
export default {
  title: 'Controls/Drop/Inline'
};