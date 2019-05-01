import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Text, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
var sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall', '77px'];
var wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];

var All = function All() {
  return React.createElement(Grommet, {
    theme: grommet
  }, sizes.map(function (size) {
    return React.createElement(Box, {
      key: size,
      margin: "small"
    }, React.createElement(Text, {
      size: size
    }, "Text " + size));
  }));
};

var Color = function Color() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Text, {
    color: "accent-1"
  }, "Colored Text"));
};

var WordBreak = function WordBreak() {
  return React.createElement(Grommet, {
    theme: grommet
  }, wordBreakValues.map(function (value) {
    return React.createElement(Box, {
      key: value,
      margin: "small",
      width: "medium"
    }, React.createElement(Heading, {
      level: 4
    }, "word-break: " + value + ";"), React.createElement(Text, {
      wordBreak: value
    }, "Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu \u30B0\u30EC\u30FC\u30C8\u30D6\u30EA\u30C6\u30F3\u304A\u3088\u3073\u5317\u30A2\u30A4\u30EB\u30E9\u30F3\u30C9\u9023\u5408\u738B\u56FD\u3068\u3044\u3046\u8A00\u8449\u306F\u672C\u5F53\u306B\u9577\u3044\u8A00\u8449"));
  }));
};

storiesOf('Text', module).add('All', function () {
  return React.createElement(All, null);
}).add('Color', function () {
  return React.createElement(Color, null);
}).add('Word Break', function () {
  return React.createElement(WordBreak, null);
});