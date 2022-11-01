import React, { useState } from 'react';
import { Page, PageContent, Heading, Paragraph, Grid, Card, Box, Button, Notification } from 'grommet';
export var PageNotification = function PageNotification() {
  var _useState = useState('narrow'),
    kind = _useState[0],
    setKind = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, {
      pad: {
        vertical: 'medium'
      },
      kind: kind,
      background: "background-back"
    }, /*#__PURE__*/React.createElement(PageContent, {
      background: "background-front"
    }, /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      pad: {
        vertical: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      margin: "none"
    }, kind.slice(0, 1).toUpperCase() + kind.slice(1), " Page"), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      align: "end"
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Wide",
      onClick: function onClick() {
        return setKind('wide');
      },
      primary: kind === 'wide',
      color: kind === 'wide' ? 'background-back' : undefined
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Narrow",
      onClick: function onClick() {
        return setKind('narrow');
      },
      primary: kind === 'narrow',
      color: kind === 'narrow' ? 'background-back' : undefined
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Full",
      onClick: function onClick() {
        return setKind('full');
      },
      primary: kind === 'full',
      color: kind === 'full' ? 'background-back' : undefined
    }))), /*#__PURE__*/React.createElement(Notification, {
      status: "critical",
      message: "Page level notification.",
      onClose: function onClose() {
        return console.log('close notification');
      }
    }), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/React.createElement(Grid, {
      rows: "small",
      columns: {
        count: 'fit',
        size: 'small'
      },
      gap: "small"
    }, /*#__PURE__*/React.createElement(Card, {
      background: "white",
      pad: "large"
    }, "Card"), /*#__PURE__*/React.createElement(Card, {
      background: "white",
      pad: "large"
    }, "Card")), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")))
    // </Grommet>
  );
};

export default {
  title: 'Layout/Page/Page Notification'
};