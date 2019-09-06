import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';

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

  test('run', done => {
    const { container } = render(
      <Grommet>
        <Clock type="analog" run="forward" time={DURATION} />
        <Clock type="analog" run="backward" time={DURATION} />
        <Clock type="digital" run="forward" time={DURATION} />
        <Clock type="digital" run="backward" time={DURATION} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // give some time for the clock to move and use the callback
    setTimeout(() => {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });

  ['analog', 'digital'].forEach(type =>
    ['hours', 'minutes', 'seconds'].forEach(precision =>
      ['xsmall', 'small', 'medium', 'large', 'xlarge'].forEach(size =>
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
});
