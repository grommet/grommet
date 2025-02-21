import React from 'react';

import { Box, Text, Heading } from 'grommet';

const wordBreakValues = ['normal', 'break-all', 'keep-all', 'break-word'];

/* eslint-disable max-len */
export const WordBreak = () => (
  <>
    {wordBreakValues.map((value) => (
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
WordBreak.storyName = 'Word break';

export default {
  title: 'Type/Text/Word break',
};
