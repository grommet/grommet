import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Text, Heading } from 'mnet-ui-base';

const sizes = [
  'xxlarge',
  'xlarge',
  'large',
  'medium',
  'small',
  'xsmall',
  '77px',
];

const wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];

const All = () => (
  <>
    {sizes.map(size => (
      <Box key={size} margin="small">
        <Text size={size}>{`Text ${size}`}</Text>
      </Box>
    ))}
  </>
);

const Color = () => (
  <>
    <Text color="accent-1">Colored Text</Text>
  </>
);

/* eslint-disable max-len */
const WordBreak = () => (
  <>
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
  </>
);
/* eslint-enable max-len */

storiesOf('Text', module)
  .add('All', () => <All />)
  .add('Color', () => <Color />)
  .add('Word Break', () => <WordBreak />);
