import React from 'react';
import { Box, Button, DropButton, Notification, TextInput } from 'grommet';
import { Search } from 'grommet-icons/icons/Search';
import { Filter } from 'grommet-icons/icons/Filter';
import { Toolbar } from '../Toolbar';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Toolbar is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Box, {
      width: "large"
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(Box, {
      width: {
        max: 'small'
      }
    }, /*#__PURE__*/React.createElement(TextInput, {
      icon: /*#__PURE__*/React.createElement(Search, null)
    })), /*#__PURE__*/React.createElement(DropButton, {
      kind: "toolbar",
      icon: /*#__PURE__*/React.createElement(Filter, null)
    }), /*#__PURE__*/React.createElement(Box, {
      flex: true
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Create",
      primary: true
    }))))
    // </Grommet>
  );
};

Simple.args = {
  full: true
};
export default {
  title: 'Data/Toolbar/Simple'
};