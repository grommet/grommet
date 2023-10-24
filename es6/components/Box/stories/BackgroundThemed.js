import React, { useContext } from 'react';
import { Box, Paragraph, Text, ThemeContext } from 'grommet';
import { Grid } from '../../Grid';
export var BackgroundThemed = function BackgroundThemed() {
  var theme = useContext(ThemeContext);
  var backgrounds = theme.global.backgrounds;
  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet>
    backgrounds ? /*#__PURE__*/React.createElement(Grid, {
      columns: "small",
      rows: "small",
      gap: "small",
      pad: "large"
    }, Object.entries(backgrounds).map(function (_ref) {
      var key = _ref[0],
        background = _ref[1];
      return /*#__PURE__*/React.createElement(Box, {
        key: key,
        background: background,
        fill: true,
        pad: "medium",
        justify: "center",
        round: "small"
      }, /*#__PURE__*/React.createElement(Text, {
        weight: "bold",
        size: "large"
      }, key));
    })) : /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Paragraph, {
      size: "large"
    }, "There are no backgrounds defined at `theme.global.backgrounds` for the currently selected theme. Selecting \"grommet\" from the Theme menu above is a good place to start."))
    // </Grommet>
  );
};

BackgroundThemed.storyName = 'Background from theme';
export default {
  title: 'Layout/Box/Background from theme'
};