import React, { useContext } from 'react';
import { Anchor, Box, Button, Menu, PageHeader, Page, PageContent, ResponsiveContext } from 'grommet';
import { More } from "grommet-icons/es6/icons/More";
var actions = [{
  label: 'Get Started',
  primary: true
}, {
  label: 'Follow',
  secondary: true
}, {
  label: 'File Issue',
  secondary: true
}];
var controls = {
  small: /*#__PURE__*/React.createElement(Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.map(function (action) {
      return {
        label: action.label
      };
    }),
    icon: /*#__PURE__*/React.createElement(More, null)
  }),
  medium: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, actions[0]), /*#__PURE__*/React.createElement(Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.slice(1),
    icon: /*#__PURE__*/React.createElement(More, null)
  })),
  large: actions.map(function (action) {
    return /*#__PURE__*/React.createElement(Button, action);
  })
};
export var MultipleActions = function MultipleActions() {
  var size = useContext(ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, null, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        gap: "small",
        align: "center"
      }, controls[size]),
      parent: /*#__PURE__*/React.createElement(Anchor, {
        label: "Parent Page"
      })
    })))
    // </Grommet>
  );
};

MultipleActions.storyName = 'Multiple Actions';
export default {
  title: 'Layout/PageHeader/Multiple Actions'
};