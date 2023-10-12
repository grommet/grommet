import React from 'react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getByText, screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import { Search } from 'grommet-icons';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '..';
import { Keyboard } from '../../Keyboard';
import { Text } from '../../Text';

describe('TextInput', () => {
  beforeEach(createPortal);

  test('should not have accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <TextInput a11yTitle="aria-test" name="item" />
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(<TextInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('a11yTitle or aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <TextInput a11yTitle="aria-test" name="item" />
        <TextInput aria-label="aria-test-2" name="item-2" />
      </Grommet>,
    );

    expect(getByLabelText('aria-test')).toBeTruthy();
    expect(getByLabelText('aria-test-2')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(<TextInput disabled name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon', () => {
    const { container } = render(<TextInput icon={<Search />} name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon reverse', () => {
    const { container } = render(
      <TextInput icon={<Search />} reverse name="item" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('suggestions', (done) => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { getByTestId, container } = render(
      <TextInput
        data-testid="test-input"
        id="item"
        name="item"
        suggestions={['test', 'test1']}
        onChange={onChange}
        onFocus={onFocus}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      expect(onChange).toBeCalled();
      expect(onFocus).toBeCalled();

      fireEvent(
        document,
        new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
      );
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('complex suggestions', (done) => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={[{ label: 'test', value: 'test' }, { value: 'test1' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent(
        document,
        new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
      );
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('close suggestion drop', (done) => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      setTimeout(() => {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });

  test('let escape events propagage if there are no suggestions', (done) => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <Keyboard onEsc={callback}>
          <TextInput data-testid="test-input" id="item" name="item" />
        </Keyboard>
      </Grommet>,
    );

    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      expect(callback).toBeCalled();
      done();
    }, 50);
  });

  test('calls onSuggestionsOpen', (done) => {
    const onSuggestionsOpen = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          onSuggestionsOpen={onSuggestionsOpen}
        />
      </Grommet>,
    );

    fireEvent.focus(getByTestId('test-input'));
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      expect(onSuggestionsOpen).toBeCalled();
      done();
    }, 50);
  });

  test('calls onSuggestionsClose', (done) => {
    const onSuggestionsClose = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          onSuggestionsClose={onSuggestionsClose}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      setTimeout(() => {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(onSuggestionsClose).toBeCalled();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });

  test('select suggestion', (done) => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          plain
          size="large"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          onSelect={onSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      // Casting a custom to a primitive by erasing type with unknown.
      fireEvent.click(getByText(document as unknown as HTMLElement, 'test1'));
      expect(container.firstChild).toMatchSnapshot();
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      expect(onSelect).toBeCalledWith(
        expect.objectContaining({ suggestion: 'test1' }),
      );
      done();
    }, 50);
  });

  test('select a suggestion with onSelect', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', { value: 'test1' }]}
          onSelect={onSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    // pressing enter here nothing will happen
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 38 }); // up
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'test',
      }),
    );
  });

  test('auto-select 2nd suggestion with defaultSuggestion', () => {
    const onSelect = jest.fn();
    const suggestions = ['test1', 'test2'];
    const defaultSuggestionIndex = 1;
    const { getByTestId } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          defaultSuggestion={defaultSuggestionIndex}
          suggestions={suggestions}
          onSuggestionSelect={onSelect}
        />
      </Grommet>,
    );

    const input = getByTestId('test-input');
    // open drop - second should be automatically highlighted
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // pressing enter here will select the second suggestion
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: suggestions[defaultSuggestionIndex],
      }),
    );
  });

  test('auto-select 1st suggestion via typing with defaultSuggestion', () => {
    const onSelect = jest.fn();
    const suggestions = ['nodefault1', 'default', 'nodefault2'];
    const defaultSuggestionIndex = 1;
    const { getByTestId } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          defaultSuggestion={defaultSuggestionIndex}
          suggestions={suggestions}
          onSuggestionSelect={onSelect}
        />
      </Grommet>,
    );

    const input = getByTestId('test-input');
    // Set focus so drop opens and we track activeSuggestionIndex
    fireEvent.focus(input);
    // Fire a change event so that onChange is triggered.
    fireEvent.change(input, { target: { value: 'ma' } });
    // Each time we type, the active suggestion should reset to the suggestion
    // matching the entered text, or the default suggestion index if no
    // suggestion matches.  Now, when we hit enter, there's no match yet, so
    // the default suggestion should be selected.
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'default',
      }),
    );
  });

  test('do not select any suggestion without defaultSuggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test1', 'test2']}
          onSuggestionSelect={onSelect}
        />
      </Grommet>,
    );

    const input = getByTestId('test-input');
    // open drop
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // pressing enter here closes drop but doesn't select
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    // if no suggestion had been selected, don't call onSelect
    expect(onSelect).not.toBeCalled();

    // open drop
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // highlight first
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // highlight second
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // select highlighted
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'test2',
      }),
    );
  });

  test('select a suggestion with onSuggestionSelect', () => {
    const onSuggestionSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', { value: 'test1' }]}
          onSuggestionSelect={onSuggestionSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    // pressing enter here nothing will happen
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 38 }); // up
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSuggestionSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'test',
      }),
    );
  });

  test('select with onSuggestionSelect when onSelect is present', () => {
    const onSelect = jest.fn();
    const onSuggestionSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', { value: 'test1' }]}
          onSelect={onSelect}
          onSuggestionSelect={onSuggestionSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    // pressing enter here nothing will happen
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 38 }); // up
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSuggestionSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'test',
      }),
    );
  });

  test('handles next and previous without suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          onSelect={onSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 38 });
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  ['small', 'medium', 'large'].forEach((dropHeight) => {
    test(`${dropHeight} drop height`, (done) => {
      const { getByTestId } = render(
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          dropHeight={dropHeight}
        />,
      );

      fireEvent.focus(getByTestId('test-input'));
      setTimeout(() => {
        expectPortal('text-input-drop__item').toMatchSnapshot();
        done();
      }, 50);
    });
  });

  test('should return focus to input on select', async () => {
    const onSelect = jest.fn();
    const { getByPlaceholderText } = render(
      <Grommet>
        <TextInput
          data-testid="test-input-focus"
          id="input-focus"
          name="input-focus"
          placeholder="Type to search..."
          suggestions={['option0', 'option1', 'option2']}
          onSelect={onSelect}
        />
      </Grommet>,
    );

    const input = getByPlaceholderText('Type to search...');

    expect(document.activeElement).not.toEqual(input);
    fireEvent.focus(input);
    expect(document.activeElement).not.toEqual(input);

    const selection = await waitFor(() => screen.getByText('option1'));

    fireEvent.click(selection);
    expect(document.activeElement).toEqual(input);
  });

  test('should return focus to ref on select', async () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const onSelect = jest.fn();
    const { getByPlaceholderText } = render(
      <Grommet>
        <TextInput
          ref={inputRef}
          data-testid="test-input-focus"
          id="input-focus"
          name="input-focus"
          placeholder="Type to search..."
          suggestions={['option0', 'option1', 'option2']}
          onSelect={onSelect}
        />
      </Grommet>,
    );

    const input = getByPlaceholderText('Type to search...');

    expect(document.activeElement).not.toEqual(input);
    fireEvent.focus(input);
    expect(document.activeElement).not.toEqual(input);

    const selection = await waitFor(() => screen.getByText('option2'));

    fireEvent.click(selection);
    expect(document.activeElement).toEqual(input);
  });

  test('should not have padding when plain="full"', async () => {
    const { container } = render(
      <Grommet>
        <TextInput
          plain="full"
          name="name"
          placeholder="should not have padding"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have padding when plain', async () => {
    const { container } = render(
      <Grommet>
        <TextInput plain name="name" placeholder="should still have padding" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should show non-string placeholder', () => {
    const { container } = render(
      <Grommet>
        <TextInput
          data-testid="test-styled-placeholder"
          id="styled-placeholder"
          name="styled-placeholder"
          placeholder={<Text>placeholder text</Text>}
        />
      </Grommet>,
    );

    const placeholder = screen.getByText('placeholder text');
    expect(placeholder).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should hide non-string placeholder when having a value', () => {
    const { container } = render(
      <Grommet>
        <TextInput
          data-testid="styled-placeholder"
          id="styled-placeholder"
          name="styled-placeholder"
          placeholder={<Text>placeholder text</Text>}
          value="test"
        />
      </Grommet>,
    );

    const placeholder = screen.queryByText('placeholder text');
    expect(placeholder).toBeNull();

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should only show default placeholder when placeholder is a
  string`, () => {
    const { container, getByTestId } = render(
      <Grommet>
        <TextInput
          data-testid="placeholder"
          id="placeholder"
          name="placeholder"
          placeholder="placeholder text"
        />
      </Grommet>,
    );

    const placeholder = screen.queryByText('placeholder text');
    fireEvent.change(getByTestId('placeholder'), {
      target: { value: 'something' },
    });
    expect(placeholder).toBeNull();
    expect(container.firstChild).toMatchSnapshot();

    // after value is removed, only one placeholder should be present
    // nothing from styled placeholder should appear since placeholder
    // is a string
    fireEvent.change(getByTestId('placeholder'), { target: { value: '' } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('textAlign end', () => {
    const { container } = render(
      <Grommet>
        <TextInput value="1234" textAlign="end" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme input font size', () => {
    const { container } = render(
      <Grommet theme={{ global: { input: { font: { size: '16px' } } } }}>
        <TextInput />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders size', () => {
    const { container } = render(
      <Grommet>
        <TextInput size="xsmall" />
        <TextInput size="small" />
        <TextInput size="medium" />
        <TextInput size="large" />
        <TextInput size="xlarge" />
        <TextInput size="xxlarge" />
        <TextInput size="2xl" />
        <TextInput size="3xl" />
        <TextInput size="4xl" />
        <TextInput size="5xl" />
        <TextInput size="6xl" />
        <TextInput size="16px" />
        <TextInput size="1rem" />
        <TextInput size="100%" />
      </Grommet>,
    );
    expect(container.children).toMatchSnapshot();
  });

  test('width', () => {
    const { container } = render(
      <Grommet>
        <TextInput value="1234" width="medium" />
        <TextInput value="1234" width={{ width: 'medium', max: '100%' }} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches icon size to size prop when theme.icon.matchSize is true', () => {
    const theme = {
      icon: {
        matchSize: true,
      },
    };

    const { asFragment } = render(
      <Grommet theme={theme}>
        <TextInput size="small" icon={<Search />} />
        <TextInput size="medium" icon={<Search />} />
        <TextInput size="large" icon={<Search />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
