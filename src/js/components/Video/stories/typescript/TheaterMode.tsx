import React, { useState } from 'react';

import { Box, Grommet, Video, grommet } from 'grommet';
import { Test } from 'grommet-icons';

const TheaterMode = (props) => {
  const [source, setSource] = useState('small_video.mp4');

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Video
          controls={{
            position: 'below',
            items: [
              'volume',
              'reduceVolume',
              {
                icon: <Test />,
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
        >
          <source src="testing.mp4" type="video/mp4" />
        </Video>
      </Box>
    </Grommet>
  );
};

export const CustomizableControls = () => <TheaterMode />;

CustomizableControls.storyName = 'Theater mode';

export default {
  title: 'Media/Video/Theater mode',
};
