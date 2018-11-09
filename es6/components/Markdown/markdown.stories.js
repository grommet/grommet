import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Markdown } from 'grommet';
import { grommet } from 'grommet/themes';
var CONTENT = "\n  # Out of Breath\n\n  You know, sometimes in life it seems like there's no way out. Like\n  a sheep trapped in a maze designed by wolves.\n\n  [reference](#)\n";

var SimpleMarkdown = function SimpleMarkdown() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Markdown, null, CONTENT));
};

storiesOf('Markdown', module).add('Simple Markdown', function () {
  return React.createElement(SimpleMarkdown, null);
});