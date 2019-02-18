import React from 'react';
import { storiesOf } from '@storybook/react';

import { Audio, Box, Heading, Grommet } from 'grommet';
import { Music } from 'grommet-icons';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const SimpleAudio = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Audio>
        <source
          src="http://techslides.com/demos/samples/sample.mp3"
          type="audio/mp3"
        />
        <track
          src="subtitles_en.vtt"
          kind="subtitles"
          label="English"
        />
        <source
          src="http://techslides.com/demos/samples/sample.ogg"
          type="audio/ogg"
        />
        <track
          src="subtitles_no.vtt"
          kind="subtitles"
          label="Norwegian"
        />
      </Audio>
    </Box>
  </Grommet>
);

const customThemedAudio = deepMerge(grommet, {
  audio: {
    controls: {
      background: 'light-4',
      extend: () => `opacity: 0.9; margin: 10px`,
    },
    icons: {
      color: 'brand',
    },
  },
});

const CustomThemeAudio = () => (
  <Grommet theme={customThemedAudio}>
    <Box align="center" pad="large">
      <Audio>
        <source
          src="https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.mp3"
          type="audio/mp3"
        />
        <track
          src="subtitles_en.vtt"
          kind="subtitles"
          label="English"
        />
        <source
          src="https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.ogg"
          type="audio/ogg"
        />
        <track
          src="subtitles_no.vtt"
          kind="subtitles"
          label="Norwegian"
        />
      </Audio>
    </Box>
  </Grommet>
);

const BackgroundAudio = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Heading level="3">
        The Audio is playing relaxing background music{' '}
      </Heading>
      <Heading level="4">lay back and enjoy.. </Heading>
      <Box gap="small" pad="large">
        <Music size="small" color="brand" />
        <Music size="medium" color="brand" />
        <Music size="large" color="brand" />
      </Box>
      <Audio controls={false} autoplay loop>
        <source
          src="https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.mp3"
          type="audio/mp3"
        />
        <track
          src="subtitles_en.vtt"
          kind="subtitles"
          label="English"
        />
        <source
          src="https://dl.espressif.com/dl/audio/ff-16b-1c-44100hz.ogg"
          type="audio/ogg"
        />
        <track
          src="subtitles_no.vtt"
          kind="subtitles"
          label="Norwegian"
        />
      </Audio>
    </Box>
  </Grommet>
);

storiesOf('Audio', module)
  .add('Simple Audio', () => <SimpleAudio />)
  .add('Themed Audio', () => <CustomThemeAudio />)
  .add('Background Music', () => <BackgroundAudio />);
