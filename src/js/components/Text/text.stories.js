import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Grommet, Text, Heading } from 'grommet';
import { grommet } from 'grommet/themes';

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
  <Grommet theme={grommet}>
    {sizes.map(size => (
      <Box key={size} margin="small">
        <Text size={size}>{`Text ${size}`}</Text>
      </Box>
    ))}
  </Grommet>
);

const Color = () => (
  <Grommet theme={grommet}>
    <Text color="accent-1">Colored Text</Text>
  </Grommet>
);

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

storiesOf('Text', module)
  .add('All', () => <All />)
  .add('Color', () => <Color />)
  .add('Word Break', () => <WordBreak />);
