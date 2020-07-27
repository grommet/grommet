import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataChart } from '..';

const data = [
  { a: 1, b: 'one', c: 111111 },
  { a: 2, b: 'two', c: 222222 },
];
const warnMsg = `The DataChart component is still experimental.
      It is not guaranteed to be backwards compatible until it is explicitly
      released. Keep an eye on the release notes and #announcements channel
      in Slack.`;

describe('DataChart', () => {
  test('default', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const component = renderer.create(
      <Grommet>
        <DataChart data={data} chart={{ key: 'a' }} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenLastCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('thickness', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
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
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('gap', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const component = renderer.create(
      <Grommet>
        {['small', 'medium', 'large'].map(gap => (
          <DataChart key={gap} data={data} chart={{ key: 'a' }} gap={gap} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('pad', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const component = renderer.create(
      <Grommet>
        {['small', 'medium', 'large'].map(pad => (
          <DataChart key={pad} data={data} chart={{ key: 'a' }} pad={pad} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('size', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const component = renderer.create(
      <Grommet>
        {['fill', { width: 'fill' }, { width: 'auto' }].map((size, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <DataChart key={i} data={data} chart={{ key: 'a' }} size={size} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('xAxis', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
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
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('xAxis dates', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
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
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('yAxis', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
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
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });

  test('yAxis rounding', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
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
    expect(warnSpy).toHaveBeenCalledWith(warnMsg);
    warnSpy.mockRestore();
  });
});
