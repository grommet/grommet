import React from 'react';
import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';
export var Responsive = function Responsive() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
      title: "Grommet",
      subtitle: "Responsive allows PageHeader layout to switch to a \n        single column at responsive breakpoints specified in the theme.",
      actions: /*#__PURE__*/React.createElement(Button, {
        label: "Get Started",
        primary: true
      }),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      }),
      responsive: true
    })))
    // </Grommet>
  );
};

export default {
  title: 'Layout/PageHeader/Responsive'
};