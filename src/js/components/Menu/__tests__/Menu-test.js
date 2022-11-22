import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { getByText as getByTextDOM } from '@testing-library/dom';
import { axe } from 'jest-axe';

import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet, Menu } from '../..';

const customTheme = {
  menu: {
    drop: {
      align: {
        top: 'bottom',
        left: 'right',
      },
      elevation: 'xlarge',
    },
    icons: {
      color: '#F08080',
    },
  },
};

const defaultButtonTheme = {
  button: {
    default: {
      color: 'text-strong',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '6px',
      },
    },
  },
};

describe('Menu', () => {
  beforeEach(createPortal);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Menu />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Menu
          icon={<svg />}
          label="Test Menu"
          id="test-menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom message', () => {
    const { container } = render(
      <Grommet>
        <Menu
          label="Test Menu"
          messages={{ openMenu: 'Abrir Menu' }}
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom a11yTitle or aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <Menu
          a11yTitle="My Menu"
          label="Test Menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
        <Menu
          aria-label="My Menu 2"
          label="Test Menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );

    expect(getByLabelText('My Menu')).toBeTruthy();
    expect(getByLabelText('My Menu 2')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  test('justify content', () => {
    const { container } = render(
      <Grommet>
        {['start', 'center', 'end', 'between', 'around', 'stretch'].map(
          (justifyContent) => (
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('gap between icon and label', () => {
    window.scrollTo = jest.fn();
    const { container } = render(
      <Grommet>
        <Menu
          open
          label="actions"
          items={[
            { label: 'Item 1', icon: <svg />, gap: 'xlarge' },
            { label: 'Item 2' },
          ]}
        />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
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

  test('close by clicking outside', (done) => {
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
          items={[{ label: 'Item 1' }, { label: 'Item 2', onClick }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Enter selects the item
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });
    fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('tab through menu until it closes', () => {
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

    // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Third tab moves beyond last menu item and closes menu
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });
    fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('shift + tab through menu until it closes', () => {
    const { getByLabelText, getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Next 3 Tabs + Shifts go back through menu in reverse order and close it
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32,
    });

    fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    expect(getByText('Item 1').parentElement).toHaveFocus();

    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
    });
    expect(getByText('Item 2').parentElement).toHaveFocus();

    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
      shiftKey: true,
    });
    expect(getByText('Item 1').parentElement).toHaveFocus();

    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
      shiftKey: true,
    });
    expect(getByLabelText('Close Menu')).toHaveFocus();

    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9,
      shiftKey: true,
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });

  test('open on down close on esc', () => {
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

  test('open on up close on esc', () => {
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

    // Pressing up opens the menu
    // Pressing escape closes it
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });
    expectPortal('test-menu__drop').toMatchSnapshot();

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

  test('with dropAlign top renders', () => {
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

  test('with dropAlign bottom renders', () => {
    const { getByText, container } = render(
      <Grommet>
        <Menu
          id="test-menu"
          dropAlign={{ bottom: 'bottom', left: 'left' }}
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

  test('reverse icon and label', () => {
    window.scrollTo = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Menu
          open
          label="Test Menu"
          items={[
            { label: 'Item 1', icon: <svg />, reverse: true },
            { label: 'Item 2' },
          ]}
        />
      </Grommet>,
    );

    // Label should come before icon
    expect(getByText('Item 1').innerHTML).toEqual(
      expect.stringMatching(/^Item 1/),
    );
    expect(container).toMatchSnapshot();
  });

  test('custom theme icon color', () => {
    const { container } = render(
      <Grommet theme={customTheme}>
        <Menu
          label="Test Menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme with default button', () => {
    const { container } = render(
      <Grommet theme={defaultButtonTheme}>
        <Menu
          label="Test Menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('menu with children when custom theme has default button', () => {
    const { container } = render(
      <Grommet theme={defaultButtonTheme}>
        <Menu items={[{ label: 'Item 1' }, { label: 'Item 2' }]}>
          {() => <>Test Menu</>}
        </Menu>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply themed drop props', () => {
    const { container } = render(
      <Grommet theme={customTheme}>
        <Menu
          label="Test Menu"
          items={[{ label: 'Item 1' }, { label: 'Item 2' }]}
          open
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should group items', async () => {
    window.scrollTo = jest.fn();
    render(
      <Grommet>
        <Menu
          id="test-menu"
          label="Test Menu"
          items={[
            [{ label: 'Item 1' }, { label: 'Item 2' }],
            [{ label: 'Item 3' }],
          ]}
        />
      </Grommet>,
    );
    fireEvent.keyDown(screen.getByText('Test Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });

    expectPortal('test-menu__drop').toMatchSnapshot();
  });
});
