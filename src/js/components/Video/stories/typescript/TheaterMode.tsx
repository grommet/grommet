import React, { useState } from 'react';

import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';
import { Test } from 'grommet-icons';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  video: {
    extend: ({ mode }) => `
    ${mode === 'theater' && `width: 75vw;`}
    `,
  },
});

const TheaterMode = (props) => {
  const [mode, setMode] = useState('normal');

  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">
        <Video
          mode={mode}
          newButtons={[
            {
              icon: <Test />,
              onClick: () => {
                mode === 'theater' ? setMode('normal') : setMode('theater');
              },
            },
          ]}
          {...props}
        >
          <source src="small.mp4" type="video/mp4" />
          <source
            src="http://techslides.com/demos/sample-videos/small.webm"
            type="video/webm"
          />
          <source
            src="http://techslides.com/demos/sample-videos/small.ogv"
            type="video/ogg"
          />
          <source
            src="http://techslides.com/demos/sample-videos/small.3gp"
            type="video/3gp"
          />
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
