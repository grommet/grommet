import React from 'react';

import { Box, Card, CardBody, CardFooter, CardHeader, Text } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box pad="large" gap="medium" width="medium">
    <Card pad="small" background="dark-1" gap="medium">
      <CardHeader>header</CardHeader>
      <CardBody>body</CardBody>
      <CardFooter>footer</CardFooter>
    </Card>
    {/* internal components are optional  */}
    <Card pad="small" gap="medium" background="light-4">
      <CardBody>body</CardBody>
      <Box>box - random component</Box>
    </Card>
    {/* internal components order is flexible  */}
    <Card pad="small" gap="medium">
      <CardBody>body</CardBody>
      <CardHeader>header</CardHeader>
      <CardFooter>footer</CardFooter>
    </Card>
    {/* children that are not Card internal components */}
    <Card pad="small" gap="medium" background="light-1">
      <Text>text - random component</Text>
      <Box>box - random component</Box>
    </Card>
  </Box>
  // </Grommet>
);

export default {
  title: 'Layout/Card/Simple',
};
