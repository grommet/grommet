import React from 'react';
import { grommet, Box, Button, Grommet, Layer, Spinner, Text } from 'grommet';
export var Modal = function Modal() {
  var _React$useState = React.useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = React.useState(false),
      isDataLoaded = _React$useState2[0],
      setIsDataLoaded = _React$useState2[1];

  var onOpen = function onOpen() {
    setOpen(true);
    setTimeout(function () {
      setOpen(undefined);
      setIsDataLoaded(true);
    }, 2000);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "center",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Load Data",
    onClick: onOpen
  }), isDataLoaded && /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Text, null, "Congrats! \uD83C\uDF89 "), /*#__PURE__*/React.createElement(Text, null, "Data is now loaded"))), open && /*#__PURE__*/React.createElement(Layer, null, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    gap: "small",
    direction: "row",
    alignSelf: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Spinner, null), /*#__PURE__*/React.createElement(Text, null, "Loading..."))));
};
Modal.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Spinner/Modal'
};