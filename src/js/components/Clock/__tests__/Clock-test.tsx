import React from 'react';
import { render, act } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Clock, ClockExtendedProps } from '..';
import { ThemeType } from '../../../themes';

const DURATION = 'PT18H23M34S';
const TIME = 'T18:23:34';
const TIME2 = 'T18:23';
const DATE = '2018-02-22T18:23:34-10:00';

const CLOCKTYPES: ClockExtendedProps['type'][] = ['analog', 'digital'];
const PRECISIONS: ClockExtendedProps['precision'][] = [
  'hours',
  'minutes',
  'seconds',
];
const SIZES: ClockExtendedProps['size'][] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
];

describe('Clock', () => {
  test('time', () => {
    const { container } = render(
      <Grommet>
        <Clock run={false} type="digital" time={DURATION} />
        <Clock run={false} type="digital" time={TIME} />
        <Clock run={false} type="digital" time={TIME2} />
        <Clock run={false} type="digital" time={DATE} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('hourLimit', () => {
    const { container } = render(
      <Grommet>
        <Clock run={false} type="digital" time={DURATION} hourLimit={12} />
        <Clock run={false} type="digital" time={DURATION} hourLimit={24} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('run', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Grommet>
        <Clock type="analog" run="forward" time={DURATION} />
        <Clock type="analog" run="backward" time={DURATION} />
        <Clock type="digital" run="forward" time={DURATION} />
        <Clock type="digital" run="backward" time={DURATION} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      jest.advanceTimersByTime(1300);
    });
    expect(container.firstChild).toMatchSnapshot();

    // give some time for the clock to move and use the callback
  });

  CLOCKTYPES.forEach((type) =>
    PRECISIONS.forEach((precision) =>
      SIZES.forEach((size) =>
        test(`type ${type} precision ${precision} size ${size}`, () => {
          const { container } = render(
            <Grommet>
              <Clock
                run={false}
                type={type}
                precision={precision}
                size={size}
                time={DURATION}
              />
            </Grommet>,
          );

          expect(container.firstChild).toMatchSnapshot();
        }),
      ),
    ),
  );

  PRECISIONS.forEach((precision) =>
    test(`type analog precision ${precision} size huge`, () => {
      const { container } = render(
        <Grommet>
          <Clock
            run={false}
            type="analog"
            precision={precision}
            size="huge"
            time={DURATION}
          />
        </Grommet>,
      );

      expect(container.firstChild).toMatchSnapshot();
    }),
  );

  test('type digital custom size', () => {
    const override: ThemeType = {
      clock: {
        digital: {
          text: {
            customSize: {
              size: '30px',
              height: 1.234,
            },
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={override}>
        <Clock type="digital" run={false} time={DURATION} size="customSize" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
