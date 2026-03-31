import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Paragraph } from '..';
import { Box } from '../../Box';

test('Paragraph renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph size renders', () => {
  const { container } = render(
    <Grommet>
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
    <Grommet>
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
    <Grommet>
      <Paragraph maxLines={3} />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Paragraph dangerouslySetInnerHTML renders', () => {
  const { container } = render(
    <Grommet>
      <Paragraph
        dangerouslySetInnerHTML={{
          __html: 'This is a dangerouslySetInnerHTML!',
        }}
      />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('theme skeleton gap', () => {
  const customTheme = {
    paragraph: {
      skeleton: {
        gap: 'large',
      },
    },
  };

  const { asFragment } = render(
    <Grommet theme={customTheme}>
      <Box skeleton>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
        <Paragraph size="small">Short paragraph text.</Paragraph>
        <Paragraph size="large">
          Longer paragraph with more content to show skeleton gap effect.
        </Paragraph>
      </Box>
    </Grommet>,
  );

  expect(asFragment()).toMatchSnapshot();
});
