import React from 'react';
import { Header, Page, PageContent, Heading, Paragraph, Grid, Card, Footer } from 'grommet';
export var GlobalHeaderFooter = function GlobalHeaderFooter() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
      pad: "small"
    }, "Global Header"), /*#__PURE__*/React.createElement(Page, {
      background: "background-front",
      kind: "narrow"
    }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Heading, null, "Narrow Page"), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/React.createElement(Grid, {
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
    }, "Card")), /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."))), /*#__PURE__*/React.createElement(Footer, {
      pad: "small"
    }, "Global Footer"))
    // </Grommet>
  );
};

GlobalHeaderFooter.storyName = 'Global Header and Footer';
export default {
  title: 'Layout/Page/Global Header and Footer'
};