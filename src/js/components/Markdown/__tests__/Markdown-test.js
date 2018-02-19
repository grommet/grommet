import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Markdown } from '../';

const CONTENT = `
# H1

Paragraph

## H2

### H3

#### H4
`;

test('Markdown renders', () => {
  const component = renderer.create(
    <Grommet>
      <Markdown>{CONTENT}</Markdown>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
