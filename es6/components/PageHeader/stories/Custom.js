import React from 'react';
import { Anchor, Box, Button, grommet, Grommet, PageHeader, Page, PageContent } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { FormPrevious } from "grommet-icons/es6/icons/FormPrevious";
var customTheme = deepMerge(grommet, {
  pageHeader: {
    medium: {
      areas: [['parent', 'parent'], ['title', 'null'], ['subtitle', 'null'], ['actions', 'actions']]
    }
  }
});
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
    title: "Permissions",
    subtitle: "View and assign permissions.",
    actions: /*#__PURE__*/React.createElement(Box, {
      alignSelf: "start"
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Edit",
      primary: true
    })),
    parent: /*#__PURE__*/React.createElement(Anchor, {
      icon: /*#__PURE__*/React.createElement(FormPrevious, null),
      label: "Settings"
    })
  }))));
};
export default {
  title: 'Layout/PageHeader/Custom Themed/Custom'
};