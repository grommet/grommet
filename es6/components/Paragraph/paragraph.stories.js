import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';
var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small'];
var paragraphFiller = "\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua.\n";

var All = function All() {
  return React.createElement(Grommet, {
    theme: grommet
  }, sizes.map(function (size) {
    return React.createElement(Paragraph, {
      key: size,
      size: size
    }, "Paragraph " + size, paragraphFiller);
  }), React.createElement(Paragraph, {
    color: "status-critical"
  }, "This is an error message."));
};

storiesOf('Paragraph', module).add('All', function () {
  return React.createElement(All, null);
});