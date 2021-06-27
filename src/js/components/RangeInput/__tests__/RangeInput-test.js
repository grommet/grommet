import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { RangeInput } from '..';

describe('RangeInput', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <RangeInput value="50" a11yTitle="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <RangeInput value="50" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('track themed', () => {
    const { container } = render(
      <Grommet theme={{ rangeInput: { track: { color: 'brand' } } }}>
        <RangeInput value="10" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('track themed with color and opacity', () => {
    const { container } = render(
      <Grommet
        theme={{ rangeInput: { track: { color: 'brand', opacity: 0.3 } } }}
      >
        <RangeInput value="10" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('with min and max offset', () => {
    const { container } = render(
      <Grommet>
        <RangeInput min={10} max={20} step={1} value={15} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onFocus', () => {
    const onFocus = jest.fn();
    const { container, getByDisplayValue } = render(
      <Grommet>
        <RangeInput min={0} max={10} step={1} value={5} onFocus={onFocus} />
      </Grommet>,
    );

    fireEvent.focus(getByDisplayValue('5'));
    expect(onFocus).toHaveBeenCalledTimes(1);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onBlur', () => {
    const onBlur = jest.fn();
    const { container, getByDisplayValue } = render(
      <Grommet>
        <RangeInput min={0} max={10} step={1} value={5} onBlur={onBlur} />
      </Grommet>,
    );

    fireEvent.blur(getByDisplayValue('5'));
    expect(onBlur).toHaveBeenCalledTimes(1);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onChange', () => {
    const onChange = jest.fn();
    const { container, getByDisplayValue } = render(
      <Grommet>
        <RangeInput min={0} max={10} step={1} value={5} onChange={onChange} />
      </Grommet>,
    );

    fireEvent.change(getByDisplayValue('5'), {
      target: {
        value: '10',
      },
    });
    expect(onChange).toBeCalledTimes(1);

    expect(container.firstChild).toMatchSnapshot();
  });
});
