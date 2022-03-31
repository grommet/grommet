import React, { Fragment } from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { DataChart } from '..';

const data = [
  { a: 1, b: 'one', c: 111111, d: '2020-06-24' },
  { a: 2, b: 'two', c: 222222, d: '2020-06-23' },
];

describe('DataChart', () => {
  let warnSpy;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  test('default', () => {
    const { container } = render(
      <Grommet>
        <DataChart data={data} series="a" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('nothing', () => {
    const { container } = render(
      <Grommet>
        <DataChart data={data} />
        <DataChart data={data} series={[]} />
        <DataChart data={data} series={[{}]} />
        <DataChart data={data} series={[{ property: 'a' }, {}]} />
        <DataChart data={data} chart={[]} />
        <DataChart data={data} chart={[{}]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap', () => {
    const { container } = render(
      <Grommet>
        {['small', 'medium', 'large'].map((gap) => (
          <DataChart key={gap} data={data} series="a" gap={gap} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        {['small', 'medium', 'large'].map((pad) => (
          <DataChart key={pad} data={data} series="a" pad={pad} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        {['fill', { width: 'fill' }, { width: 'auto' }].map((size, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} series="a" size={size} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('axis', () => {
    const { container } = render(
      <Grommet>
        {[
          true,
          false,
          { x: { property: 'd' } },
          { y: { property: 'a' } },
          { x: { property: 'd', granularity: 'fine' } },
          { y: { property: 'a', granularity: 'fine' } },
        ].map((axis, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} series="a" axis={axis} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('dates', () => {
    const dateData = [];
    for (let i = 0; i < 4; i += 1) {
      const digits = ((i % 12) + 1).toString().padStart(2, 0);
      dateData.push({
        second: `2020-05-15T08:04:${digits}`,
        minute: `2020-05-15T08:${digits}:00`,
        hour: `2020-05-15T${digits}:00:00`,
        day: `2020-05-${digits}T08:00:00`,
        month: `2020-${digits}-15`,
        year: `20${digits}-01-15`,
        percent: Math.abs(i * 10),
        amount: i * 111111,
      });
    }
    const { container } = render(
      <Grommet>
        {['second', 'minute', 'hour', 'day', 'month', 'year'].map((key) => (
          <Fragment key={key}>
            <DataChart
              data={dateData}
              series={[{ property: key }, 'amount']}
              axis
              guide
            />
          </Fragment>
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('guide', () => {
    const { container } = render(
      <Grommet>
        {[
          true,
          false,
          { x: { granularity: 'fine' } },
          { y: { granularity: 'fine' } },
        ].map((guide, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} series="a" guide={guide} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('legend', () => {
    const { container } = render(
      <Grommet>
        {[true, false].map((legend, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} series="a" legend={legend} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('detail', () => {
    const { container } = render(
      <Grommet>
        {[true, false].map((detail, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} series="a" detail={detail} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('axis x granularity', () => {
    const { container } = render(
      <Grommet>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((count) => (
          <DataChart
            key={count}
            data={Array.from({ length: count }, (x, i) => ({ a: i }))}
            series="a"
            axis={{ x: { granularity: 'medium' } }}
          />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('type', () => {
    const { container } = render(
      <Grommet>
        {['bar', 'line', 'area'].map((type) => (
          <DataChart
            key={type}
            data={data}
            series="a"
            chart={[{ property: 'a', type }]}
          />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bars', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a', 'c']}
          chart={[{ property: ['a', 'c'], type: 'bars' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bars colors', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a', 'c']}
          chart={[
            {
              property: [
                { property: 'a', color: 'graph-1' },
                { property: 'c', color: 'graph-3' },
              ],
              type: 'bars',
            },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bars invalid', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a']}
          chart={[{ property: ['a', 'c', ''], type: 'bars' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bars empty', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a']}
          chart={[{ property: [], type: 'bars' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('areas', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a', 'c']}
          chart={[
            {
              property: [
                { property: 'a', thickness: 'hair', opacity: 'medium' },
                'c',
              ],
              type: 'areas',
            },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('lines', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data}
          series={['a', 'c']}
          chart={[{ property: ['a', 'c'], type: 'lines' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('offset', () => {
    const { container } = render(
      <Grommet>
        <DataChart data={data} series={['a', 'c']} offset />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bounds align', () => {
    const { container } = render(
      <Grommet>
        <DataChart data={data} series={['a', 'c']} bounds="align" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('bounds explicit', () => {
    const { container } = render(
      <Grommet>
        <DataChart data={data} series={['a', 'c']} bounds={{ y: [0, 100] }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('placeholder text', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data.map(({ d }) => ({ d }))} // date only
          series={['d', 'a']}
          bounds={{ y: [0, 100] }}
          placeholder="no data"
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('placeholder node', () => {
    const { container } = render(
      <Grommet>
        <DataChart
          data={data.map(({ d }) => ({ d }))} // date only
          series={['d', 'a']}
          bounds={{ y: [0, 100] }}
          placeholder={
            <Box fill background="light-3" align="center" justify="center">
              <Text>no data</Text>
            </Box>
          }
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
