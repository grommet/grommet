import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Responsive } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('Responsive renders', () => {
  const onChange = jest.fn();
  const component = mount(
    <Responsive onChange={onChange}>
      <span>hi</span>
    </Responsive>
  );
  expect(component.getDOMNode()).toMatchSnapshot();

  global.window.innerWidth = 40;
  global.window.innerHeight = 40;
  global.window.dispatchEvent(new Event('resize'));

  expect(onChange).toBeCalledWith('narrow');

  global.window.innerWidth = 2000;
  global.window.innerHeight = 2000;
  global.window.dispatchEvent(new Event('resize'));

  expect(onChange).toBeCalledWith('wide');

  component.unmount();
});
