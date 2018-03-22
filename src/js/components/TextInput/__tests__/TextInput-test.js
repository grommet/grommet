import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('TextInput', () => {
  beforeEach(createPortal);

  test('mounts', () => {
    const component = mount(
      <TextInput name='item' />
    );
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('mounts with suggestions', () => {
    const onInput = jest.fn();
    const onFocus = jest.fn();
    const component = mount(
      <TextInput
        id='item'
        name='item'
        suggestions={['test', 'test1']}
        onInput={onInput}
        onFocus={onFocus}
      />
    );
    const input = component.find('input').first();
    input.simulate('input');
    input.simulate('focus');
    expectPortal('text-input-drop__item').toMatchSnapshot();
    expect(onInput).toBeCalled();
    expect(onFocus).toBeCalled();

    global.document.dispatchEvent(new Event('click'));

    expect(document.getElementById('text-input-drop__item')).toBeNull();
  });

  test('mounts with complex suggestions', () => {
    const component = mount(
      <Grommet>
        <TextInput
          id='item'
          name='item'
          suggestions={[
            { label: 'test', value: 'test' },
            { value: 'test1' },
          ]}
        />
      </Grommet>
    );
    const input = component.find('input').first();
    input.simulate('input');
    expectPortal('text-input-drop__item').toMatchSnapshot();

    global.document.dispatchEvent(new Event('click'));

    expect(document.getElementById('text-input-drop__item')).toBeNull();
  });

  test('closes suggestion drop', () => {
    const component = mount(
      <Grommet>
        <TextInput
          id='item'
          name='item'
          suggestions={['test', 'test1']}
        />
      </Grommet>
    );

    const input = component.find('input').first();
    input.simulate('input');

    expectPortal('text-input-drop__item').toMatchSnapshot();

    input.simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });

    expect(document.getElementById('text-input-drop__item')).toBeNull();
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('selects suggestion', () => {
    const onSelect = jest.fn();
    const component = mount(
      <Grommet>
        <TextInput
          plain={true}
          size='large'
          id='item'
          name='item'
          suggestions={['test', 'test1']}
          onSelect={onSelect}
        />
      </Grommet>
    );

    const input = component.find('input').first();
    input.simulate('input');

    expectPortal('text-input-drop__item').toMatchSnapshot();

    document.getElementById('text-input-drop__item').querySelector('button').click();

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('text-input-drop__item')).toBeNull();
    expect(onSelect).toBeCalled();
  });

  test('handles next and previous suggestions', () => {
    const component = mount(
      <Grommet>
        <TextInput
          id='item'
          name='item'
          suggestions={['test', { value: 'test1' }]}
        />
      </Grommet>
    );

    const input = component.find('input').first();
    const preventDefault = jest.fn();
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 38,
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
  });

  test('selects a suggestion', () => {
    const onSelect = jest.fn();
    const component = mount(
      <Grommet>
        <TextInput
          id='item'
          name='item'
          suggestions={['test', { value: 'test1' }]}
          onSelect={onSelect}
        />
      </Grommet>
    );

    const input = component.find('input').first();
    const preventDefault = jest.fn();
    // pressing enter here nothing will happen
    input.simulate('keyDown', {
      keyCode: 13,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 13,
      preventDefault,
    });
    expect(preventDefault).toBeCalled();
    expect(onSelect).toBeCalled();
  });

  test('handles next and previous without suggestion', () => {
    const component = mount(
      <Grommet>
        <TextInput
          id='item'
          name='item'
        />
      </Grommet>
    );
    const input = component.find('input').first();
    const preventDefault = jest.fn();
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 40,
      preventDefault,
    });
    input.simulate('keyDown', {
      keyCode: 38,
      preventDefault,
    });
    expect(preventDefault).not.toBeCalled();
    expect(component.getDOMNode()).toMatchSnapshot();
  });
});
