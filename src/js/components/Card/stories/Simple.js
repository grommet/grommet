import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grommet,
  Text,
} from 'grommet';

const Example = () => (
  <Grommet theme={grommet}>
    <Box pad="large" gap="medium" height="large" width="medium">
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
  </Grommet>
);

storiesOf('Card', module).add('Simple', () => <Example />);
