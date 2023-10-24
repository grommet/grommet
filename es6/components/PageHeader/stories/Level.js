import { Button, Page, PageContent, PageHeader } from 'grommet';
import React from 'react';
export var Level = function Level() {
  return /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Welcome to Your App",
    subtitle: "In this example, we showcase different levels of page headers  using the `level` prop. Page headers help provide hierarchy  and structure to your application's content.",
    actions: /*#__PURE__*/React.createElement(Button, {
      label: "View Details"
    }),
    level: 1 // Use different levels for different headers
  }), /*#__PURE__*/React.createElement(PageHeader, {
    title: "Main Section",
    subtitle: "This is the main section of your application where  you can display more detailed information about  a specific topic or category.",
    actions: /*#__PURE__*/React.createElement(Button, {
      label: "View Details"
    }),
    level: 2
  }), /*#__PURE__*/React.createElement(PageHeader, {
    title: "Subsection",
    subtitle: "Subsections provide further organization within a page.They  can be used to group related content together.",
    actions: /*#__PURE__*/React.createElement(Button, {
      label: "View Details"
    }),
    level: 3
  })));
};
export default {
  title: 'Layout/PageHeader/Level'
};