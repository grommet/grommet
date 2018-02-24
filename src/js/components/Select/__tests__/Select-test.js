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
      <Select id='test-select' options={['one', 'two']} />
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    component.simulate('click');

    expect(component.getDOMNode()).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });

  test('mounts with complex options and children', () => {
    const component = mount(
      <Select id='test-select' options={[{ test: 'one' }, { test: 'two' }]}>
        {option => <span>{option.test}</span>}
      </Select>
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    component.simulate('click');

    expect(component.getDOMNode()).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('mounts with search', (done) => {
    const onSearch = jest.fn();
    const component = mount(
      <Select id='test-select' options={['one', 'two']} onSearch={onSearch} />
    );
    component.simulate('click');

    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();

      document.activeElement.value = 'a';

      Simulate.input(document.activeElement);

      // wait for debounce to kick in
      setTimeout(() => {
        expect(onSearch).toBeCalledWith('a');
        expectPortal('test-select__drop').toMatchSnapshot();
        done();
      }, 200);
    }, 100);
  });

  test('closes drop on esc', () => {
    const onClose = jest.fn();
    const component = mount(
      <Select id='test-select' options={['one', 'two']} onClose={onClose} />
    );

    Simulate.keyDown(
      component.getDOMNode(),
      { key: 'Down', keyCode: 40, which: 40 }
    );

    expectPortal('test-select__drop').toMatchSnapshot();
    expect(component.getDOMNode()).toMatchSnapshot();

    Simulate.keyDown(
      document.getElementById('test-select__drop'),
      { key: 'Esc', keyCode: 27, which: 27 }
    );

    expect(onClose).toBeCalled();
    expect(document.getElementById('test-select__drop')).toBeNull();
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('selects an option', () => {
    const onChange = jest.fn();
    const component = mount(
      <Select id='test-select' options={['one', 'two']} onChange={onChange} />
    );

    component.simulate('click');

    // pressing enter here nothing will happen
    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('selects an option with complex options', () => {
    const onChange = jest.fn();
    const component = mount(
      <Select
        id='test-select'
        plain={true}
        value={<span>one</span>}
        options={[{ test: 'one' }, { test: 'two' }]}
        onChange={onChange}
      >
        {option => <span>{option.test}</span>}
      </Select>
    );

    component.simulate('click');

    // pressing enter here nothing will happen
    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('selects an option with enter', () => {
    const onChange = jest.fn();
    const component = mount(
      <Select
        id='test-select'
        options={['one', 'two']}
        onChange={onChange}
      />
    );

    component.simulate('click');

    const preventDefault = jest.fn();
    Simulate.keyDown(
      document.getElementById('test-select__select-drop'),
      { key: 'Down', keyCode: 40, which: 40, preventDefault },
    );
    expect(preventDefault).toBeCalled();
    Simulate.keyDown(
      document.getElementById('test-select__select-drop'),
      { key: 'Enter', keyCode: 13, which: 13, preventDefault },
    );
    expect(preventDefault).toBeCalled();
    expect(onChange).toBeCalled();
  });
});
