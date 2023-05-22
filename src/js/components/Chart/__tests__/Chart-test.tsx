import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { Chart, calcs, ChartProps } from '..';

type ChartValues = ChartProps['values'];

const VALUES: ChartValues = [
  { value: [1, 60], label: 'sixty' },
  { value: [0, 0], label: 'zero' },
];

const UNDEFINED_VALUES: ChartValues = [
  { value: [2, 60], label: 'sixty' },
  { value: [1] },
  { value: [0, 0], label: 'zero' },
];

const STYLED_VALUES: ChartValues = [
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
    const { container } = render(
      <Grommet>
        <Chart values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('opacity', () => {
    const { container } = render(
      <Grommet>
        <Chart opacity values={VALUES} />
        <Chart opacity={false} values={VALUES} />
        <Chart opacity="strong" values={VALUES} />
        <Chart
          type="bar"
          values={[
            { value: [7, 100], label: 'one hundred', opacity: true },
            { value: [6, 70], label: 'seventy', opacity: 'medium' },
            { value: [5, 60], label: 'sixty', opacity: 'weak' },
            { value: [4, 80], label: 'eighty', opacity: 'strong' },
            { value: [3, 40], label: 'forty', opacity: false },
            { value: [2, 0], label: 'zero', opacity: 0.3 },
          ]}
        />
        <Chart
          type="point"
          point="circle"
          values={[
            { value: [7, 100], label: 'one hundred', opacity: true },
            { value: [6, 70], label: 'seventy', opacity: 'medium' },
            { value: [5, 60], label: 'sixty', opacity: 'weak' },
            { value: [4, 80], label: 'eighty', opacity: 'strong' },
            { value: [3, 40], label: 'forty', opacity: false },
            { value: [2, 0], label: 'zero', opacity: 0.3 },
          ]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('type', () => {
    const { container } = render(
      <Grommet>
        <Chart type="bar" values={VALUES} />
        <Chart type="line" values={VALUES} />
        <Chart type="area" values={VALUES} />
        <Chart type="point" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('thickness', () => {
    const { container } = render(
      <Grommet>
        <Chart thickness="xsmall" values={VALUES} />
        <Chart thickness="small" values={VALUES} />
        <Chart thickness="medium" values={VALUES} />
        <Chart thickness="large" values={VALUES} />
        <Chart thickness="xlarge" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('cap', () => {
    const { container } = render(
      <Grommet>
        <Chart round values={VALUES} />
        <Chart type="line" round values={VALUES} />
        <Chart type="area" round values={VALUES} />
        <Chart type="point" round values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap', () => {
    const { container } = render(
      <Grommet>
        <Box width="large">
          <Chart size={{ width: 'auto' }} gap="small" values={VALUES} />
          <Chart size={{ width: 'auto' }} gap="medium" values={VALUES} />
          <Chart size={{ width: 'auto' }} gap="large" values={VALUES} />
        </Box>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('dash', () => {
    const { container } = render(
      <Grommet>
        <Chart dash values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('point', () => {
    const { container } = render(
      <Grommet>
        <Chart type="point" point="circle" values={VALUES} />
        <Chart type="point" point="diamond" values={VALUES} />
        <Chart type="point" point="square" values={VALUES} />
        <Chart type="point" point="star" values={VALUES} />
        <Chart type="point" point="triangle" values={VALUES} />
        <Chart type="point" point="triangleDown" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pattern', () => {
    const { container } = render(
      <Grommet>
        <Chart type="area" pattern="squares" values={VALUES} />
        <Chart type="area" pattern="circles" values={VALUES} />
        <Chart type="area" pattern="stripesHorizontal" values={VALUES} />
        <Chart type="area" pattern="stripesVertical" values={VALUES} />
        <Chart type="area" pattern="stripesDiagonalDown" values={VALUES} />
        <Chart type="area" pattern="stripesDiagonalUp" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('value style', () => {
    const { container } = render(
      <Grommet>
        <Chart type="point" point="circle" values={STYLED_VALUES} />
        <Chart type="bar" values={STYLED_VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const { container } = render(
      <Grommet>
        <Chart pad="xsmall" values={VALUES} />
        <Chart
          pad={{ horizontal: 'medium', vertical: 'small' }}
          values={VALUES}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('vertical', () => {
    const { container } = render(
      <Grommet>
        <Chart direction="vertical" type="bar" values={VALUES} />
        <Chart direction="vertical" type="line" values={VALUES} />
        <Chart direction="vertical" type="area" values={VALUES} />
        <Chart direction="vertical" type="point" values={VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('animate', () => {
    const { container } = render(
      <Grommet>
        <Chart type="bar" values={VALUES} animate />
        <Chart type="line" values={VALUES} animate />
        <Chart type="area" values={VALUES} animate />
        <Chart type="point" values={VALUES} animate />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('undefined values', () => {
    const { container } = render(
      <Grommet>
        <Chart type="bar" values={UNDEFINED_VALUES} />
        <Chart type="line" values={UNDEFINED_VALUES} />
        <Chart type="area" values={UNDEFINED_VALUES} />
        <Chart type="point" values={UNDEFINED_VALUES} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
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

  test('renders a11yTitle and aria-label', () => {
    const LABEL = 'Test Label';
    const { container, getByLabelText } = render(
      <Grommet>
        <Chart a11yTitle={LABEL} values={VALUES} />
        <Chart aria-label={`${LABEL}-2`} values={VALUES} />
      </Grommet>,
    );
    expect(getByLabelText(LABEL)).toBeTruthy();
    expect(getByLabelText(`${LABEL}-2`)).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
