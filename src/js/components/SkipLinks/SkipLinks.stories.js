import React from 'react';
import { storiesOf } from '@storybook/react';
import { grommet } from 'grommet/themes';
import { Box, Grommet, Text, Heading, SkipLink } from 'grommet';

const courses = [
  'C++',
  'Java',
  'JavaScript',
  'SQL',
  'C#',
  'Python',
  'JSX',
  'CSS',
  'TypeScript',
  'HTML5',
];

const SkipLinkComponent = () => (
  <Grommet theme={grommet} full>
    <Box align="center">
      <SkipLink
        margin="large"
        target="_self"
        id="C6"
        label="Skip to chapter-6"
      />
      {courses.map((course, index) => (
        <Box id={`C${index + 1}`} key={course} align="center">
          <Heading>Chapter {index + 1}</Heading>
          <Text>This chapter explains all about {course}</Text>
        </Box>
      ))}
    </Box>
  </Grommet>
);

storiesOf('SkipLinks', module).add('Simple Skip Link', () => (
  <SkipLinkComponent />
));
