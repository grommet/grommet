import React, { useContext } from 'react';
import { Box, Card, Grid, ResponsiveContext, Text } from 'grommet';
var cards = Array(20).fill()
// eslint-disable-next-line react/no-array-index-key
.map(function (_, i) {
  return /*#__PURE__*/React.createElement(Text, {
    key: i
  }, "Card " + i);
});
export var Example = function Example() {
  var size = useContext(ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Grid, {
      columns: size !== 'small' ? 'small' : '100%',
      gap: "small"
    }, cards.map(function (card, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(Card, {
          pad: "large",
          key: index
        }, card)
      );
    })))
    // </Grommet>
  );
};

Example.storyName = 'Responsive cards';
export default {
  title: 'Layout/Grid/Responsive cards'
};