import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Distribution } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('Distribution renders', () => {
  const component = mount(
    <Grommet>
      <Distribution values={[{ value: 2 }, { value: 1 }]}>
        {value => <span>{value.value}</span>}
      </Distribution>
    </Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});

test('Distribution gap renders', () => {
  const component = mount(
    <Grommet>
      {['xsmall', 'small', 'medium', 'large'].map(gap => (
        <Distribution gap={gap} values={[{ value: 2 }, { value: 1 }]}>
          {value => <span>{value.value}</span>}
        </Distribution>
      ))}
    </Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
});
