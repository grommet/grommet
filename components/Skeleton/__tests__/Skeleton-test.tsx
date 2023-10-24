import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Skeleton } from '..';
import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { Heading } from '../../Heading';
import { Paragraph } from '../../Paragraph';
import { Button } from '../../Button';

describe('Skeleton', () => {
  test('renders', () => {
    const { asFragment } = render(
      <Grommet>
        <Skeleton />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Box skeleton loading', () => {
    const { asFragment } = render(
      <Grommet>
        <Box skeleton>
          <Heading>Heading</Heading>
          <Text>Text</Text>
          <Paragraph>Paragraph</Paragraph>
          <Button label="Button" onClick={() => {}} />
        </Box>
      </Grommet>,
    );
    expect(screen.queryByText('Heading')).toBeNull();
    expect(screen.queryByText('Text')).toBeNull();
    expect(screen.queryByText('Paragraph')).toBeNull();
    expect(screen.queryByText('Button')).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Box skeleton sizes loading', () => {
    const { asFragment } = render(
      <Grommet>
        <Box skeleton>
          <Heading level={2} size="small">
            Heading
          </Heading>
          <Text size="xsmall">Text</Text>
          <Paragraph size="large">Paragraph</Paragraph>
          <Button size="large" label="Button" onClick={() => {}} />
        </Box>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText('Heading')).toBeNull();
  });

  test('Box skeleton loaded', () => {
    const { asFragment } = render(
      <Grommet>
        <Box skeleton={false}>
          <Heading>Heading</Heading>
          <Text>Text</Text>
          <Paragraph>Paragraph</Paragraph>
          <Button label="Button" onClick={() => {}} />
        </Box>
      </Grommet>,
    );
    expect(screen.queryByText('Heading')).not.toBeNull();
    expect(screen.queryByText('Text')).not.toBeNull();
    expect(screen.queryByText('Paragraph')).not.toBeNull();
    expect(screen.queryByText('Button')).not.toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  test('Box skeleton with specific dimensions', () => {
    const { asFragment } = render(
      <Grommet>
        <Box skeleton height="small" width="medium">
          <Text>text</Text>
        </Box>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('with styling props', () => {
    const { asFragment } = render(
      <Grommet>
        <Skeleton
          height="small"
          margin="small"
          round="small"
          colors={{ dark: ['green', 'blue'], light: ['pink', 'orange'] }}
        />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('Skeleton with theme', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          skeleton: {
            colors: {
              light: ['#a2a8a8', '#adb9ba'],
            },
            round: 'xsmall',
          },
        }}
      >
        <Box skeleton>
          <Text>Text</Text>
        </Box>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
