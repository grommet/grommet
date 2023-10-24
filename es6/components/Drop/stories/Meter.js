import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Meter } from 'grommet';
var align = {
  top: 'bottom',
  left: 'left'
};
var TestDrop = function TestDrop() {
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
      fill: true,
      align: "center",
      justify: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Meter, {
      ref: targetRef,
      size: "small",
      background: "light-2",
      values: [{
        value: 20,
        color: 'brand'
      }]
    }), targetRef.current && /*#__PURE__*/React.createElement(Drop, {
      id: "test-drop-with-svg",
      plain: true,
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "target is an svg")))
    // </Grommet>
  );
};

export var SVGChild = function SVGChild() {
  return /*#__PURE__*/React.createElement(TestDrop, null);
};
SVGChild.parameters = {
  chromatic: {
    disable: true
  }
};
SVGChild.storyName = 'SVG child';
SVGChild.args = {
  full: true
};
export default {
  title: 'Controls/Drop/SVG child'
};