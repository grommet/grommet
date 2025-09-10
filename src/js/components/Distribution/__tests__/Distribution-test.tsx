import React from 'react';
import 'jest-styled-components';
import { render } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { Distribution } from '..';

describe('Distribution', () => {
  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Distribution values={[]} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders outside grommet wrapper', () => {
    const { container } = render(<Distribution values={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('values renders', () => {
    const { container } = render(
      <Grommet>
        <Distribution
          values={[{ value: 20 }, { value: 3 }, { value: 2 }, { value: 1 }]}
        >
          {(value) => <span>{value.value}</span>}
        </Distribution>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('undefined value', () => {
    const { container } = render(
      <Grommet>
        <Distribution
          values={
            // @ts-ignore
            [{ value: 20 }, { value: undefined }]
          }
        >
          {(value) => <span>{value.value}</span>}
        </Distribution>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap renders', () => {
    const { container } = render(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large'].map((gap) => (
          <Distribution
            key={gap}
            gap={gap}
            values={[{ value: 3 }, { value: 2 }, { value: 1 }]}
          >
            {(value) => <span>{value.value}</span>}
          </Distribution>
        ))}
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  test('theme gap', () => {
    const customTheme = {
      distribution: {
        gap: 'large',
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <Distribution
          values={[{ value: 20 }, { value: 10 }, { value: 5 }, { value: 3 }]}
        >
          {(value) => <span>{value.value}</span>}
        </Distribution>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
