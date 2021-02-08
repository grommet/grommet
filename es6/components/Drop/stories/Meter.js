import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Grommet, Meter } from 'grommet';
import { grommet } from 'grommet/themes';

var TestDrop = function TestDrop() {
  var targetRef = useRef();

  var _useState = useState(false),
      setShowDrop = _useState[1];

  useEffect(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
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
      color: 'accent-1'
    }]
  }), targetRef.current && /*#__PURE__*/React.createElement(Drop, {
    id: "test-drop-with-svg",
    plain: true,
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, "target is an svg"))));
};

export var SVGChild = function SVGChild() {
  return /*#__PURE__*/React.createElement(TestDrop, null);
};
SVGChild.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/SVG Child'
};