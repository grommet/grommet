import React from 'react';
import { Box, Markdown } from 'grommet';
var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves. See all the\n  options [here](https://github.com/probablyup/markdown-to-jsx/)\n\n  [reference](#)\n\n```\nimport { Grommet } from 'grommet';\n```\n\n  > i carry your heart with me\n\n  ![alt text](//v2.grommet.io/assets/IMG_4245.jpg \"Markdown Image\")\n\n  Markdown | Less | Pretty\n  --- | --- | ---\n  Content *still* | `renders` | **nicely** in a table\n  1 | 2 | 3\n";
export var Simple = function Simple() {
  var ref = React.useRef();
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Markdown, {
      ref: ref
    }, CONTENT))
    // </Grommet>
  );
};

export default {
  title: 'Type/Markdown/Simple'
};