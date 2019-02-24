import * as React from 'react';
import Diagram from '../Diagram';
import Stack from '../../Stack/Stack';
import Box from '../../Box/Box/Box';

export default (
  <Stack uxpId="stack0" guidingChild={1}>
    <Diagram
      uxpId="diagram0"
      connections={[
        {
          fromTarget: '1',
          toTarget: '2',
          thickness: 'xsmall',
          color: 'accent-2',
        },
        {
          fromTarget: '1',
          toTarget: '4',
          thickness: 'xsmall',
          color: 'accent-2',
          type: 'rectilinear',
        },
      ]}
    />
    <Box uxpId="contentContainer0">
      <Box direction="row" uxpId="contentContainer1">
        <Box id="1" margin="small" pad="medium" background="light-4" uxpId="content0" />
        <Box id="2" margin="small" pad="medium" background="light-4" uxpId="content1" />
      </Box>
      <Box direction="row" uxpId="contentContainer2">
        <Box id="3" margin="small" pad="medium" background="light-4" uxpId="content2"  />
        <Box id="4" margin="small" pad="medium" background="light-4" uxpId="content3" />
      </Box>
    </Box>
  </Stack>
);
