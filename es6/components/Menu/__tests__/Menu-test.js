import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { getByText as getByTextDOM } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet, Menu } from '../..';
var customTheme = {
  menu: {
    icons: {
      color: '#F08080'
    }
  }
};
describe('Menu', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      icon: /*#__PURE__*/React.createElement("svg", null),
      label: "Test Menu",
      id: "test-menu",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('custom message', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      label: "Test Menu",
      messages: {
        openMenu: 'Abrir Menu'
      },
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('custom a11yTitle', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      a11yTitle: "My Menu",
      label: "Test Menu",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        container = _render.container,
        getByLabelText = _render.getByLabelText;

    var menuWithLabel = getByLabelText('My Menu');
    expect(menuWithLabel).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  test('justify content', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['start', 'center', 'end', 'between', 'around', 'stretch'].map(function (justifyContent) {
      return /*#__PURE__*/React.createElement(Menu, {
        key: justifyContent,
        label: justifyContent + " Menu",
        messages: {
          openMenu: 'Abrir Menu'
        },
        items: [{
          label: 'Item 1'
        }, {
          label: 'Item 2'
        }],
        justifyContent: justifyContent
      });
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('gap between icon and label', function () {
    window.scrollTo = jest.fn();

    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      open: true,
      label: "actions",
      items: [{
        label: 'Item 1',
        icon: /*#__PURE__*/React.createElement("svg", null),
        gap: 'xlarge'
      }, {
        label: 'Item 2'
      }]
    }))),
        container = _render2.container,
        getByText = _render2.getByText;

    var firstItem = getByText('Item 1');
    expect(firstItem.querySelector('div[class^=StyledBox__StyledBoxGap]')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test('open and close on click', function () {
    window.scrollTo = jest.fn();

    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: function onClick() {}
      }, {
        label: 'Item 3',
        href: '/test'
      }]
    }))),
        getByLabelText = _render3.getByLabelText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();
    fireEvent.click(getByLabelText('Open Menu'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-menu__drop').toMatchSnapshot();
    fireEvent.click(getByLabelText('Close Menu'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });
  test('close by clicking outside', function (done) {
    var _render4 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();
    fireEvent.click(getByText('Test'));
    expectPortal('test-menu__drop').toMatchSnapshot();
    fireEvent(document, new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    }));
    setTimeout(function () {
      expect(document.getElementById('test-menu__drop')).toBeNull();
      done();
    }, 50);
  });
  test('select an item', function () {
    var onClick = jest.fn();

    var _render5 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1',
        onClick: onClick
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Test')); // click in the first menu item

    fireEvent.click(getByTextDOM(document, 'Item 1'));
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('navigate through suggestions and select', function () {
    var onClick = jest.fn();

    var _render6 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: onClick
      }]
    }))),
        getByLabelText = _render6.getByLabelText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot(); // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Enter selects the item

    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32
    });
    fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('tab through menu until it closes', function () {
    var _render7 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByLabelText = _render7.getByLabelText,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot(); // Pressing space opens drop
    // First tab moves to first item
    // Second tab moves to second item
    // Third tab moves beyond last menu item and closes menu

    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Space',
      keyCode: 32,
      which: 32
    });
    fireEvent.keyDown(document.activeElement.firstChild, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    fireEvent.keyDown(document.activeElement, {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on esc', function () {
    var _render8 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByLabelText = _render8.getByLabelText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByLabelText('Close Menu'), {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on tab', function () {
    var _render9 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByLabelText = _render9.getByLabelText,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByLabelText('Open Menu'), {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('with dropAlign renders', function () {
    var _render10 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      dropAlign: {
        top: 'top',
        right: 'right'
      },
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render10.getByText,
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    expectPortal('test-menu__drop').toMatchSnapshot();
  });
  test('disabled', function () {
    var _render11 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      id: "test-menu",
      disabled: true,
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2',
        onClick: function onClick() {}
      }, {
        label: 'Item 3',
        href: '/test'
      }]
    })), {
      attachTo: document.body.firstChild
    }),
        getByText = _render11.getByText,
        container = _render11.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();
    fireEvent.click(getByText('Test'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('reverse icon and label', function () {
    window.scrollTo = jest.fn();

    var _render12 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Menu, {
      open: true,
      label: "Test Menu",
      items: [{
        label: 'Item 1',
        icon: /*#__PURE__*/React.createElement("svg", null),
        reverse: true
      }, {
        label: 'Item 2'
      }]
    }))),
        container = _render12.container,
        getByText = _render12.getByText; // Label should come before icon


    expect(getByText('Item 1').innerHTML).toEqual(expect.stringMatching(/^Item 1/));
    expect(container).toMatchSnapshot();
  });
  test('custom theme icon color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
      theme: customTheme
    }, /*#__PURE__*/React.createElement(Menu, {
      label: "Test Menu",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
});