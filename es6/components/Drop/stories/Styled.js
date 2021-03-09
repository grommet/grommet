import React, { useEffect, useRef, useState } from 'react';
import { Box, Drop, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

var StyledDrop = function StyledDrop() {
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
  }, "Target"), targetRef.current && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Drop, {
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current,
    elevation: "large",
    margin: {
      top: 'medium'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, "Drop Contents with elevation and margin")), /*#__PURE__*/React.createElement(Drop, {
    align: {
      bottom: 'top',
      left: 'left'
    },
    target: targetRef.current,
    round: "large",
    background: "background-contrast",
    margin: {
      bottom: 'small'
    }
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, "Drop Contents with round, background and margin")))));
};

export var Styled = function Styled() {
  return /*#__PURE__*/React.createElement(StyledDrop, null);
};
Styled.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Drop/Styled'
};