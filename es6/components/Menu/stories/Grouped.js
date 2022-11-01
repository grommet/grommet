import React from 'react';
import { Box, Menu } from 'grommet';
export var Grouped = function Grouped() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Menu, {
      dropProps: {
        align: {
          top: 'bottom',
          left: 'left'
        },
        elevation: 'xlarge'
      },
      label: "Grouped Menu",
      items: [[{
        label: 'View Details'
      }, {
        label: 'Edit Permissions'
      }, {
        label: 'Update Password'
      }], [{
        label: 'Delete'
      }]]
    }))
    // </Grommet>
  );
};

Grouped.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Menu/Grouped'
};