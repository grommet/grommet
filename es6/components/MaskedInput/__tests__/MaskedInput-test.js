import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { getByText } from '@testing-library/dom';
import { Grommet } from '../../Grommet';
import { Keyboard } from '../../Keyboard';
import { createPortal, expectPortal } from '../../../utils/portal';
import { MaskedInput } from '..';
describe('MaskedInput', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var _render = render(React.createElement(MaskedInput, {
      name: "item"
    })),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('mask', function (done) {
    var onChange = jest.fn();
    var onFocus = jest.fn();

    var _render2 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }, {
        length: 1,
        regexp: /^[ab]$/
      }],
      value: "bb!ax",
      onChange: onChange,
      onFocus: onFocus
    })),
        getByTestId = _render2.getByTestId,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
    setTimeout(function () {
      expectPortal('masked-input-drop__item').toMatchSnapshot();
      expect(onChange).not.toBeCalled();
      expect(onFocus).toBeCalled();
      done();
    }, 300);
  });
  test('option via mouse', function (done) {
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render3 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      plain: true,
      size: "large",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    })),
        getByTestId = _render3.getByTestId,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));
    setTimeout(function () {
      expectPortal('masked-input-drop__item').toMatchSnapshot();
      fireEvent.click(getByText(document, 'aa'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 500);
  });
  test('option via keyboard', function (done) {
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render4 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    })),
        getByTestId = _render4.getByTestId,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');
    fireEvent.focus(input);
    setTimeout(function () {
      // pressing enter here nothing will happen
      fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter

      fireEvent.keyDown(input, {
        keyCode: 40
      }); // down

      fireEvent.keyDown(input, {
        keyCode: 40
      }); // down

      fireEvent.keyDown(input, {
        keyCode: 38
      }); // up

      fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 300);
  });
  test('Escape events should propagage if there is no drop', function (done) {
    var callback = jest.fn();

    var _render5 = render(React.createElement(Grommet, null, React.createElement(Keyboard, {
      onEsc: callback
    }, React.createElement(MaskedInput, {
      "data-testid": "test-masked-input",
      id: "item",
      name: "item"
    })))),
        getByTestId = _render5.getByTestId;

    fireEvent.change(getByTestId('test-masked-input'), {
      target: {
        value: ' '
      }
    });
    setTimeout(function () {
      fireEvent.keyDown(getByTestId('test-masked-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27
      });
      expect(callback).toBeCalled();
      done();
    }, 50);
  });
  test('next and previous without options', function (done) {
    var onChange = jest.fn();

    var _render6 = render(React.createElement(MaskedInput, {
      "data-testid": "test-input",
      id: "item",
      name: "item",
      value: "",
      mask: [{
        length: [1, 2],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      onChange: onChange
    })),
        getByTestId = _render6.getByTestId,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-input');
    fireEvent.focus(input);
    setTimeout(function () {
      fireEvent.keyDown(input, {
        keyCode: 40
      });
      fireEvent.keyDown(input, {
        keyCode: 40
      });
      fireEvent.keyDown(input, {
        keyCode: 38
      });
      fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter

      expect(onChange).not.toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 300);
  });
  test('event target props are available option via mouse', function (done) {
    var onChangeMock = jest.fn(function (event) {
      var _event$target = event.target,
          value = _event$target.value,
          id = _event$target.id,
          name = _event$target.name;
      return {
        target: {
          id: id,
          value: value,
          name: name
        }
      };
    });

    var _render7 = render(React.createElement(MaskedInput, {
      "data-testid": "test-event-target-select-by-mouse",
      plain: true,
      size: "large",
      id: "input-id",
      name: "input-name",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChangeMock
    })),
        getByTestId = _render7.getByTestId,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-event-target-select-by-mouse'));
    setTimeout(function () {
      expectPortal('masked-input-drop__input-id').toMatchSnapshot();
      fireEvent.click(getByText(document, 'aa'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
        target: expect.objectContaining({
          id: 'input-id',
          name: 'input-name',
          value: 'aa!'
        })
      }));
      done();
    }, 500);
  });
  test('event target props are available option via keyboard', function (done) {
    var onChangeMock = jest.fn(function (event) {
      var _event$target2 = event.target,
          value = _event$target2.value,
          id = _event$target2.id,
          name = _event$target2.name;
      return {
        target: {
          id: id,
          value: value,
          name: name
        }
      };
    });

    var _render8 = render(React.createElement(MaskedInput, {
      "data-testid": "test-event-target-select-by-keyboard",
      id: "input-id",
      name: "input-name",
      size: "medium",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChangeMock
    })),
        getByTestId = _render8.getByTestId,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    var input = getByTestId('test-event-target-select-by-keyboard');
    fireEvent.focus(input);
    setTimeout(function () {
      // pressing enter here nothing will happen
      fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter

      expect(onChangeMock).not.toBeCalled();
      fireEvent.keyDown(input, {
        keyCode: 40
      }); // down

      fireEvent.keyDown(input, {
        keyCode: 40
      }); // down

      fireEvent.keyDown(input, {
        keyCode: 38
      }); // up

      fireEvent.keyDown(input, {
        keyCode: 13
      }); // enter

      expect(onChangeMock).toBeCalled();
      expect(onChangeMock).toBeCalledTimes(1);
      expect(onChangeMock).toHaveReturnedWith(expect.objectContaining({
        target: expect.objectContaining({
          id: 'input-id',
          name: 'input-name',
          value: 'aa!'
        })
      }));
      done();
    }, 300);
  });
  test('applies custom global.hover theme to options', function (done) {
    var customTheme = {
      global: {
        hover: {
          background: {
            color: 'lightgreen'
          },
          color: {
            dark: 'lightgrey',
            light: 'brand'
          }
        }
      }
    };
    var onChange = jest.fn(function (event) {
      return event.target.value;
    });

    var _render9 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(MaskedInput, {
      "data-testid": "test-global-hover-theme",
      plain: true,
      size: "large",
      id: "global-hover-theme",
      name: "global-hover-theme",
      mask: [{
        length: [1, 2],
        options: ['aa', 'bb', 'cc'],
        regexp: /^[ab][ab]$|^[ab]$/
      }, {
        fixed: '!'
      }],
      value: "",
      onChange: onChange
    }))),
        getByTestId = _render9.getByTestId,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-global-hover-theme'));
    setTimeout(function () {
      var optionButton = getByText(document, 'bb').closest('button');
      fireEvent.mouseOver(optionButton);
      expect(optionButton).toMatchSnapshot();
      done();
    }, 500);
  });
});