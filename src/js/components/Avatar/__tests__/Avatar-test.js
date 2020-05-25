import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Favorite } from 'grommet-icons';
import { Box } from '../../Box';
import { MnetUIBase } from '../../MnetUIBase';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { Avatar } from '..';

const src = '';

describe('Avatar', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Avatar />
        <Avatar id="test id" name="test name" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Avatar size="xsmall" src={src} />
        <Avatar size="small" src={src} />
        <Avatar src={src} />
        <Avatar size="large" src={src} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Avatar src={src} round={false} />
        <Avatar src={src} round="xsmall" />
        <Avatar src={src} round="small" />
        <Avatar src={src} round="medium" />
        <Avatar src={src} round="large" />
        <Avatar src={src} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('text renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Avatar background="dark-2">
          <Text alignSelf="center" size="xlarge">
            R
          </Text>
        </Avatar>
        <Avatar background="brand">
          <Text alignSelf="center" size="xlarge">
            SY
          </Text>
        </Avatar>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('icon renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Avatar src={<Favorite color="accent-2" />} background="accent-4" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('stack renders', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Stack anchor="bottom-right">
          <Box>
            <Box direction="row">
              <Avatar size="xsmall" src={src} />
              <Box pad="xxsmall" />
            </Box>
            <Box pad="xxsmall" />
          </Box>
          <Avatar src={src} size="42px" />
        </Stack>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
