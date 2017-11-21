import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Menu } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('Menu', () => {
  beforeEach(createPortal);

  test('renders', () => {
    const component = mount(
      <Menu icon={<svg />} id='item' items={[{ label: 'Item 1' }, { label: 'Item 2' }]} />, {
        attachTo: document.body.firstChild,
      }
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('menu-drop__item')).toBeNull();
  });

  test('with custom message renders', () => {
    const component = mount(
      <Menu label='Test Icon' messages={{ openMenu: 'Abrir Menu' }} />, {
        attachTo: document.body.firstChild,
      }
    );
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('opens and closes on click', () => {
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    expect(document.getElementById('menu-drop__test')).toBeNull();

    component.find('button').first().simulate('click');

    expectPortal('menu-drop__test').toMatchSnapshot();

    component.find('button').first().simulate('click');

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('closes by clicking outside', () => {
    const component = mount(
      <Menu
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('click');

    global.document.dispatchEvent(new Event('click'));

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('closes by clicking in the button', () => {
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('click');

    document.getElementById('menu-drop__test').querySelector('button').click();

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('selects an item', () => {
    const onClick = jest.fn();
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    // click to open the drop
    component.find('button').simulate('click');

    // click in the first menu item
    document.getElementById('menu-drop__test').querySelectorAll('button')[1].click();

    expect(onClick).toBeCalled();
    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('Menu navigates through next and previous suggestions and selects first', () => {
    const onClick = jest.fn();
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    // pressing down 3x: first opens the drop,
    // second moves to the first suggestion, thrid moves to the last suggestion
    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });

    // moves to the first suggestion
    component.find('button').first().simulate('keyDown', { key: 'Up', keyCode: 38, which: 38 });

    // select that by pressing enter
    component.find('button').first().simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });

    expect(onClick).toBeCalled();
    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('closes on enter', () => {
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('closes on esc', () => {
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    component.find('button').first().simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('closes on tab', () => {
    const component = mount(
      <Menu
        id='test'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
    component.find('button').first().simulate('keyDown', { key: 'Tab', keyCode: 9, which: 9 });

    expect(document.getElementById('menu-drop__test')).toBeNull();
  });

  test('with dropAlign renders', () => {
    const component = mount(
      <Menu
        id='menu'
        dropAlign={{ top: 'top', right: 'right' }}
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    component.find('button').first().simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });

    expectPortal('menu').toMatchSnapshot();
  });
});
