import React from 'react';

import { Box, Heading, Paragraph } from 'grommet';
import Talent from './Talent';
import { TalentEmoji } from './emojis/TalentEmoji';

const Talents = ({ ...rest }) => (
  <Box align="center" pad="large">
    <Heading size="large">finding talent made easier</Heading>
    <Paragraph size="xlarge" textAlign="center">
      our app’s interaction is part of the attraction. simple and intuative so
      you can focus on the talent.
    </Paragraph>
    <Box direction="row-responsive" align="center" margin="large" {...rest}>
      <Talent
        name="swipe up or down"
        summary="swipe up for up voting and down for down vote"
        action="gestures"
      >
        <TalentEmoji name=":point_up_2::skin-tone-2:" />
      </Talent>
      <Talent
        name="slide side to side"
        summary="quickly move back and forth through the queue"
        action="navigate"
      >
        <TalentEmoji name=":raised_hand::skin-tone-4:" />
      </Talent>
    </Box>
  </Box>
);

export { Talents };
