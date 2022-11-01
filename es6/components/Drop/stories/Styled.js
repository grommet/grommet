import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop } from 'grommet';
var alignBottomLeft = {
  top: 'bottom',
  left: 'left'
};
var alignTopLeft = {
  bottom: 'top',
  left: 'left'
};
var StyledDrop = function StyledDrop() {
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
    }, "Target"), targetRef.current && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Drop, {
      align: alignBottomLeft,
      target: targetRef.current,
      elevation: "large",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "Drop Contents with elevation and margin")), /*#__PURE__*/React.createElement(Drop, {
      align: alignTopLeft,
      target: targetRef.current,
      round: "large",
      background: "background-contrast",
      margin: {
        bottom: 'small'
      }
    }, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, "Drop Contents with round, background and margin"))))
    // </Grommet>
  );
};

export var Styled = function Styled() {
  return /*#__PURE__*/React.createElement(StyledDrop, null);
};
Styled.parameters = {
  chromatic: {
    disable: true
  }
};
Styled.args = {
  full: true
};
export default {
  title: 'Controls/Drop/Styled'
};