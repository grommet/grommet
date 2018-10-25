import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Heading } from '..';

test('Heading renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading level renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading level={1} />
      <Heading level={2} />
      <Heading level={3} />
      <Heading level={4} />
      <Heading level='1' />
      <Heading level='2' />
      <Heading level='3' />
      <Heading level='4' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading level={1} size='small' />
      <Heading level={1} size='medium' />
      <Heading level={1} size='large' />
      <Heading level={1} size='xlarge' />
      <Heading level={2} size='small' />
      <Heading level={2} size='medium' />
      <Heading level={2} size='large' />
      <Heading level={2} size='xlarge' />
      <Heading level={3} size='small' />
      <Heading level={3} size='medium' />
      <Heading level={3} size='large' />
      <Heading level={3} size='xlarge' />
      <Heading level={4} size='small' />
      <Heading level={4} size='medium' />
      <Heading level={4} size='large' />
      <Heading level={4} size='xlarge' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading textAlign renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading textAlign='start' />
      <Heading textAlign='center' />
      <Heading textAlign='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading margin renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading margin='small' />
      <Heading margin='medium' />
      <Heading margin='large' />
      <Heading margin='none' />
      <Heading margin={{ bottom: 'small' }} />
      <Heading margin={{ top: 'small' }} />
      <Heading margin={{ bottom: 'none' }} />
      <Heading margin={{ top: 'none' }} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading color renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading color='brand' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';

test('Heading truncate renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading truncate={false}>{LONG}</Heading>
      <Heading truncate>{LONG}</Heading>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('responsive renders', () => {
  const component = renderer.create(
    <Grommet>
      <Heading responsive />
      <Heading responsive={false} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
