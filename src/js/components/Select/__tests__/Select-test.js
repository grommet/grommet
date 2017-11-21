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

  test('selects an option', () => {
    const onChange = jest.fn();
    const component = mount(
      <Select id='select' options={['one', 'two']} onChange={onChange} />
    );

    component.simulate('click');

    // pressing enter here nothing will happen
    Simulate.click(
      document.getElementById('select-drop__select').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('selects an option with complex options', () => {
    const onChange = jest.fn();
    const component = mount(
      <Select
        id='select'
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
      document.getElementById('select-drop__select').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('selects an option with enter', () => {
    const onChange = jest.fn();
    const onClose = jest.fn();
    const component = mount(
      <Select id='select' options={['one', 'two']} onChange={onChange} onClose={onClose} />
    );

    component.simulate('click');

    const preventDefault = jest.fn();
    // pressing enter here nothing will happen
    Simulate.keyDown(
      document.getElementById('select-drop__select'),
      { key: 'Enter', keyCode: 13, which: 13, preventDefault },
    );
    Simulate.keyDown(
      document.getElementById('select-drop__select'),
      { key: 'Down', keyCode: 40, which: 40, preventDefault },
    );
    Simulate.keyDown(
      document.getElementById('select-drop__select'),
      { key: 'Down', keyCode: 40, which: 40, preventDefault },
    );
    Simulate.keyDown(
      document.getElementById('select-drop__select'),
      { key: 'Down', keyCode: 38, which: 38, preventDefault },
    );
    Simulate.keyDown(
      document.getElementById('select-drop__select'),
      { key: 'Enter', keyCode: 13, which: 13, preventDefault },
    );
    global.document.dispatchEvent(new Event('click'));
    expect(preventDefault).toBeCalled();
    expect(onChange).toBeCalled();
    expect(onClose).toBeCalled();
    expect(document.getElementById('select-drop__select')).toBeNull();
  });
});
