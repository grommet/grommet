import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataChart } from '..';

const data = [
  { a: 1, b: 'one', c: 111111 },
  { a: 2, b: 'two', c: 222222 },
];

describe('DataChart', () => {
  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <DataChart data={data} chart={{ key: 'a' }} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('thickness', () => {
    const component = renderer.create(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large', 'xlarge'].map(thickness => (
          <DataChart
            key={thickness}
            data={data}
            chart={{ key: 'a' }}
            thickness={thickness}
          />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gap', () => {
    const component = renderer.create(
      <Grommet>
        {['small', 'medium', 'large'].map(gap => (
          <DataChart key={gap} data={data} chart={{ key: 'a' }} gap={gap} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad', () => {
    const component = renderer.create(
      <Grommet>
        {['small', 'medium', 'large'].map(pad => (
          <DataChart key={pad} data={data} chart={{ key: 'a' }} pad={pad} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        {[
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          { width: 'fill' },
          { width: 'auto' },
        ].map((size, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} chart={{ key: 'a' }} size={size} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('xAxis', () => {
    const component = renderer.create(
      <Grommet>
        {[
          true,
          false,
          { guide: true },
          { key: 'b' },
          { labels: 2 },
          { key: 'b', render: b => b },
        ].map((xAxis, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} chart={{ key: 'a' }} xAxis={xAxis} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('yAxis', () => {
    const component = renderer.create(
      <Grommet>
        {[
          true,
          false,
          { guide: true },
          { labels: 2 },
          { labels: 5 },
          { render: v => v },
          { prefix: '$' },
          { suffix: '%' },
        ].map((yAxis, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} chart={{ key: 'a' }} yAxis={yAxis} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('yAxis rounding', () => {
    const component = renderer.create(
      <Grommet>
        {[true, { labels: 4 }].map((yAxis, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} chart={{ key: 'c' }} yAxis={yAxis} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
