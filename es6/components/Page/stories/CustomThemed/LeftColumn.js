import React from 'react';
import { Page, Header, Heading, Paragraph, Grid, Card, PageContent, Grommet } from 'grommet';
var customTheme = {
  page: {
    customKind: {
      alignSelf: 'start',
      width: {
        min: '200px',
        max: '500px'
      },
      small: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      },
      medium: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      },
      large: {
        pad: 'medium',
        margin: {
          vertical: 'small',
          horizontal: 'small'
        }
      }
    }
  }
};
export var LeftColumn = function LeftColumn() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Page, {
    kind: "customKind"
  }, /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Heading, null, "Custom Kind"))), /*#__PURE__*/React.createElement(PageContent, {
    background: {
      fill: 'horizontal',
      color: 'pink'
    }
  }, "Background goes all the way across Page width regardless of Page kind (wide, narrow, full, or custom)."), /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")), /*#__PURE__*/React.createElement(PageContent, {
    background: "orange"
  }, /*#__PURE__*/React.createElement(Paragraph, null, "Background width is restricted by Page kind (wide, narrow, or full)."), /*#__PURE__*/React.createElement(Grid, {
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
  }, "Card"))), /*#__PURE__*/React.createElement(PageContent, null, /*#__PURE__*/React.createElement(Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."))));
};
LeftColumn.storyName = 'Left column';
export default {
  title: 'Layout/Page/Custom Themed/Left column'
};