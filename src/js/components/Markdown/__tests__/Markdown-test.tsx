import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';

import { Grommet } from '../../Grommet';
import { Markdown } from '..';
import { Box } from '../../Box';

const CONTENT = `
# H1

Paragraph

## H2

### H3

#### H4

[a link](#)

> i carry your heart with me

![alt text](//v2.grommet.io/assets/IMG_4245.jpg "Markdown Image")

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3
`;

const Wrapper = (props: any) => <Box gap="small" {...props} />;

test('Markdown renders', () => {
  const { container } = render(
    <Grommet theme={hpe}>
      <Markdown>{CONTENT}</Markdown>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('Markdown renders without grommet wrapper', () => {
  const { container } = render(<Markdown>{CONTENT}</Markdown>);

  expect(container.firstChild).toMatchSnapshot();
});

test('wrapper', () => {
  const { container } = render(
    <Grommet>
      <Markdown options={{ wrapper: Wrapper }}>{CONTENT}</Markdown>
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
