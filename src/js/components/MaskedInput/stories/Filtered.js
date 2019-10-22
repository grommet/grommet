import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { grommet } from 'grommet/themes';

const data = {
  Cummings: [
    'a pretty day',
    'i carry your heart with me',
    'if you like my poems let them',
  ],
  Chaucer: ["The Knight's Tale", 'The General Prologue', "The Friar's Tale"],
  Neruda: ['If You Forget Me', 'Love Sonnet XVII'],
  Poe: ['The Raven', 'Romance', 'Song'],
  Whitman: ['To You', 'O Captain! My Captain!', 'O Me! O Life!'],
};

const FilteredMaskedInput = () => {
  const [value, setValue] = React.useState('');
  const [first, second] = value.split(':');
  const poets = first
    ? Object.keys(data).filter(k =>
        k.toLowerCase().startsWith(first.toLowerCase()),
      )
    : Object.keys(data);
  const poems =
    data[first] && second
      ? data[first].filter(k =>
          k.toLowerCase().startsWith(second.toLowerCase()),
        )
      : data[first] || [];
  let longestPoemLength = 0;
  poems.forEach(p => {
    longestPoemLength = Math.max(longestPoemLength, p.length);
  });

  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="start" pad="large">
        <Box width="medium">
          <MaskedInput
            mask={[
              {
                options: poets,
                placeholder: 'poet',
              },
              { fixed: ':' },
              {
                options: poems,
                length: longestPoemLength,
                placeholder: 'poem',
              },
            ]}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('MaskedInput', module).add('Filtered', () => <FilteredMaskedInput />);
