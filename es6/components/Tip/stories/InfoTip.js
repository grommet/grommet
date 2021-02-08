import React from 'react';
import { grommet, Box, Button, Grommet, Text, Tip } from 'grommet';
import { HelpOption } from "grommet-icons/es6/icons/HelpOption";
import { CircleInformation } from "grommet-icons/es6/icons/CircleInformation";
export var Info = function Info() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    background: "background-back",
    gap: "large",
    pad: "large",
    align: "start"
  }, /*#__PURE__*/React.createElement(Tip, {
    content: /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      gap: "small",
      width: {
        max: 'small'
      }
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Information"), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "A battle is won by him who is firmly resolved to win it."), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "-Leo Tolstoy"))),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(CircleInformation, {
      size: "large"
    })
  })), /*#__PURE__*/React.createElement(Tip, {
    plain: true,
    content: /*#__PURE__*/React.createElement(Box, {
      pad: "small",
      gap: "small",
      width: {
        max: 'small'
      },
      round: "small",
      background: "background-front",
      responsive: false
    }, /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, "Help"), /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "Help is on the way! Who are you going to call?")),
    dropProps: {
      align: {
        left: 'right'
      }
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement(HelpOption, {
      size: "large"
    })
  }))));
};
Info.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Tip/Info'
};