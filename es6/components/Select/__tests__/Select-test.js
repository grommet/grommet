import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { CaretDown } from "grommet-icons/es6/icons/CaretDown";
import { CaretUp } from "grommet-icons/es6/icons/CaretUp";
import { FormDown } from "grommet-icons/es6/icons/FormDown";
import { createPortal, expectPortal } from '../../../utils/portal';
import { Grommet } from '../..';
import { Select } from '..';
describe('Select', function () {
  beforeEach(createPortal);
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      options: ['one', 'two']
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('0 value', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: [0, 1],
      value: 0
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('opens', function (done) {
    window.scrollTo = jest.fn();

    var _render = render(React.createElement(Select, {
      placeholder: "test select",
      id: "test-select",
      options: ['one', 'two']
    })),
        getByPlaceholderText = _render.getByPlaceholderText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
    setTimeout(function () {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });
  test('complex options and children', function () {
    var _render2 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: [{
        test: 'one'
      }, {
        test: 'two'
      }]
    }, function (option) {
      return React.createElement("span", null, option.test);
    })),
        getByPlaceholderText = _render2.getByPlaceholderText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });
  test('search', function () {
    jest.useFakeTimers();
    var onSearch = jest.fn();

    var _render3 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onSearch: onSearch
    })),
        getByPlaceholderText = _render3.getByPlaceholderText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    setTimeout(function () {
      jest.runAllTimers();
      expect(document.activeElement).toMatchSnapshot();
      document.activeElement.value = 'a';
      fireEvent.input(document.activeElement);
      expect(onSearch).toBeCalledWith('a');
    }, 200);
  });
  test('select an option', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render4 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onChange: onChange
    })),
        getByPlaceholderText = _render4.getByPlaceholderText,
        container = _render4.container;

    var select = getByPlaceholderText('test select');
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select')); // pressing enter here nothing will happen

    fireEvent.click(document.getElementById('test-select__drop').querySelector('button')); // checks if select has a value assigned to it after option is selected

    expect(select.value).toEqual('one');
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: 'one'
    }));
    expect(window.scrollTo).toBeCalled();
  });
  test('select an option with complex options', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render5 = render(React.createElement(Select, {
      id: "test-select",
      plain: true,
      value: React.createElement("span", null, "one"),
      options: [{
        test: 'one'
      }, {
        test: 'two'
      }],
      onChange: onChange
    }, function (option) {
      return React.createElement("span", null, option.test);
    })),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('one')); // pressing enter here nothing will happen

    fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: {
        test: 'one'
      }
    }));
    expect(window.scrollTo).toBeCalled();
  });
  test('select an option with enter', function () {
    window.scrollTo = jest.fn();
    var onChange = jest.fn();

    var _render6 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two'],
      onChange: onChange
    })),
        getByPlaceholderText = _render6.getByPlaceholderText,
        container = _render6.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: 'one'
    }));
    expect(window.scrollTo).toBeCalled();
  });
  test('size', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      size: "large",
      options: ['one', 'two'],
      selected: [],
      value: [],
      onChange: function onChange() {}
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('multiple', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      multiple: true,
      options: ['one', 'two'],
      selected: [],
      value: []
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('multiple values', function () {
    var _render7 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      selected: [0, 1],
      value: ['one', 'two']
    })),
        getByPlaceholderText = _render7.getByPlaceholderText,
        container = _render7.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });
  test('select another option', function () {
    var onChange = jest.fn();

    var _render8 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      onChange: onChange,
      value: ['two'],
      selected: [1]
    })),
        getByPlaceholderText = _render8.getByPlaceholderText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: ['two', 'one']
    }));
  });
  test('deselect an option', function () {
    var onChange = jest.fn();

    var _render9 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      multiple: true,
      options: ['one', 'two'],
      onChange: onChange,
      value: ['one'],
      selected: [0]
    })),
        getByPlaceholderText = _render9.getByPlaceholderText,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    fireEvent.click(document.getElementById('test-select__drop').querySelector('button'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: []
    }));
  });
  test('disabled', function () {
    var _render10 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      disabled: true,
      options: ['one', 'two']
    })),
        getByPlaceholderText = _render10.getByPlaceholderText,
        container = _render10.container;

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
  });
  ['small', 'medium', 'large'].forEach(function (dropHeight) {
    test(dropHeight + " drop container height", function () {
      var _render11 = render(React.createElement(Select, {
        id: "test-select",
        size: "large",
        options: ['one', 'two'],
        selected: [],
        value: [],
        onChange: function onChange() {},
        dropHeight: dropHeight,
        placeholder: "test select"
      })),
          getByPlaceholderText = _render11.getByPlaceholderText;

      fireEvent.click(getByPlaceholderText('test select'));
      expect(document.activeElement).toMatchSnapshot();
    });
  });
  test('empty results search', function () {
    var _render12 = render(React.createElement(Select, {
      id: "test-select",
      placeholder: "test select",
      options: [],
      onSearch: function onSearch() {},
      emptySearchMessage: "no results"
    })),
        getByPlaceholderText = _render12.getByPlaceholderText;

    fireEvent.click(getByPlaceholderText('test select'));
    document.activeElement.value = 'a';
    fireEvent.input(document.activeElement);
    expect(document.activeElement).toMatchSnapshot();
  });
  test('open default state', function () {
    render(React.createElement(Select, {
      open: true,
      id: "test-select",
      placeholder: "test select",
      options: ['one', 'two']
    }));
    expect(document.getElementById('test-select__drop')).not.toBeNull();
  });
  test('renders without icon', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      options: ['one', 'two'],
      icon: false
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('renders custom icon', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      options: ['one', 'two'],
      icon: CaretDown
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('renders default icon', function () {
    var component = renderer.create(React.createElement(Select, {
      id: "test-select",
      options: ['one', 'two'],
      icon: true
    }));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('modifies select control style on open', function () {
    var customTheme = {
      select: {
        control: {
          extend: {
            background: 'purple'
          },
          open: {
            background: 'lightgrey'
          }
        },
        container: {}
      }
    };

    var _render13 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      "data-testid": "test-select-style-open",
      id: "test-open-id",
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        container = _render13.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = container.querySelector('Button');
    var style;
    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('purple');
    fireEvent.click(selectButton);
    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('lightgrey');
    fireEvent.click(selectButton);
    style = window.getComputedStyle(selectButton);
    expect(style.background).toBe('purple');
  });
  test("renders styled select options backwards compatible with legacy\n    documentation (select.options.box)", function () {
    var customTheme = {
      select: {
        options: {
          box: {
            background: 'lightblue'
          }
        }
      }
    };

    var _render14 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      "data-testid": "test-select-style-options-1",
      id: "test-options-style-id",
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        getByPlaceholderText = _render14.getByPlaceholderText,
        getByText = _render14.getByText,
        container = _render14.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);
    var optionButton = getByText('morning').closest('button');
    var style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightblue');
  });
  test('renders styled select options using select.options.container', function () {
    var customTheme = {
      select: {
        options: {
          container: {
            background: 'lightgreen'
          }
        }
      }
    };

    var _render15 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      "data-testid": "test-select-style-options-2",
      id: "test-options-style-id",
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        getByPlaceholderText = _render15.getByPlaceholderText,
        getByText = _render15.getByText,
        container = _render15.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);
    var optionButton = getByText('morning').closest('button');
    var style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightgreen');
  });
  test("renders styled select options combining select.options.box && \n  select.options.container; \n  select.options.container prioritized if conflict", function () {
    var customTheme = {
      select: {
        options: {
          container: {
            background: 'lightgreen'
          },
          box: {
            background: 'lightblue',
            border: {
              side: 'bottom',
              size: 'small',
              color: 'blue'
            }
          }
        }
      }
    };

    var _render16 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      "data-testid": "test-select-style-options-3",
      id: "test-options-style-id",
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        getByPlaceholderText = _render16.getByPlaceholderText,
        getByText = _render16.getByText,
        container = _render16.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);
    var style;
    var optionButton = getByText('morning').closest('button');
    style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).not.toBe('lightblue');
    style = window.getComputedStyle(optionButton.firstChild);
    expect(style.background).toBe('lightgreen');
    expect(style.borderBottom).toBe('2px solid blue');
  });
  test('applies custom global.hover theme to options', function () {
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

    var _render17 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      "data-testid": "applies-custom-hover-style",
      id: "applies-custom-hover-style-id",
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        getByPlaceholderText = _render17.getByPlaceholderText,
        getByText = _render17.getByText,
        container = _render17.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton);
    var optionButton = getByText('afternoon').closest('button');
    fireEvent.mouseOver(optionButton);
    expect(optionButton).toMatchSnapshot();
  });
  test('renders custom up and down icons', function () {
    var customTheme = {
      select: {
        icons: {
          down: FormDown,
          up: CaretUp
        }
      }
    };

    var _render18 = render(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Select, {
      options: ['morning', 'afternoon', 'evening'],
      placeholder: "Select..."
    }))),
        getByPlaceholderText = _render18.getByPlaceholderText,
        container = _render18.container;

    expect(container.firstChild).toMatchSnapshot();
    var selectButton = getByPlaceholderText('Select...');
    fireEvent.click(selectButton); // Check that custom up icon is applied when open

    expect(container.firstChild).toMatchSnapshot();
  });
  test('onChange without valueKey', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState = React.useState(),
          value = _React$useState[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        value: value,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render19 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render19.getByPlaceholderText,
        getByText = _render19.getByText,
        container = _render19.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: {
        id: 1,
        name: 'Value1'
      }
    }));
  });
  test('multiple onChange without valueKey', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState2 = React.useState(),
          value = _React$useState2[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        value: value,
        multiple: true,
        closeOnChange: false,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render20 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render20.getByPlaceholderText,
        getByText = _render20.getByText,
        container = _render20.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: [{
        id: 1,
        name: 'Value1'
      }]
    }));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value2'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: [{
        id: 1,
        name: 'Value1'
      }, {
        id: 2,
        name: 'Value2'
      }]
    }));
  });
  test('onChange with valueKey string', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState3 = React.useState(),
          value = _React$useState3[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        valueKey: "id",
        value: value,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render21 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render21.getByPlaceholderText,
        getByText = _render21.getByText,
        container = _render21.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: {
        id: 1,
        name: 'Value1'
      }
    }));
  });
  test('multiple onChange with valueKey string', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState4 = React.useState([]),
          value = _React$useState4[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        valueKey: "id",
        value: value,
        multiple: true,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render22 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render22.getByPlaceholderText,
        getByText = _render22.getByText,
        container = _render22.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: [{
        id: 1,
        name: 'Value1'
      }]
    }));
  });
  test('multiple onChange with valueKey reduce', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState5 = React.useState(),
          value = _React$useState5[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        valueKey: {
          key: 'id',
          reduce: true
        },
        value: value,
        multiple: true,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render23 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render23.getByPlaceholderText,
        getByText = _render23.getByText,
        container = _render23.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: [1]
    }));
  });
  test('multiple onChange toggle with valueKey reduce', function () {
    var onChange = jest.fn();

    var Test = function Test() {
      var _React$useState6 = React.useState([1]),
          value = _React$useState6[0];

      return React.createElement(Select, {
        id: "test-select",
        placeholder: "test select",
        labelKey: "name",
        valueKey: {
          key: 'id',
          reduce: true
        },
        value: value,
        multiple: true,
        options: [{
          id: 1,
          name: 'Value1'
        }, {
          id: 2,
          name: 'Value2'
        }],
        onChange: onChange
      });
    };

    var _render24 = render(React.createElement(Grommet, null, React.createElement(Test, null))),
        getByPlaceholderText = _render24.getByPlaceholderText,
        getByText = _render24.getByText,
        container = _render24.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    expectPortal('test-select__drop').toMatchSnapshot();
    fireEvent.click(getByText('Value1'));
    expect(onChange).toBeCalledWith(expect.objectContaining({
      value: []
    }));
  });
});