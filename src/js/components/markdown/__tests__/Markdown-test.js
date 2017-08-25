import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Markdown } from '../';

test('Markdown renders', () => {
  const component = renderer.create(
    <Grommet>
      <Markdown
        content={`
          # H1

          Paragraph

          ## H2

          ### H3

          #### H4
        `}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
