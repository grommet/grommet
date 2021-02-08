import React from 'react';
import { grommet, Box, Button, Grommet } from 'grommet';
export var TipOnButton = function TipOnButton() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium",
    gap: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "Default Tip",
    onClick: function onClick() {},
    tip: "tooltip"
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Tip Drop props",
    onClick: function onClick() {},
    tip: {
      dropProps: {
        align: {
          left: 'right'
        }
      },
      content: 'tooltip'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Tip content",
    onClick: function onClick() {},
    tip: {
      plain: true,
      dropProps: {
        align: {
          bottom: 'top'
        }
      },
      content: /*#__PURE__*/React.createElement(Box, {
        pad: "xxsmall",
        elevation: "small",
        background: "#EDEDED" // no opacity
        ,
        round: "xsmall",
        margin: "xsmall",
        overflow: "hidden",
        align: "center"
      }, "tooltip")
    }
  })));
};
TipOnButton.storyName = 'Tip on button';
TipOnButton.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: "Controls/Button/Tip on button"
};