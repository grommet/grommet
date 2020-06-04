import React, { Fragment } from 'react';
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

  test('xAxis dates', () => {
    const dateData = [];
    for (let i = 0; i < 4; i += 1) {
      dateData.push({
        second: `2020-05-15T08:04:${((i % 12) + 1).toString().padStart(2, 0)}`,
        minute: `2020-05-15T08:${((i % 12) + 1).toString().padStart(2, 0)}:00`,
        hour: `2020-05-15T${((i % 12) + 1).toString().padStart(2, 0)}:00:00`,
        day: `2020-05-${((i % 12) + 1).toString().padStart(2, 0)}`,
        month: `2020-${((i % 12) + 1).toString().padStart(2, 0)}-15`,
        year: `20${((i % 12) + 1).toString().padStart(2, 0)}-01-15`,
        percent: Math.abs(i * 10),
        amount: i * 111111,
      });
    }
    const component = renderer.create(
      <Grommet>
        {['second', 'minute', 'hour', 'day', 'month', 'year'].map(key => (
          <Fragment key={key}>
            <DataChart
              data={dateData}
              chart={{ key: 'amount' }}
              xAxis={{ key, labels: 2 }}
            />
            <DataChart
              data={dateData}
              chart={{ key: 'percent' }}
              xAxis={{ key }}
            />
          </Fragment>
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
