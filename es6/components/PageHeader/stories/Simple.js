import React from 'react';
import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/React.createElement(Button, {
        label: "Get Started",
        primary: true
      }),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      })
    })))
    // </Grommet>
  );
};

export default {
  title: 'Layout/PageHeader/Simple'
};