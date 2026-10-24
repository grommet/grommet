import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { DualRangeInput } from '..';

describe('DualRangeInput', () => {
  test('should have no accessibility violations', async () => {
    const { container, asFragment } = render(
      <Grommet>
        <DualRangeInput values={[20, 80]} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with default props', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput values={[25, 75]} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders outside Grommet wrapper', () => {
    const { asFragment } = render(<DualRangeInput values={[25, 75]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with min and max', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput min={10} max={50} values={[20, 40]} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with step', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput min={0} max={100} step={10} values={[20, 80]} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with label boolean', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput values={[20, 80]} label />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('80')).toBeTruthy();
  });

  test('renders with label function', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput values={[20, 80]} label={(value) => `${value}%`} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('20%')).toBeTruthy();
    expect(screen.getByText('80%')).toBeTruthy();
  });

  test('renders with color', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput values={[20, 80]} color="brand" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders with custom messages', () => {
    render(
      <Grommet>
        <DualRangeInput
          values={[20, 80]}
          messages={{ lower: 'Minimum Cores', upper: 'Maximum Cores' }}
        />
      </Grommet>,
    );
    expect(screen.getByLabelText('Minimum Cores')).toBeTruthy();
    expect(screen.getByLabelText('Maximum Cores')).toBeTruthy();
  });

  test('lower value change calls onChange', () => {
    const onChange = jest.fn();
    render(
      <Grommet>
        <DualRangeInput
          min={0}
          max={100}
          values={[20, 80]}
          onChange={onChange}
        />
      </Grommet>,
    );

    const lowerSlider = screen.getByLabelText('Lower Bound');
    fireEvent.change(lowerSlider, { target: { value: '30' } });
    expect(onChange).toHaveBeenCalledWith([30, 80]);
  });

  test('upper value change calls onChange', () => {
    const onChange = jest.fn();
    render(
      <Grommet>
        <DualRangeInput
          min={0}
          max={100}
          values={[20, 80]}
          onChange={onChange}
        />
      </Grommet>,
    );

    const upperSlider = screen.getByLabelText('Upper Bound');
    fireEvent.change(upperSlider, { target: { value: '60' } });
    expect(onChange).toHaveBeenCalledWith([20, 60]);
  });

  test('lower value cannot exceed upper value', () => {
    const onChange = jest.fn();
    render(
      <Grommet>
        <DualRangeInput
          min={0}
          max={100}
          values={[20, 80]}
          onChange={onChange}
        />
      </Grommet>,
    );

    const lowerSlider = screen.getByLabelText('Lower Bound');
    fireEvent.change(lowerSlider, { target: { value: '90' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('upper value cannot go below lower value', () => {
    const onChange = jest.fn();
    render(
      <Grommet>
        <DualRangeInput
          min={0}
          max={100}
          values={[20, 80]}
          onChange={onChange}
        />
      </Grommet>,
    );

    const upperSlider = screen.getByLabelText('Upper Bound');
    fireEvent.change(upperSlider, { target: { value: '10' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  test('uses defaultValues when values is not provided', () => {
    const { asFragment } = render(
      <Grommet>
        <DualRangeInput defaultValues={[30, 70]} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('aria attributes are set correctly', () => {
    render(
      <Grommet>
        <DualRangeInput min={0} max={100} values={[25, 75]} />
      </Grommet>,
    );

    const lowerSlider = screen.getByLabelText('Lower Bound');
    expect(lowerSlider).toHaveAttribute('aria-valuemin', '0');
    expect(lowerSlider).toHaveAttribute('aria-valuemax', '100');
    expect(lowerSlider).toHaveAttribute('aria-valuenow', '25');

    const upperSlider = screen.getByLabelText('Upper Bound');
    expect(upperSlider).toHaveAttribute('aria-valuemin', '0');
    expect(upperSlider).toHaveAttribute('aria-valuemax', '100');
    expect(upperSlider).toHaveAttribute('aria-valuenow', '75');
  });
});
