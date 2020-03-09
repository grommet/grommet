import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

const wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];

/* eslint-disable max-len */
const WordBreak = () => (
  <Grommet theme={grommet}>
    {wordBreakValues.map(value => (
      <Box key={value} margin="small" width="medium">
        <Heading level={4}>{`word-break: ${value};`}</Heading>
        <Text wordBreak={value}>
          Honorificabilitudinitatibus califragilisticexpialidocious
          Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu
          グレートブリテンおよび北アイルランド連合王国という言葉は本当に長い言葉
        </Text>
      </Box>
    ))}
  </Grommet>
);
/* eslint-enable max-len */

storiesOf('Text', module).add('Word Break', () => <WordBreak />);
