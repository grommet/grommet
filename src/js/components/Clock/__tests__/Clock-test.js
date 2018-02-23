import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Clock } from '../';

Enzyme.configure({ adapter: new Adapter() });

const DURATION = 'PT08H10M23S';
const TIME = 'T08:10:23';
const DATE = '2018-02-22T08:10:23-08:00';

describe('Clock', () => {
  test('Clock time renders', () => {
    const component = renderer.create(
      <Grommet>
        <Clock run={false} type='digital' time={DURATION} />
        <Clock run={false} type='digital' time={TIME} />
        <Clock run={false} type='digital' time={DATE} />
      </Grommet>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Clock run renders', (done) => {
    const component = mount(
      <Grommet>
        <Clock type='analog' run='forward' time={DURATION} />
        <Clock type='analog' run='backward' time={DURATION} />
        <Clock type='digital' run='forward' time={DURATION} />
        <Clock type='digital' run='backward' time={DURATION} />
      </Grommet>
    );
    expect(component.getDOMNode()).toMatchSnapshot();

    // give some time for the clock to move and use the callback
    setTimeout(() => {
      expect(component.getDOMNode()).toMatchSnapshot();
      component.unmount();
      done();
    }, 1300);
  });

  ['analog', 'digital'].forEach(type => (
    ['hours', 'minutes', 'seconds'].forEach(precision => (
      ['xsmall', 'small', 'medium', 'large', 'xlarge'].forEach(size => (
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
            </Grommet>
          );
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        })
      ))
    ))
  ));
});
