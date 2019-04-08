import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Select } from '..';

describe('Select', () => {
  beforeEach(createPortal);

  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Select id="test-select" options={['one', 'two']} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('opens', done => {
    window.scrollTo = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        placeholder="test select"
        id="test-select"
        options={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      expect(document.activeElement).toMatchSnapshot();
      done();
    }, 100);
  });

  test('complex options and children', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={[{ test: 'one' }, { test: 'two' }]}
      >
        {option => <span>{option.test}</span>}
      </Select>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('search', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onSearch={onSearch}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    expectPortal('test-select__drop').toMatchSnapshot();

    setTimeout(() => {
      jest.runAllTimers();

      expect(document.activeElement).toMatchSnapshot();

      document.activeElement.value = 'a';
      fireEvent.input(document.activeElement);

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
  //   fireEvent.keyDown(
  //     component.getDOMNode(),
  //     { key: 'Down', keyCode: 40, which: 40 }
  //   );
  //
  //   expectPortal('test-select__drop').toMatchSnapshot();
  //   expect(component.getDOMNode()).toMatchSnapshot();
  //
  //   fireEvent.keyDown(
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
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    // pressing enter here nothing will happen
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with complex options', () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByText, container } = render(
      <Select
        id="test-select"
        plain
        value={<span>one</span>}
        options={[{ test: 'one' }, { test: 'two' }]}
        onChange={onChange}
      >
        {option => <span>{option.test}</span>}
      </Select>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('one'));

    // pressing enter here nothing will happen
    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
    expect(window.scrollTo).toBeCalled();
  });

  test('select an option with enter', () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Down',
      keyCode: 40,
      which: 40,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Up',
      keyCode: 38,
      which: 38,
    });
    fireEvent.keyDown(document.getElementById('test-select__select-drop'), {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: 'one' }));
    expect(window.scrollTo).toBeCalled();
  });

  test('size', () => {
    const component = renderer.create(
      <Select
        id="test-select"
        size="large"
        options={['one', 'two']}
        selected={[]}
        value={[]}
        onChange={() => {}}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('multiple', () => {
    const component = renderer.create(
      <Select
        id="test-select"
        multiple
        options={['one', 'two']}
        selected={[]}
        value={[]}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('multiple values', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        selected={[0, 1]}
        value={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
  });

  test('select another option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        onChange={onChange}
        value={['two']}
        selected={[1]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
  });

  test('deselect an option', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        multiple
        options={['one', 'two']}
        onChange={onChange}
        value={['one']}
        selected={[0]}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByPlaceholderText('test select'));

    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(onChange).toBeCalled();
  });

  test('disabled', () => {
    const { getByPlaceholderText, container } = render(
      <Select
        id="test-select"
        placeholder="test select"
        disabled
        options={['one', 'two']}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();

    fireEvent.click(getByPlaceholderText('test select'));

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
  });

  ['small', 'medium', 'large'].forEach(dropHeight => {
    test(`${dropHeight} drop container height`, () => {
      const { getByPlaceholderText } = render(
        <Select
          id="test-select"
          size="large"
          options={['one', 'two']}
          selected={[]}
          value={[]}
          onChange={() => {}}
          dropHeight={dropHeight}
          placeholder="test select"
        />,
      );
      fireEvent.click(getByPlaceholderText('test select'));
      expect(document.activeElement).toMatchSnapshot();
    });
  });

  test('empty results search', () => {
    const { getByPlaceholderText } = render(
      <Select
        id="test-select"
        placeholder="test select"
        options={[]}
        onSearch={() => {}}
        emptySearchMessage="no results"
      />,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    document.activeElement.value = 'a';
    fireEvent.input(document.activeElement);

    expect(document.activeElement).toMatchSnapshot();
  });

  test('open default state', () => {
    render(
      <Select
        open
        id="test-select"
        placeholder="test select"
        options={['one', 'two']}
      />,
    );

    expect(document.getElementById('test-select__drop')).not.toBeNull();
  });
});
