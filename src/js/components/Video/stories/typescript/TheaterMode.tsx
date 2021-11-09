import React, { useState } from 'react';

import { Box, Grommet, Video, grommet } from 'grommet';
import { Monitor } from 'grommet-icons/icons/Monitor';

const TheaterMode = (props) => {
  const [source, setSource] = useState('small_video.mp4');

  return (
    <Grommet theme={grommet}>
      <Box
        background={source === 'small_video.mp4' ? '' : 'dark-1'}
        overflow="hidden"
        height={{ max: 'large' }}
        align="center"
        pad="large"
      >
        <Video
          src={source}
          fit="cover"
          controls={{
            position: 'below',
            items: [
              'volume',
              'reduceVolume',
              {
                icon: <Monitor />,
                onClick: () =>
                  setSource(
                    source === 'small_video.mp4'
                      ? 'large_video.mp4'
                      : 'small_video.mp4',
                  ),
              },
              'fullScreen',
            ],
          }}
          {...props}
        />
      </Box>
    </Grommet>
  );
};

export const CustomizableControls = () => <TheaterMode />;

CustomizableControls.storyName = 'Theater mode';

CustomizableControls.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Media/Video/Theater mode',
};
