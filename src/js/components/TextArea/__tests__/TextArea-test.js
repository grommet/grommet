import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { TextArea } from '..';

jest.mock('react-dom');

test('TextArea renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextArea id='item' name='item' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea placeholder renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextArea id='item' name='item' placeholder='placeholder' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea plain renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextArea id='item' name='item' plain />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextArea focusIndicator renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextArea id='item' name='item' focusIndicator />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
