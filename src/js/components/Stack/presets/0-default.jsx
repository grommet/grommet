import * as React from 'react';
import Stack from '../Stack';
import Box from '../../Box/Box/Box';
import Paragraph from '../../Paragraph/Paragraph';
import Text from '../../Text/Text';

export default (
  <Stack anchor="center" uxpId="stack0">
    <Box background="dark-4" align="center" justify="center" pad="large" uxpId="content0">
      <Paragraph uxpId="content1">
        {`You know, sometimes in life it seems like there's no way out. Like
      a sheep trapped in a maze designed by wolves.`}
      </Paragraph>
    </Box>
    <Box
      uxpId="content2"
      background='white'
      pad="medium"
      round="medium"
    >
      <Text size="large" uxpId="content3">
        Hey!
      </Text>
    </Box>
  </Stack>
);
