import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { getByText as getByTextDOM } from '@testing-library/dom';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Menu } from '../..';

describe('Menu', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <Menu
          icon={<svg />}
          label="Test Menu"
          id="test-menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('custom message', () => {
    const component = renderer.create(
      <Grommet>
        <Menu
          label="Test Menu"
          messages={{ openMenu: 'Abrir Menu' }}
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('justify content', () => {
    const component = renderer.create(
      <Grommet>
        {['start', 'center', 'end', 'between', 'around', 'stretch'].map(
          justifyContent => (
            <Menu
              key={justifyContent}
              label={`${justifyContent} Menu`}
              messages={{ openMenu: 'Abrir Menu' }}
              items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
              justifyContent={justifyContent}
            />
          ),
        )}
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('open and close on click', () => {
    window.scrollTo = jest.fn();
    const { getByLabelText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[
            { label: 'Item 1' },
            { label: 'Item 2', onClick: () => {} },
            { label: 'Item 3', href: '/test' },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    fireEvent.click(getByLabelText('Open Menu'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-menu__drop').toMatchSnapshot();

    fireEvent.click(getByLabelText('Close Menu'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });

  test('close by clicking outside', done => {
    const { getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();

    fireEvent.click(getByText('Test'));
    expectPortal('test-menu__drop').toMatchSnapshot();

    fireEvent(
      document,
      new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
    );
    setTimeout(() => {
      expect(document.getElementById('test-menu__drop')).toBeNull();
      done();
    }, 50);
  });

  test('select an item', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1', onClick }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Test'));

    // click in the first menu item
    fireEvent.click(getByTextDOM(document, 'Item 1'));
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('navigate through suggestions and select', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1', onClick }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // pressing down 3x: first opens the drop,
    // second moves to the first suggestion
    // third moves to the last suggestion
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });

    // moves to the first suggestion
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });

    // select that by pressing enter
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('close on esc', () => {
    const { getByLabelText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(getByLabelText('Close Menu'), {
      key: 'Esc',
      keyCode: 27,
      which: 27,
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('close on tab', () => {
    const { getByLabelText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('with dropAlign renders', () => {
    const { getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          dropAlign={{ top: 'top', right: 'right' }}
          label="Test"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });

    expectPortal('test-menu__drop').toMatchSnapshot();
  });

  test('disabled', () => {
    const { getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          disabled
          label="Test"
          items={[
            { label: 'Item 1' },
            { label: 'Item 2', onClick: () => {} },
            { label: 'Item 3', href: '/test' },
          ]}
        />
      </Grommet>,
      {
        attachTo: document.body.firstChild,
      },
    );
    expect(container.firstChild).toMatchSnapshot();

    expect(document.getElementById('test-menu__drop')).toBeNull();

    fireEvent.click(getByText('Test'));

    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
});
