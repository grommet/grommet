import React from 'react';
import { Anchor, Button, NameValueList, NameValuePair, PageHeader, Page, PageContent, Text } from 'grommet';
export var Children = function Children() {
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
        label: "Open Source"
      })
    }, /*#__PURE__*/React.createElement(ContextualInfo, null)))) // </Grommet>

  );
};

var ContextualInfo = function ContextualInfo() {
  return /*#__PURE__*/React.createElement(NameValueList, {
    layout: "grid",
    pairProps: {
      direction: 'column'
    },
    valueProps: {
      width: 'small'
    },
    pad: {
      vertical: 'small'
    }
  }, /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "Latest Version")
  }, "2.22.0"), /*#__PURE__*/React.createElement(NameValuePair, {
    name: /*#__PURE__*/React.createElement(Text, {
      size: "small"
    }, "Published")
  }, "25 days ago"));
};

export default {
  title: 'Layout/PageHeader/Children'
};