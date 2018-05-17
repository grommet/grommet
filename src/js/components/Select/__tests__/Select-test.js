import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, renderIntoDocument, Simulate } from 'react-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Select } from '../';

describe('Select', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Select id='test-select' options={['one', 'two']} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('opens', (done) => {
    window.scrollTo = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select data-testid='test-select' id='test-select' options={['one', 'two']} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    Simulate.click(getByTestId('test-select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });

  test('complex options and children', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        options={[{ test: 'one' }, { test: 'two' }]}
      >
        {option => <span>{option.test}</span>}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    Simulate.click(getByTestId('test-select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('search', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        options={['one', 'two']}
        onSearch={onSearch}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      jest.runAllTimers();

      expect(document.activeElement).toMatchSnapshot();

      document.activeElement.value = 'a';
      Simulate.input(document.activeElement);

      expect(onSearch).toBeCalledWith('a');
    }, 200);
  });

  // NOTE: This isn't really a test for Select
  // test('closes drop on esc', () => {
  //   const onClose = jest.fn();
  //   const component = mount(
  //     <Select id='test-select' options={['one', 'two']} onClose={onClose} />
  //   );
  //
  //   Simulate.keyDown(
  //     component.getDOMNode(),
  //     { key: 'Down', keyCode: 40, which: 40 }
  //   );
  //
  //   expectPortal('test-select__drop').toMatchSnapshot();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  //
  //   Simulate.keyDown(
  //     document.getElementById('test-select__drop'),
  //     { key: 'Esc', keyCode: 27, which: 27 }
  //   );
  //
  //   expect(onClose).toBeCalled();
  //   expect(document.getElementById('test-select__drop')).toBeNull();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  // });

  test('select an option', () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        options={['one', 'two']}
        onChange={onChange}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    // pressing enter here nothing will happen
    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with complex options', () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        plain={true}
        value={<span>one</span>}
        options={[{ test: 'one' }, { test: 'two' }]}
        onChange={onChange}
      >
        {option => <span>{option.test}</span>}
      </Select>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    // pressing enter here nothing will happen
    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with enter', () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        options={['one', 'two']}
        onChange={onChange}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    const preventDefault = jest.fn();
    Simulate.keyDown(
      document.getElementById('test-select__select-drop'),
      { key: 'Down', keyCode: 40, which: 40, preventDefault },
    );
    expect(preventDefault).toBeCalled();
    Simulate.keyDown(
      document.getElementById('test-select__select-drop'),
      { key: 'Up', keyCode: 38, which: 38, preventDefault },
    );
    expect(preventDefault).toBeCalled();
    Simulate.keyDown(
      document.getElementById('test-select__select-drop'),
      { key: 'Enter', keyCode: 13, which: 13, preventDefault },
    );
    expect(preventDefault).toBeCalled();
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('size', () => {
    const component = renderer.create(
      <Select
        id='test-select'
        size='large'
        options={['one', 'two']}
        selected={[]}
        value={[]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('multiple', () => {
    const component = renderer.create(
      <Select
        id='test-select'
        multiple={true}
        options={['one', 'two']}
        selected={[]}
        value={[]}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('multiple values', () => {
    const { getByTestId, container } = render(
      <Select
        data-testid='test-select'
        id='test-select'
        multiple={true}
        options={['one', 'two']}
        selected={[0, 1]}
        value={['one', 'two']}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('select another option', () => {
    const onChange = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        multiple={true}
        options={['one', 'two']}
        onChange={onChange}
        value={['two']}
        selected={[1]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('deselect an option', () => {
    const onChange = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        multiple={true}
        options={['one', 'two']}
        onChange={onChange}
        value={['one']}
        selected={[0]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByTestId('test-select'));

    Simulate.click(
      document.getElementById('test-select__drop').querySelector('button')
    );
    expect(onChange).toBeCalled();
  });

  test('disabled', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Select
        data-testid='test-select'
        id='test-select'
        disabled={true}
        options={['one', 'two']}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    Simulate.click(getByTestId('test-select'));

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
  });
});
