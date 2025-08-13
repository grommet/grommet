import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';

import { Grommet } from '../../Grommet';
import { Paragraph } from '..';

test('Paragraph renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Paragraph />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph size renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Paragraph size="small" />
      <Paragraph size="medium" />
      <Paragraph size="large" />
      <Paragraph size="xlarge" />
      <Paragraph size="xxlarge" />
      <Paragraph fill />
      <Paragraph fill={false} />
      <Paragraph size="10px" />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph size renders outside grommet wrapper', () => {
  const { container } = render(<Paragraph size="small" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph margin renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph margin="small" />
      <Paragraph margin="medium" />
      <Paragraph margin="large" />
      <Paragraph margin="none" />
      <Paragraph margin={{ bottom: 'small' }} />
      <Paragraph margin={{ top: 'small' }} />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph textAlign renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Paragraph textAlign="start" />
      <Paragraph textAlign="center" />
      <Paragraph textAlign="end" />
      <Paragraph textAlign="justify" />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph maxLines renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Paragraph maxLines={3} />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph dangerouslySetInnerHTML renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Paragraph
        dangerouslySetInnerHTML={{
          __html: 'This is a dangerouslySetInnerHTML!',
        }}
      />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
