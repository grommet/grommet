import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Text } from '../';

test('Text renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text>text</Text>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text size='xsmall' />
      <Text size='small' />
      <Text size='medium' />
      <Text size='large' />
      <Text size='xlarge' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text textAlign renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text textAlign='start' />
      <Text textAlign='center' />
      <Text textAlign='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Text margin renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text margin='small' />
      <Text margin='medium' />
      <Text margin='large' />
      <Text margin='none' />
      <Text margin={{ vertical: 'small' }} />
      <Text margin={{ horizontal: 'small' }} />
      <Text margin={{ bottom: 'small' }} />
      <Text margin={{ top: 'small' }} />
      <Text margin={{ left: 'small' }} />
      <Text margin={{ right: 'small' }} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

test('Text truncate renders', () => {
  const component = renderer.create(
    <Grommet>
      <Text truncate={false}>{LONG}</Text>
      <Text truncate={true}>{LONG}</Text>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
