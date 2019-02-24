import * as React from 'react';
import RangeSelector from '../RangeSelector';
import Stack from '../../Stack/Stack';
import Box from '../../Box/Box/Box';
import Text from '../../Text/Text';

export default (
  <Stack uxpId="stack0">
    <Box direction="row" justify="between" uxpId="container0">
      <Box uxpId="box0" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text0">
          1
        </Text>
      </Box>
      <Box uxpId="box1" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text1">
          1
        </Text>
      </Box>
      <Box uxpId="box2" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text2">
          1
        </Text>
      </Box>
      <Box uxpId="box3" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text3">
          1
        </Text>
      </Box>
      <Box uxpId="box4" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text4">
          1
        </Text>
      </Box>
      <Box uxpId="box5" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text5">
          1
        </Text>
      </Box>
      <Box uxpId="box6" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text6">
          1
        </Text>
      </Box>
      <Box uxpId="box7" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text7">
          1
        </Text>
      </Box>
      <Box uxpId="box8" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text8">
          1
        </Text>
      </Box>
      <Box uxpId="box9" pad="small" border={false}>
        <Text style={{ fontFamily: 'monospace' }} uxpId="text9">
          1
        </Text>
      </Box>
    </Box>
    <RangeSelector
      direction="horizontal"
      invert={false}
      min={0}
      max={9}
      size="full"
      round="small"
      values={[3, 7]}
    />
  </Stack>
);
