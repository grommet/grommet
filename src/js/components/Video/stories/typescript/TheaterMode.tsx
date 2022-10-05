import React, { useState } from 'react';

import { Box, Video } from 'grommet';
import { Monitor } from 'grommet-icons/icons/Monitor';

const TheaterMode = () => {
  const [theaterMode, setTheaterMode] = useState(false);

  return (
    <Box
      background={theaterMode ? 'dark-1' : 'light-1'}
      overflow="hidden"
      width={theaterMode ? null : 'small'}
      align="center"
    >
      <Video
        margin="large"
        src="large_video.mp4"
        controls={{
          position: theaterMode ? 'over' : 'below',
          items: [
            {
              icon: <Monitor />,
              onClick: () => setTheaterMode(!theaterMode),
              a11yTitle: 'Toggle theater mode',
            },
            'fullScreen',
          ],
        }}
      />
    </Box>
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
