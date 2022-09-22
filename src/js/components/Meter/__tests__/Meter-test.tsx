import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Meter } from '..';

const VALUES = [{ value: 20, label: 'twenty', onHover: () => {} }];

describe('Meter', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Meter />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('single', () => {
    const { container } = render(
      <Grommet>
        <Meter value={25} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Meter values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('many values', () => {
    const { container } = render(
      <Grommet>
        <Meter
          values={[
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
            { value: 5 },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('boundary values', () => {
    // for https://github.com/grommet/grommet/issues/6190
    const { container } = render(
      <Grommet>
        <Meter
          type="circle"
          values={[{ value: 2.26 }, { value: 8.04 }]}
          max={10.3}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('large circle values', () => {
    // for https://github.com/grommet/grommet/issues/6190
    const { container } = render(
      <Grommet>
        <Meter
          type="circle"
          values={[
            { value: 904426, color: 'graph-0' },
            { value: 692866, color: 'graph-1' },
            { value: 642068, color: 'graph-2' },
            { value: 512772, color: 'graph-3' },
            { value: 5032870, color: 'graph-4' },
          ]}
          size="small"
          thickness="small"
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('type', () => {
    const { container } = render(
      <Grommet>
        <Meter type="bar" values={VALUES} />
        <Meter type="circle" values={VALUES} />
        <Meter type="pie" values={VALUES} />
        <Meter type="semicircle" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Meter size="xsmall" values={VALUES} />
        <Meter size="small" values={VALUES} />
        <Meter size="medium" values={VALUES} />
        <Meter size="large" values={VALUES} />
        <Meter size="xlarge" values={VALUES} />
        <Meter size="24px" values={VALUES} />
        <Meter size="full" values={VALUES} />
        <Meter type="circle" size="xsmall" values={VALUES} />
        <Meter type="circle" size="small" values={VALUES} />
        <Meter type="circle" size="medium" values={VALUES} />
        <Meter type="circle" size="large" values={VALUES} />
        <Meter type="circle" size="xlarge" values={VALUES} />
        <Meter type="circle" size="55px" values={VALUES} />
        <Meter type="circle" size="full" values={VALUES} />
        <Meter type="pie" size="xsmall" values={VALUES} />
        <Meter type="pie" size="small" values={VALUES} />
        <Meter type="pie" size="medium" values={VALUES} />
        <Meter type="pie" size="large" values={VALUES} />
        <Meter type="pie" size="xlarge" values={VALUES} />
        <Meter type="pie" size="55px" values={VALUES} />
        <Meter type="pie" size="full" values={VALUES} />
        <Meter type="semicircle" size="xsmall" values={VALUES} />
        <Meter type="semicircle" size="small" values={VALUES} />
        <Meter type="semicircle" size="medium" values={VALUES} />
        <Meter type="semicircle" size="large" values={VALUES} />
        <Meter type="semicircle" size="xlarge" values={VALUES} />
        <Meter type="semicircle" size="55px" values={VALUES} />
        <Meter type="semicircle" size="full" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('thickness', () => {
    const { container } = render(
      <Grommet>
        <Meter thickness="xsmall" values={VALUES} />
        <Meter thickness="small" values={VALUES} />
        <Meter thickness="medium" values={VALUES} />
        <Meter thickness="large" values={VALUES} />
        <Meter thickness="xlarge" values={VALUES} />
        <Meter thickness="55px" values={VALUES} />
        <Meter type="circle" thickness="xsmall" values={VALUES} />
        <Meter type="circle" thickness="small" values={VALUES} />
        <Meter type="circle" thickness="medium" values={VALUES} />
        <Meter type="circle" thickness="large" values={VALUES} />
        <Meter type="circle" thickness="xlarge" values={VALUES} />
        <Meter type="circle" thickness="55px" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('round', () => {
    const { container } = render(
      <Grommet>
        <Meter round values={VALUES} />
        <Meter type="circle" round values={VALUES} />
        <Meter type="semicircle" round values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const { container } = render(
      <Grommet>
        <Meter background="light-3" values={VALUES} />
        <Meter
          background={{ color: 'light-3', opacity: 'medium' }}
          values={VALUES}
        />
        <Meter type="circle" background="light-3" values={VALUES} />
        <Meter
          type="circle"
          background={{ color: 'light-3', opacity: 'medium' }}
          values={VALUES}
        />
        <Meter
          background={{ color: 'light-3', opacity: 0.2 }}
          values={VALUES}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('vertical', () => {
    const { container } = render(
      <Grommet>
        <Meter direction="vertical" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
