import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { ThumbsRating } from '..';

describe('ThumbsRating', () => {
  test('ThumbsRating with string options', () => {
    const { container } = render(
      <Grommet>
        <ThumbsRating name="test" options={['positive', 'negative']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('ThumbsRating with color star green', () => {
    const { container } = render(
      <Grommet>
        <ThumbsRating name="test" color="green" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('ThumbsRating with color outline and fill', () => {
    const { container } = render(
      <Grommet>
        <ThumbsRating name="test" color={{ outline: 'green', fill: 'pink' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('ThumbsRating with defaultValue', () => {
    const { container } = render(
      <Grommet>
        <ThumbsRating name="test" options={['one', 'two']} defaultValue="one" />
      </Grommet>,
    );

    expect(container).toMatchSnapshot();
  });
});
