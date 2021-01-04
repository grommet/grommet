import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, act } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { Clock } from '..';

const DURATION = 'PT18H23M34S';
const TIME = 'T18:23:34';
const TIME2 = 'T18:23';
const DATE = '2018-02-22T18:23:34-10:00';

describe('Clock', () => {
  afterEach(cleanup);

  test('time', () => {
    const component = renderer.create(
      <Grommet>
        <Clock run={false} type="digital" time={DURATION} />
        <Clock run={false} type="digital" time={TIME} />
        <Clock run={false} type="digital" time={TIME2} />
        <Clock run={false} type="digital" time={DATE} />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('hourLimit', () => {
    const component = renderer.create(
      <Grommet>
        <Clock run={false} type="digital" time={DURATION} hourLimit={12} />
        <Clock run={false} type="digital" time={DURATION} hourLimit={24} />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
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

  ['analog', 'digital'].forEach(type =>
    ['hours', 'minutes', 'seconds'].forEach(precision =>
      ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].forEach(
        size =>
          test(`type ${type} precision ${precision} size ${size}`, () => {
            const component = renderer.create(
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
            expect(component.toJSON()).toMatchSnapshot();
          }),
      ),
    ),
  );

  ['hours', 'minutes', 'seconds'].forEach(precision =>
    test(`type analog precision ${precision} size huge`, () => {
      const component = renderer.create(
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
      expect(component.toJSON()).toMatchSnapshot();
    }),
  );

  test('type digital custom size', () => {
    const override = {
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

    const component = renderer.create(
      <Grommet theme={override}>
        <Clock type="digital" run={false} time={DURATION} size="customSize" />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
