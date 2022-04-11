import React from 'react';

import { Box, Audio } from 'grommet';

export const Simple = () => (
  <Box pad="large">
    <Audio controls>
      <source
        src="http://techslides.com/demos/samples/sample.mp3"
        type="audio/mp3"
      />
      <track src="subtitles_en.vtt" kind="subtitles" label="English" />
      <source
        src="http://techslides.com/demos/samples/sample.ogg"
        type="audio/ogg"
      />
      <track src="subtitles_no.vtt" kind="subtitles" label="Norwegian" />
    </Audio>
    <Box onClick={()=> {}}>shimi</Box>
  </Box>
);

export default {
  title: 'Media/Audio/Simple',
};
