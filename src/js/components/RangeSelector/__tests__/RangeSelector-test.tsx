import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { RangeSelector } from '..';

describe('RangeSelector', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic with theme edge size', () => {
    const theme = {
      rangeSelector: {
        edge: {
          size: 'medium',
        },
      },
    };

    const { container } = render(
      <Grommet theme={theme}>
        <RangeSelector values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  const edgeSizes = ['small', 'medium', 'large', 'xlarge']; // use all supported sizes

  edgeSizes.forEach((size) => {
    test(`renders with edge size: ${size}`, () => {
      const theme = {
        rangeSelector: {
          edge: { size },
        },
      };
      const { container } = render(
        <Grommet theme={theme}>
          <RangeSelector values={[10, 40]} />
        </Grommet>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('renders with default edge size when not specified', () => {
    const theme = {
      rangeSelector: {},
    };
    const { container } = render(
      <Grommet theme={theme}>
        <RangeSelector values={[5, 25]} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders gracefully with invalid edge size', () => {
    const theme = {
      rangeSelector: {
        edge: { size: 'not-a-real-size' },
      },
    };
    const { container } = render(
      <Grommet theme={theme}>
        <RangeSelector values={[15, 35]} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic outside grommet wrapper', () => {
    const { container } = render(<RangeSelector values={[20, 30]} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector color="accent-1" values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('direction', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector direction="horizontal" values={[20, 30]} />
        <RangeSelector direction="vertical" values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('invert', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector invert values={[20, 30]} />
        <RangeSelector invert={false} values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('max', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector max={50} values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('min', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector min={10} values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('label', () => {
    const { container } = render(
      <Grommet>
        <RangeSelector label values={[20, 30]} />
        <RangeSelector label={(value) => `${value}%`} values={[20, 30]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('opacity', () => {
    const { container } = render(
      <Grommet>
        {['weak', 'medium', 'strong'].map((opacity) => (
          <RangeSelector key={opacity} opacity={opacity} values={[20, 30]} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('round', () => {
    const { container } = render(
      <Grommet>
        {['xsmall', 'small', 'medium', 'large', 'full'].map((round) => (
          <RangeSelector key={round} round={round} values={[20, 30]} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        {[
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'full',
        ].map((size) => (
          <RangeSelector key={size} size={size} values={[20, 30]} />
        ))}
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('step renders correct values', () => {
    let values: number[] = [];
    const setValues = (newValues: number[]) => {
      values = newValues;
    };
    const onChange = jest.fn((nextValues) => setValues(nextValues));
    const { container } = render(
      <Grommet>
        <RangeSelector values={[0, 100]} step={3} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    const lowerControl = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    const lowerHandle = lowerControl.parentElement?.querySelector('div');
    if (lowerHandle) {
      fireEvent.mouseDown(lowerHandle);
      fireEvent.mouseMove(lowerHandle, { clientX: 31, clientY: 20 });
      fireEvent.mouseUp(document);
      expect(onChange).toHaveBeenCalled();
      expect(values).toStrictEqual([33, 100]);
    }

    const upperControl = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });
    const upperHandle = upperControl.parentElement?.querySelector('div');
    if (upperHandle) {
      fireEvent.mouseDown(upperHandle);
      fireEvent.mouseMove(document, { clientX: 80, clientY: 15 });
      fireEvent.mouseUp(document);
      expect(onChange).toHaveBeenCalled();
      expect(values).toStrictEqual([0, 81]);
    }
  });

  test('handle keyboard', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const lowerControl = screen.getByRole('slider', {
      name: 'Lower Bounds',
    });
    fireEvent.keyDown(lowerControl, { key: 'Left', keyCode: 37 });
    expect(onChange).toHaveBeenCalled();

    fireEvent.keyDown(lowerControl, { key: 'Right', keyCode: 39 });
    expect(onChange).toHaveBeenCalled();

    const upperControl = screen.getByRole('slider', {
      name: 'Upper Bounds',
    });
    fireEvent.keyDown(upperControl, { key: 'Right', keyCode: 39 });
    expect(onChange).toHaveBeenCalled();

    fireEvent.keyDown(upperControl, { key: 'Left', keyCode: 37 });
    expect(onChange).toHaveBeenCalled();
  });

  test('handle mouse', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Grommet>
        <RangeSelector values={[20, 30]} onChange={onChange} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const rangeContainer = container.firstChild?.firstChild;

    if (rangeContainer) {
      fireEvent.click(rangeContainer, {
        clientX: 0,
        clientY: 0,
      });
      expect(onChange).toHaveBeenCalled();

      const lowerControl = screen.getByRole('slider', {
        name: 'Lower Bounds',
      });
      fireEvent.mouseDown(lowerControl);
      fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });
      fireEvent.mouseUp(document);
      expect(onChange).toHaveBeenCalled();

      const upperControl = screen.getByRole('slider', {
        name: 'Upper Bounds',
      });
      fireEvent.mouseDown(upperControl);
      fireEvent.mouseMove(document, { clientX: 0, clientY: 0 });
      fireEvent.mouseUp(document);
      expect(onChange).toHaveBeenCalled();
    }
  });

  test('handle touch gestures', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Grommet>
        <RangeSelector values={[10, 20]} onChange={onChange} />
      </Grommet>,
    );
    const rangeContainer = container.firstChild?.firstChild;

    if (rangeContainer) {
      const lowerSliderInput = screen.getByRole('slider', {
        name: 'Lower Bounds',
      });
      const lowerVisualControl = lowerSliderInput.nextElementSibling;
      if (lowerVisualControl) {
        fireEvent.touchStart(lowerVisualControl);
        fireEvent.touchMove(rangeContainer, {
          changedTouches: [
            {
              clientX: 0,
              clientY: 0,
            },
          ],
        });
        expect(onChange).toHaveBeenCalled();
      }

      const upperControl = screen.getByRole('slider', {
        name: 'Upper Bounds',
      });
      fireEvent.touchStart(upperControl);
      fireEvent.touchMove(rangeContainer, {
        changedTouches: [
          {
            clientX: 0,
            clientY: 0,
          },
        ],
      });
      expect(onChange).toHaveBeenCalled();
      expect(container.firstChild).toMatchSnapshot();
    }
  });
});
