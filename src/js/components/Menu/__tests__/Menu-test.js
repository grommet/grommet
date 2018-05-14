import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, renderIntoDocument, Simulate } from 'react-testing-library';
import { getByText as getByTextDOM } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Menu } from '../';

describe('Menu', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Menu
        icon={<svg />}
        label='Test Menu'
        id='test-menu'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('custom message', () => {
    const component = renderer.create(
      <Menu
        label='Test Menu'
        messages={{ openMenu: 'Abrir Menu' }}
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('open and close on click', () => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2', onClick: () => {} },
          { label: 'Item 3', href: '/test' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    Simulate.click(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-menu__drop').toMatchSnapshot();

    Simulate.click(getByText('Test'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('close by clicking outside', (done) => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    Simulate.click(getByText('Test'));
    expectPortal('test-menu__drop').toMatchSnapshot();

    fireEvent(document, new MouseEvent('click', { bubbles: true, cancelable: true }));
    setTimeout(() => {
      expect(document.getElementById('test-menu__drop')).toBeNull();
      done();
    }, 50);
  });

  test('select an item', () => {
    const onClick = jest.fn();
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Test'));

    // click in the first menu item
    Simulate.click(getByTextDOM(document, 'Item 1'));
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('navigate through suggestions and select', () => {
    const onClick = jest.fn();
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1', onClick },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    // pressing down 3x: first opens the drop,
    // second moves to the first suggestion
    // third moves to the last suggestion
    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });
    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });
    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });

    // moves to the first suggestion
    Simulate.keyDown(getByText('Test'), { key: 'Up', keyCode: 38, which: 38 });

    // select that by pressing enter
    Simulate.keyDown(getByText('Test'), { key: 'Enter', keyCode: 13, which: 13 });

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('close on esc', () => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });
    Simulate.keyDown(getByText('Test'), { key: 'Esc', keyCode: 27, which: 27 });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('close on tab', () => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });
    Simulate.keyDown(getByText('Test'), { key: 'Tab', keyCode: 9, which: 9 });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('with dropAlign renders', () => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        dropAlign={{ top: 'top', right: 'right' }}
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2' },
        ]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.keyDown(getByText('Test'), { key: 'Down', keyCode: 40, which: 40 });

    expectPortal('test-menu__drop').toMatchSnapshot();
  });

  test('disabled', () => {
    const { getByText, container } = renderIntoDocument(
      <Menu
        id='test-menu'
        disabled={true}
        label='Test'
        items={[
          { label: 'Item 1' },
          { label: 'Item 2', onClick: () => {} },
          { label: 'Item 3', href: '/test' },
        ]}
      />, {
        attachTo: document.body.firstChild,
      }
    );
    expect(container.firstChild).toMatchSnapshot();

    expect(document.getElementById('test-menu__drop')).toBeNull();

    Simulate.click(getByText('Test'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
});
