import React from 'react';
import { storiesOf } from '@storybook/react';

import { Audio, Box, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleAudio = () => (
    <Grommet theme={grommet}>
        <Box align="center" pad="large">
            <Audio>
                <source
                  src="http://techslides.com/demos/samples/sample.mp3"
                  type="audio/mp3"
                />
                <track src="subtitles_en.vtt" kind="subtitles" caption="shimi" label="English" />
                <source
                  src="http://techslides.com/demos/samples/sample.ogg"
                  type="audio/ogg"
                />
                <track src="subtitles_no.vtt" kind="subtitles" caption="shimi" label="Norwegian" />
            </Audio>
        </Box>
    </Grommet>
);

storiesOf('Audio', module).add('Sample Audio', () => <SimpleAudio />);