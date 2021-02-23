import React, { useState } from 'react';
import { grommet } from 'grommet/themes';
import { Box, Button, Grommet, Paragraph, Spinner } from 'grommet';

var PageContent = function PageContent() {
  // 'show=true' will trigger the announcement
  var _useState = useState(false),
      show = _useState[0],
      setShow = _useState[1];

  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "center"
  }, "Spinner has a built in Screen Reader functionality to assist screen readers. An announcement of the given message prop will be announced to screen readers after the spinner component renders."), /*#__PURE__*/React.createElement(Button, {
    label: "Load",
    onClick: function onClick() {
      setShow(true);
      setTimeout(function () {
        setShow(false);
      }, 1500);
    }
  }), show && /*#__PURE__*/React.createElement(Spinner, {
    message: "Start Built-in Spinner Announcement"
  }));
};

export var Announced = function Announced() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(PageContent, null)));
};
Announced.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Visualizations/Spinner/Announced'
};