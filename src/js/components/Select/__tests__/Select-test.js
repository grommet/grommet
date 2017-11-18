import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Select } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('Select', () => {
  beforeEach(createPortal);

  test('mounts', (done) => {
    const component = mount(
      <Select id='select' options={['one', 'two']} />
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('select-drop__select')).toBeNull();

    component.simulate('click');

    expect(component.getDOMNode()).toMatchSnapshot();
    expectPortal('select-drop__select').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });

  test('mounts with complex options and children', () => {
    const component = mount(
      <Select id='select' options={[{ test: 'one' }, { test: 'two' }]}>
        {option => <span>{option.test}</span>}
      </Select>
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('select-drop__select')).toBeNull();

    component.simulate('click');

    expect(component.getDOMNode()).toMatchSnapshot();
    expectPortal('select-drop__select').toMatchSnapshot();
  });

  test('mounts with search', (done) => {
    const onSearch = jest.fn();
    const component = mount(
      <Select id='select' options={['one', 'two']} onSearch={onSearch} />
    );
    component.simulate('click');

    expectPortal('select-drop__select').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();

      document.activeElement.value = 'a';

      Simulate.input(document.activeElement);

      // wait for debounce to kick in
      setTimeout(() => {
        expect(onSearch).toBeCalledWith('a');
        expectPortal('select-drop__select').toMatchSnapshot();
        done();
      }, 200);
    }, 100);
  });

  test('closes drop on esc', () => {
    const component = mount(
      <Select id='select' options={['one', 'two']} />
    );

    component.simulate('click');

    expectPortal('select-drop__select').toMatchSnapshot();
    expect(component.getDOMNode()).toMatchSnapshot();

    Simulate.keyDown(
      document.getElementById('select-drop__select'), { key: 'Esc', keyCode: 27, which: 27 }
    );

    expect(document.getElementById('select-drop__select')).toBeNull();
    expect(component.getDOMNode()).toMatchSnapshot();
  });
});
