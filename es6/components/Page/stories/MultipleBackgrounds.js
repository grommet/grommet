import React from 'react';
import { Page, Header, Heading, Paragraph, Grid, Card, PageContent, Footer, Box } from 'grommet';
export var MultipleBackgrounds = function MultipleBackgrounds() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Page, {
      kind: "narrow"
    }, /*#__PURE__*/React.createElement(PageContent, {
      background: {
        fill: 'horizontal',
        color: 'white'
      }
    }, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, null, "Narrow Page"))), /*#__PURE__*/React.createElement(PageContent, {
      background: {
        fill: 'horizontal',
        color: 'light-2'
      }
    }, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")), /*#__PURE__*/React.createElement(PageContent, {
      background: {
        fill: 'horizontal',
        color: 'dark-4'
      }
    }, /*#__PURE__*/React.createElement(Box, {
      pad: {
        vertical: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Grid, {
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
    }, "Card")))), /*#__PURE__*/React.createElement(PageContent, {
      background: {
        fill: 'horizontal',
        color: 'light-2'
      }
    }, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")), /*#__PURE__*/React.createElement(PageContent, {
      background: {
        fill: 'horizontal',
        color: 'white'
      }
    }, /*#__PURE__*/React.createElement(Footer, {
      pad: {
        vertical: 'small'
      }
    }, "Footer")))
    // </Grommet>
  );
};

MultipleBackgrounds.storyName = 'Multiple backgrounds';
export default {
  title: 'Layout/Page/Multiple backgrounds'
};