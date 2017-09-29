import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { Menu } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('Menu renders', () => {
  const component = renderer.create(
    <Grommet>
      <Menu items={[]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Menu with label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Menu label='Test' items={[{ label: 'Item 1' }, { label: 'Item 2' }]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Menu with icon renders', () => {
  const component = renderer.create(
    <Grommet>
      <Menu label='Test Icon' icon={<svg />} items={[{ label: 'Item 1' }, { label: 'Item 2' }]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Menu with custom message renders', () => {
  const component = renderer.create(
    <Grommet>
      <Menu label='Test Icon' messages={{ openMenu: 'Abrir Menu' }} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Menu opens and closes on click', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  expect(document.getElementById('item-1')).toBeNull();

  component.find('button').simulate('click');

  expect(document.getElementById('item-1').parentNode).toMatchSnapshot();

  component.find('button').simulate('click');

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu opens and closes on click', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  expect(document.getElementById('item-1')).toBeNull();

  component.find('button').simulate('click');

  expect(document.getElementById('item-1').parentNode).toMatchSnapshot();

  component.find('button').simulate('click');

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu closes by clicking outside', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('click');

  global.document.dispatchEvent(new Event('click'));

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu closes by clicking in the button', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('click');

  document.getElementById('item-1').parentNode.querySelector('button').click();

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu selects an item', () => {
  const onClick = jest.fn();
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('click');

  document.getElementById('item-1').click();

  expect(onClick).toBeCalled();
  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu navigates through next and previous suggestions and selects first', () => {
  const onClick = jest.fn();
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  // pressing down 3x: first opens the drop, 
  // second moves to the first suggestion, thrid moves to the last suggestion
  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });

  // moves to the first suggestion
  component.find('button').simulate('keyDown', { key: 'Up', keyCode: 38, which: 38 });

  // select that by pressing enter
  component.find('button').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });

  expect(onClick).toBeCalled();
  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu closes on enter', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu closes on esc', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
  component.find('button').simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 });

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu closes on tab', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });
  component.find('button').simulate('keyDown', { key: 'Tab', keyCode: 9, which: 9 });

  expect(document.getElementById('item-1')).toBeNull();
});

test('Menu with dropAlign renders', () => {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
  const component = mount(
    <Grommet>
      <Menu
        dropAlign={{ top: 'top', right: 'right' }}
        label='Test'
        items={[
          { id: 'item-1', label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    </Grommet>, {
      attachTo: document.body.firstChild,
    }
  );

  component.find('button').simulate('keyDown', { key: 'Down', keyCode: 40, which: 40 });

  expect(document.getElementById('item-1').parentNode).toMatchSnapshot();
});
