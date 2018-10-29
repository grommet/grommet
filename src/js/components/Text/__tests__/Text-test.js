import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Text } from '..';

test('renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text>text</Text>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders size', () => {
  const component = renderer.create(
    <Grommet>
      <Text size="xsmall" />
      <Text size="small" />
      <Text size="medium" />
      <Text size="large" />
      <Text size="xlarge" />
      <Text size="xxlarge" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders textAlign', () => {
  const component = renderer.create(
    <Grommet>
      <Text textAlign="start" />
      <Text textAlign="center" />
      <Text textAlign="end" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders margin', () => {
  const component = renderer.create(
    <Grommet>
      <Text margin="small" />
      <Text margin="medium" />
      <Text margin="large" />
      <Text margin="none" />
      <Text margin={{ vertical: 'small' }} />
      <Text margin={{ horizontal: 'small' }} />
      <Text margin={{ bottom: 'small' }} />
      <Text margin={{ top: 'small' }} />
      <Text margin={{ left: 'small' }} />
      <Text margin={{ right: 'small' }} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

test('renders truncate', () => {
  const component = renderer.create(
    <Grommet>
      <Text truncate={false}>{LONG}</Text>
      <Text truncate>{LONG}</Text>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders color', () => {
  const component = renderer.create(
    <Grommet>
      <Text color="status-critical" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders tag', () => {
  const component = renderer.create(
    <Grommet>
      <Text tag="div" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders weight', () => {
  const component = renderer.create(
    <Grommet>
      <Text weight="normal" />
      <Text weight="bold" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
