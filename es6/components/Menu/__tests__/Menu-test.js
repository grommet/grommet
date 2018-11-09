import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { getByText as getByTextDOM } from 'dom-testing-library';
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet, Menu } from '../..';
describe('Menu', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Menu, {
      icon: React.createElement("svg", null),
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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Menu, {
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
  test('open and close on click', function () {
    window.scrollTo = jest.fn();

    var _render = render(React.createElement(Grommet, null, React.createElement(Menu, {
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
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();
    fireEvent.click(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-menu__drop').toMatchSnapshot();
    fireEvent.click(getByText('Test'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
    expect(window.scrollTo).toBeCalled();
  });
  test('close by clicking outside', function (done) {
    var _render2 = render(React.createElement(Grommet, null, React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render2.getByText,
        container = _render2.container;

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

    var _render3 = render(React.createElement(Grommet, null, React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1',
        onClick: onClick
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Test')); // click in the first menu item

    fireEvent.click(getByTextDOM(document, 'Item 1'));
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('navigate through suggestions and select', function () {
    var onClick = jest.fn();

    var _render4 = render(React.createElement(Grommet, null, React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1',
        onClick: onClick
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot(); // pressing down 3x: first opens the drop,
    // second moves to the first suggestion
    // third moves to the last suggestion

    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    }); // moves to the first suggestion

    fireEvent.keyDown(getByText('Test'), {
      key: 'Up',
      keyCode: 38,
      which: 38
    }); // select that by pressing enter

    fireEvent.keyDown(getByText('Test'), {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });
    expect(onClick).toBeCalled();
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on esc', function () {
    var _render5 = render(React.createElement(Grommet, null, React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByText('Test'), {
      key: 'Esc',
      keyCode: 27,
      which: 27
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('close on tab', function () {
    var _render6 = render(React.createElement(Grommet, null, React.createElement(Menu, {
      id: "test-menu",
      label: "Test",
      items: [{
        label: 'Item 1'
      }, {
        label: 'Item 2'
      }]
    }))),
        getByText = _render6.getByText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(getByText('Test'), {
      key: 'Tab',
      keyCode: 9,
      which: 9
    });
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
  test('with dropAlign renders', function () {
    var _render7 = render(React.createElement(Grommet, null, React.createElement(Menu, {
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
        getByText = _render7.getByText,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByText('Test'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    expectPortal('test-menu__drop').toMatchSnapshot();
  });
  test('disabled', function () {
    var _render8 = render(React.createElement(Grommet, null, React.createElement(Menu, {
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
        getByText = _render8.getByText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-menu__drop')).toBeNull();
    fireEvent.click(getByText('Test'));
    expect(document.getElementById('test-menu__drop')).toBeNull();
  });
});