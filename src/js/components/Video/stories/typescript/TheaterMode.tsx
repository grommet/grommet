import React, { useState } from 'react';

import { Box, Grommet, Video, grommet } from 'grommet';
import { Monitor } from 'grommet-icons/icons/Monitor';

const TheaterMode = (props) => {
  const [theaterMode, setTheaterMode] = useState(false);

  return (
    <Grommet theme={grommet}>
      <Box
        background={theaterMode ? 'dark-1' : 'light-1'}
        overflow="hidden"
        height={{ max: 'large' }}
        width={theaterMode ? null : 'small'}
        fill={theaterMode ? 'horizontal' : null}
        align="center"
        pad="large"
      >
        <Video
          src="large_video.mp4"
          fit="cover"
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
