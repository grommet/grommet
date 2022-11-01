import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop } from 'grommet';
var align = {
  top: 'bottom',
  left: 'left'
};
var PlainDrop = function PlainDrop() {
  var targetRef = useRef();
  var _useState = useState(false),
    setShowDrop = _useState[1];
  useEffect(function () {
    return setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      background: "light-3",
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
      plain: true,
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "No background no shadow")))
    // </Grommet>
  );
};

export var Plain = function Plain() {
  return /*#__PURE__*/React.createElement(PlainDrop, null);
};
Plain.parameters = {
  chromatic: {
    disable: true
  }
};
Plain.args = {
  full: true
};
export default {
  title: 'Controls/Drop/Plain'
};