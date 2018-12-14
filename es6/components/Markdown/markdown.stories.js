import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Box, Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';
var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves.\n\n  [reference](#)\n\n```\nimport { Grommet } from 'grommet';\n```\n";

var SimpleMarkdown = function SimpleMarkdown() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Markdown, null, CONTENT)));
};

var StyledPre = styled.pre.withConfig({
  displayName: "markdownstories__StyledPre",
  componentId: "sc-4hkfd5-0"
})(["background-color:#7d4cdb;"]);

var ComponentOverrideMarkdown = function ComponentOverrideMarkdown() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Markdown, {
    components: {
      pre: StyledPre
    }
  }, CONTENT)));
};

storiesOf('Markdown', module).add('Simple Markdown', function () {
  return React.createElement(SimpleMarkdown, null);
}).add('Component Override Markdown', function () {
  return React.createElement(ComponentOverrideMarkdown, null);
});