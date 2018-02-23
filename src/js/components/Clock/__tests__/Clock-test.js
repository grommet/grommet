import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Clock } from '../';

Enzyme.configure({ adapter: new Adapter() });

const RealDate = Date;
class DayTimeDate extends RealDate {
  constructor() {
    super();
    return new RealDate('2017-06-13T04:40:59.000Z');
  }
}

describe('Clock', () => {
  beforeEach(() => {
    global.Date = DayTimeDate;
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  test('Clock run renders', (done) => {
    const component = mount(
      <Grommet>
        <Clock type='analog' run='forward' />
        <Clock type='analog' run='backward' />
        <Clock type='digital' run='forward' />
        <Clock type='digital' run='backward' />
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
              <Clock run={false} type={type} precision={precision} size={size} />
            </Grommet>
          );
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        })
      ))
    ))
  ));
});
