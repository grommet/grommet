import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Chart, calcs } from '..';

const VALUES = [
  { value: [1, 60], label: 'sixty' },
  { value: [0, 0], label: 'zero' },
];

const UNDEFINED_VALUES = [
  { value: [2, 60], label: 'sixty' },
  { value: [1, undefined] },
  { value: [0, 0], label: 'zero' },
];

const STYLED_VALUES = [
  {
    value: [1, 60],
    label: 'sixty',
    color: 'status-ok',
    opacity: 'strong',
    thickness: 'small',
  },
  {
    value: [0, 0],
    label: 'zero',
    color: '#123456',
    opacity: 0.27,
    thickness: 27,
  },
];

describe('Chart', () => {
  afterEach(cleanup);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Chart values={VALUES} />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <Chart values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('type', () => {
    const component = renderer.create(
      <Grommet>
        <Chart type="bar" values={VALUES} />
        <Chart type="line" values={VALUES} />
        <Chart type="area" values={VALUES} />
        <Chart type="point" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        <Chart size="xsmall" values={VALUES} />
        <Chart size="small" values={VALUES} />
        <Chart size="medium" values={VALUES} />
        <Chart size="large" values={VALUES} />
        <Chart size="xlarge" values={VALUES} />
        <Box width="large">
          <Chart size={{ width: 'full' }} values={VALUES} />
          <Chart size={{ width: 'fill' }} values={VALUES} />
          <Chart size={{ width: 'auto' }} values={VALUES} />
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('thickness', () => {
    const component = renderer.create(
      <Grommet>
        <Chart thickness="xsmall" values={VALUES} />
        <Chart thickness="small" values={VALUES} />
        <Chart thickness="medium" values={VALUES} />
        <Chart thickness="large" values={VALUES} />
        <Chart thickness="xlarge" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('cap', () => {
    const component = renderer.create(
      <Grommet>
        <Chart round values={VALUES} />
        <Chart type="line" round values={VALUES} />
        <Chart type="area" round values={VALUES} />
        <Chart type="point" round values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('gap', () => {
    const component = renderer.create(
      <Grommet>
        <Box width="large">
          <Chart size={{ width: 'auto' }} gap="small" values={VALUES} />
          <Chart size={{ width: 'auto' }} gap="medium" values={VALUES} />
          <Chart size={{ width: 'auto' }} gap="large" values={VALUES} />
        </Box>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('dash', () => {
    const component = renderer.create(
      <Grommet>
        <Chart dash values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <Grommet>
        <Chart color="brand" values={VALUES} />
        <Chart color={{ color: 'brand', opacity: 'strong' }} values={VALUES} />
        <Chart
          color={[
            { value: 0, color: 'brand' },
            { value: 60, color: 'border' },
          ]}
          values={VALUES}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('point', () => {
    const component = renderer.create(
      <Grommet>
        <Chart type="point" point="circle" values={VALUES} />
        <Chart type="point" point="diamond" values={VALUES} />
        <Chart type="point" point="square" values={VALUES} />
        <Chart type="point" point="star" values={VALUES} />
        <Chart type="point" point="triangle" values={VALUES} />
        <Chart type="point" point="triangleDown" values={VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('value style', () => {
    const component = renderer.create(
      <Grommet>
        <Chart type="point" point="circle" values={STYLED_VALUES} />
        <Chart type="bar" values={STYLED_VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('pad', () => {
    const component = renderer.create(
      <Grommet>
        <Chart pad="xsmall" values={VALUES} />
        <Chart
          pad={{ horizontal: 'medium', vertical: 'small' }}
          values={VALUES}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('undefined values', () => {
    const component = renderer.create(
      <Grommet>
        <Chart type="bar" values={UNDEFINED_VALUES} />
        <Chart type="line" values={UNDEFINED_VALUES} />
        <Chart type="area" values={UNDEFINED_VALUES} />
        <Chart type="point" values={UNDEFINED_VALUES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calcs basic', () => {
    const result = calcs([
      [1, 2, 2],
      [2, 2, 2],
    ]);
    expect(result).toMatchSnapshot();
  });

  test('calcs with single value', () => {
    const result = calcs([1]);
    expect(result).toMatchSnapshot();
  });

  test('calcs with negative min', () => {
    const result = calcs([
      [1, -2, -2],
      [2, 2, 2],
    ]);
    expect(result).toMatchSnapshot();
  });

  test('calcs large thickness', () => {
    const vals = Array(8).fill([1, 2, 3]);
    const result = calcs(vals);
    expect(result).toMatchSnapshot();
  });

  test('calcs medium thickness', () => {
    const vals = Array(14).fill([1, 2, 3]);
    const result = calcs(vals);
    expect(result).toMatchSnapshot();
  });

  test('calcs small thickness', () => {
    const vals = Array(24).fill([1, 2, 3]);
    const result = calcs(vals);
    expect(result).toMatchSnapshot();
  });

  test('calcs xsmall thickness', () => {
    const vals = Array(64).fill([1, 2, 3]);
    const result = calcs(vals);
    expect(result).toMatchSnapshot();
  });

  test('calcs hair thickness', () => {
    const vals = Array(124).fill([1, 2, 3]);
    const result = calcs(vals);
    expect(result).toMatchSnapshot();
  });
});
