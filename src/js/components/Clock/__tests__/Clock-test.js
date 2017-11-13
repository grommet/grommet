import React from 'react';
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

class NightTimeDate extends RealDate {
  constructor() {
    super();
    return new RealDate('2017-06-13T18:40:30.000Z');
  }
}

describe('Clock', () => {
  beforeEach(() => {
    global.Date = DayTimeDate;
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  test('renders', (done) => {
    const component = mount(
      <Grommet>
        <Clock seconds={true} />
      </Grommet>
    );
    expect(component.getDOMNode()).toMatchSnapshot();

    // give sometime for the clock to move and use the callback
    setTimeout(() => {
      expect(component.getDOMNode()).toMatchSnapshot();

      component.unmount();

      done();
    }, 1100);
  });

  test('night renders', (done) => {
    global.Date = NightTimeDate;

    const component = mount(
      <Clock night={true} />
    );
    expect(component.getDOMNode()).toMatchSnapshot();

    // give sometime for the clock to move and use the callback
    setTimeout(() => {
      component.setProps({ timezone: 'America/Sao_Paulo' });

      expect(component.getDOMNode()).toMatchSnapshot();

      component.unmount();

      done();
    }, 1100);
  });
});
