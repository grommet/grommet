import React from 'react';
import { Anchor, Button, PageHeader, Page, PageContent } from 'grommet';
export var Size = function Size() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
      title: "Small PageHeader",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/React.createElement(Button, {
        label: "Page-level action"
      }),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      }),
      size: "small"
    }), /*#__PURE__*/React.createElement(PageHeader, {
      title: "Medium PageHeader (default)",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/React.createElement(Button, {
        label: "Page-level action"
      }),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      })
    }), /*#__PURE__*/React.createElement(PageHeader, {
      title: "Large PageHeader",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/React.createElement(Button, {
        label: "Page-level action"
      }),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      }),
      size: "large"
    })))
    // </Grommet>
  );
};

export default {
  title: 'Layout/PageHeader/Size'
};