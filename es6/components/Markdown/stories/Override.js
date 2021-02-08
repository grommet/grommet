import React from 'react';
import styled from 'styled-components';
import { Box, Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';
var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves. See all the\n  options [here](https://github.com/probablyup/markdown-to-jsx/)\n\n  [reference](#)\n\n```\nimport { Grommet } from 'grommet';\n```\n\n  > i carry your heart with me\n\n  ![alt text](//v2.grommet.io/assets/IMG_4245.jpg \"Markdown Image\")\n\n  Markdown | Less | Pretty\n  --- | --- | ---\n  *Still* | `renders` | **nicely**\n  1 | 2 | 3\n";
var StyledPre = styled.pre.withConfig({
  displayName: "Override__StyledPre",
  componentId: "sc-13lo9xg-0"
})(["background-color:#7d4cdb;"]);
export var ComponentOverrideMarkdown = function ComponentOverrideMarkdown() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Markdown, {
    components: {
      pre: StyledPre
    }
  }, CONTENT)));
};
ComponentOverrideMarkdown.storyName = 'Component override markdown';
export default {
  title: 'Type/Markdown/Component override markdown'
};