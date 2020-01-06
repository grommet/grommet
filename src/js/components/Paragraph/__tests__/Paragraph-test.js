import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Paragraph } from '..';

test('Paragraph renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Paragraph />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Paragraph size renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Paragraph size="small" />
      <Paragraph size="medium" />
      <Paragraph size="large" />
      <Paragraph size="xlarge" />
      <Paragraph size="xxlarge" />
      <Paragraph fill />
      <Paragraph fill={false} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Paragraph margin renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Paragraph margin="small" />
      <Paragraph margin="medium" />
      <Paragraph margin="large" />
      <Paragraph margin="none" />
      <Paragraph margin={{ bottom: 'small' }} />
      <Paragraph margin={{ top: 'small' }} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Paragraph textAlign renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Paragraph textAlign="start" />
      <Paragraph textAlign="center" />
      <Paragraph textAlign="end" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
