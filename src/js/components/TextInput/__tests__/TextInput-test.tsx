// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getByText, screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import { Add, Search } from 'grommet-icons';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '..';
import { Keyboard } from '../../Keyboard';
import { Text } from '../../Text';
import { TextArea } from '../../TextArea';
import { MaskedInput } from '../../MaskedInput';
import { Select } from '../../Select';
import { SelectMultiple } from '../../SelectMultiple';
import { DateInput } from '../../DateInput';
import { FileInput } from '../../FileInput';
import { FormField } from '../../FormField';
import { ThemeType } from '../../../themes';

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

  describe('global input appearance', () => {
    const appearanceTheme: ThemeType = {
      global: {
        input: {
          background: '#eeeeee',
          border: { color: '#123456', size: '3px' },
          elevation: 'small',
          height: { min: '40px' },
          width: { min: '160px', width: '240px' },
          margin: { bottom: '4px' },
          pad: '8px',
          round: '6px',
          hover: {
            background: '#dddddd',
            border: { color: '#abcdef' },
            pad: '10px',
            round: '8px',
          },
          focus: { border: { color: '#654321' }, pad: '12px' },
          disabled: { background: '#bbbbbb', border: false, round: false },
          readOnly: {
            background: '#cccccc',
            border: { color: '#334455' },
            pad: '14px',
            round: '10px',
          },
          placeholder: { color: '#778899', size: 'small', weight: 500 },
        },
      },
    };

    test.each(['textInput', 'textArea', 'maskedInput'] as const)(
      'applies Box-part and state styles to %s',
      async (kind) => {
        const user = userEvent.setup();
        const props = { 'aria-label': 'Entry' };
        const input =
          kind === 'textArea' ? (
            <TextArea {...props} />
          ) : kind === 'maskedInput' ? (
            <MaskedInput {...props} mask={[]} />
          ) : (
            <TextInput {...props} />
          );
        render(<Grommet theme={appearanceTheme}>{input}</Grommet>);
        const control = screen.getByRole('textbox', { name: 'Entry' });
        expect(control).toHaveStyleRule('background-color', '#eeeeee');
        expect(control).toHaveStyleRule('border', 'solid 3px #123456');
        expect(control).toHaveStyleRule('min-height', '40px');
        expect(control).toHaveStyleRule('min-width', '160px');
        expect(control).toHaveStyleRule('width', '240px');
        expect(control).toHaveStyleRule('margin-bottom', '4px');
        expect(control).toHaveStyleRule('padding', '8px');
        expect(control).toHaveStyleRule('border-radius', '6px');
        expect(control).toHaveStyleRule('box-shadow', expect.any(String));
        expect(control).toHaveStyleRule('color', '#778899', {
          modifier: '::placeholder',
        });
        expect(control).toHaveStyleRule('font-weight', '500', {
          modifier: '::placeholder',
        });
        await user.hover(control);
        expect(control).toHaveStyleRule('background-color', '#dddddd', {
          modifier: ':hover',
        });
        expect(control).toHaveStyleRule('border', 'solid 3px #abcdef', {
          modifier: ':hover',
        });
        await user.click(control);
        expect(control).toHaveFocus();
        expect(control).toHaveStyleRule('border', 'solid 3px #654321', {
          modifier: ':focus',
        });
        expect(control).toHaveStyleRule('padding', '12px', {
          modifier: ':focus',
        });
      },
    );

    test('disabled input keeps its application state without hover or focus overrides', () => {
      render(
        <Grommet theme={appearanceTheme}>
          <TextInput aria-label="Entry" disabled />
        </Grommet>,
      );
      const control = screen.getByRole('textbox', { name: 'Entry' });
      expect(control).toHaveStyleRule('background-color', '#bbbbbb');
      expect(control).toHaveStyleRule('border', 'none');
      expect(control).toHaveStyleRule('border-radius', '0');
      expect(control).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
      expect(control).not.toHaveStyleRule('border', undefined, {
        modifier: ':focus',
      });
    });

    test.each([false, true])(
      'TextInput wrapper owns the surface (readOnly=%s)',
      (readOnly) => {
        render(
          <Grommet theme={appearanceTheme}>
            <TextInput
              aria-label="Entry"
              readOnly={readOnly}
              type={readOnly ? 'text' : 'password'}
              password={!readOnly}
            />
          </Grommet>,
        );
        const control = screen.getByLabelText('Entry');
        const surface = control.parentElement;
        expect(surface).toHaveStyleRule(
          'background-color',
          readOnly ? '#cccccc' : '#eeeeee',
        );
        expect(surface).toHaveStyleRule(
          'border',
          readOnly ? 'solid 3px #334455' : 'solid 3px #123456',
        );
        expect(control).toHaveStyleRule('background', 'transparent');
        expect(control).not.toHaveStyleRule('background-color');
        expect(control).toHaveStyleRule('padding', readOnly ? '14px' : '8px');
        expect(surface).not.toHaveStyleRule('padding');
        if (readOnly) {
          expect(surface).not.toHaveStyleRule('background-color', undefined, {
            modifier: ':hover',
          });
          expect(surface).not.toHaveStyleRule('border', undefined, {
            modifier: ':focus-within',
          });
        }
      },
    );

    test('plain controls retain FormField surfaces without a second border or fill', () => {
      render(
        <Grommet theme={appearanceTheme}>
          <FormField label="Entry">
            <TextInput id="entry" aria-label="Entry" />
          </FormField>
        </Grommet>,
      );
      const control = screen.getByRole('textbox', { name: 'Entry' });
      expect(control).not.toHaveStyleRule('background-color');
      expect(control).toHaveStyleRule('border', 'none');
      expect(control).not.toHaveStyleRule('box-shadow');
      expect(control).not.toHaveStyleRule('background-color', undefined, {
        modifier: ':hover',
      });
    });

    test('canonical pad overrides legacy padding and explicit width remains authoritative', () => {
      render(
        <Grommet
          theme={{
            global: { input: { padding: '24px', pad: '6px', width: '240px' } },
          }}
        >
          <TextInput aria-label="Entry" width="120px" icon={<Search />} />
        </Grommet>,
      );
      const control = screen.getByRole('textbox', { name: 'Entry' });
      expect(control).toHaveStyleRule('padding', '6px');
      expect(control).toHaveStyleRule('width', '120px');
    });

    test('global input extend remains the final native input override', () => {
      render(
        <Grommet
          theme={{
            global: {
              input: {
                background: '#eeeeee',
                extend: 'background-color: #112233;',
              },
            },
          }}
        >
          <TextInput aria-label="Entry" />
        </Grommet>,
      );
      expect(screen.getByRole('textbox', { name: 'Entry' })).toHaveStyleRule(
        'background-color',
        '#112233',
      );
    });

    test('composite controls apply appearance to the visible surface only', () => {
      render(
        <Grommet theme={appearanceTheme}>
          <Select aria-label="Single" options={['One', 'Two']} />
          <SelectMultiple aria-label="Multiple" options={['One', 'Two']} />
          <DateInput aria-label="Date" format="mm/dd/yyyy" />
          <FileInput aria-label="File" name="file" />
        </Grommet>,
      );
      const single = screen.getByRole('button', { name: /Single/ });
      const multiple = screen.getByRole('button', { name: /Multiple/ });
      [single, multiple].forEach((surface) => {
        expect(surface).toHaveStyleRule('background-color', '#eeeeee');
        expect(surface).toHaveStyleRule('border', 'solid 3px #123456');
      });
      const date = screen.getByRole('textbox', { name: 'Date' });
      expect(date).not.toHaveStyleRule('background-color');
      expect(date.parentElement?.parentElement).toHaveStyleRule(
        'background-color',
        '#eeeeee',
      );
      expect(date.parentElement?.parentElement).toHaveStyleRule(
        'border',
        'solid 3px #123456',
      );
      const file = screen.getByLabelText('File');
      expect(file.parentElement).toHaveStyleRule('background-color', '#eeeeee');
      expect(file.parentElement).toHaveStyleRule('border', 'solid 3px #123456');
    });
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

  test('supports password reveal toggle', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput aria-label="Password" type="password" password />
      </Grommet>,
    );

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toBeInTheDocument();
  });

  test('uses password type when password is set without type', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput aria-label="Password" password />
      </Grommet>,
    );

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'text');
  });

  test('supports password toggle theme icons', async () => {
    const user = userEvent.setup();

    render(
      <Grommet
        theme={{
          textInput: { icons: { showPassword: Add, hidePassword: Search } },
        }}
      >
        <TextInput aria-label="Password" type="password" password />
      </Grommet>,
    );

    expect(screen.getByLabelText('Add')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Search')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  test('supports password toggle theme icon elements', async () => {
    const user = userEvent.setup();

    render(
      <Grommet
        theme={{
          textInput: {
            icons: { showPassword: <Add />, hidePassword: <Search /> },
          },
        }}
      >
        <TextInput aria-label="Password" type="password" password />
      </Grommet>,
    );

    expect(screen.getByLabelText('Add')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByLabelText('Search')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  test('supports password toggle with matchSize and custom size', () => {
    render(
      <Grommet
        theme={{
          icon: {
            matchSize: true,
          },
        }}
      >
        <TextInput aria-label="Password" type="password" password size="16px" />
      </Grommet>,
    );

    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    );
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeInTheDocument();
  });

  test('supports reverse icon when password toggle is active', () => {
    render(
      <Grommet>
        <TextInput
          aria-label="Password"
          type="password"
          password
          reverse
          icon={<Search />}
        />
      </Grommet>,
    );

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show password' }),
    ).toBeInTheDocument();
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
      expect(onChange).toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalled();

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
      expect(callback).toHaveBeenCalled();
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
      expect(onSuggestionsOpen).toHaveBeenCalled();
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
        expect(onSuggestionsClose).toHaveBeenCalled();
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
      expect(onSelect).toHaveBeenCalledWith(
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
    expect(onSelect).toHaveBeenCalledWith(
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
    expect(onSelect).toHaveBeenCalledWith(
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
    expect(onSelect).toHaveBeenCalledWith(
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
    expect(onSelect).not.toHaveBeenCalled();

    // open drop
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // highlight first
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // highlight second
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    // select highlighted
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toHaveBeenCalledWith(
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
    expect(onSuggestionSelect).toHaveBeenCalledWith(
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
    expect(onSuggestionSelect).toHaveBeenCalledWith(
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
    expect(onSelect).not.toHaveBeenCalled();
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

  test('read only', () => {
    const { asFragment } = render(
      <Grommet>
        <TextInput value="test" readOnly aria-readonly />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('read only with icon', () => {
    const { container } = render(
      <Grommet>
        <TextInput value="test" readOnly icon={<Search />} aria-readonly />
      </Grommet>,
    );
    // Icon should be visible when readOnly is true (fixes #7668)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('read only with width', () => {
    const { asFragment } = render(
      <Grommet>
        <TextInput value="test" readOnly aria-readonly width={'small'} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('read only copy', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet>
        <TextInput value="test" readOnly readOnlyCopy aria-readonly />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('test');

    expect(asFragment()).toMatchSnapshot();
  });

  test('keeps read only copy after the input when reversed', () => {
    render(
      <Grommet>
        <TextInput
          value="test"
          readOnly
          readOnlyCopy
          reverse
          aria-label="Reversed read only copy"
        />
      </Grommet>,
    );

    const input = screen.getByLabelText('Reversed read only copy');
    const copyButton = screen.getByRole('button');

    expect(
      input.compareDocumentPosition(copyButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('copy editable value', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput value="test" copy aria-label="Editable value" />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Copy to clipboard test' }),
    );

    expect(await navigator.clipboard.readText()).toBe('test');
    expect(screen.getByLabelText('Editable value')).not.toHaveAttribute(
      'readonly',
    );
  });

  test('copy editable value with custom click handler', async () => {
    const user = userEvent.setup();
    const onClickCopy = jest.fn();

    render(
      <Grommet>
        <TextInput
          value="test"
          copy
          onClickCopy={onClickCopy}
          aria-label="Editable value"
        />
      </Grommet>,
    );

    await user.click(
      screen.getByRole('button', { name: 'Copy to clipboard test' }),
    );

    expect(onClickCopy).toHaveBeenCalledTimes(1);
    expect(onClickCopy).toHaveBeenCalledWith(expect.anything(), 'test');
  });

  test('forwards native onCopy to the input', () => {
    const onCopy = jest.fn();

    render(
      <Grommet>
        <TextInput value="test" copy onCopy={onCopy} aria-label="Value" />
      </Grommet>,
    );

    fireEvent.copy(screen.getByLabelText('Value'));

    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(onCopy.mock.calls[0][0]).toHaveProperty('clipboardData');
  });

  test('copy uncontrolled value after edit', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput defaultValue="test" copy aria-label="Uncontrolled value" />
      </Grommet>,
    );

    const input = screen.getByLabelText('Uncontrolled value');
    await user.type(input, ' edited');

    await user.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    expect(await navigator.clipboard.readText()).toBe('test edited');
  });

  test('supports copy with password toggle', () => {
    render(
      <Grommet>
        <TextInput value="test" copy password aria-label="Password" />
      </Grommet>,
    );

    // value must not be exposed via the accessible name for masked inputs
    expect(
      screen.getByRole('button', { name: 'Copy to clipboard' }),
    ).toBeInTheDocument();
    const copyButton = screen.getByRole('button', {
      name: 'Copy to clipboard',
    });
    const passwordButton = screen.getByRole('button', {
      name: 'Show password',
    });

    expect(passwordButton).toBeInTheDocument();
    expect(
      passwordButton.compareDocumentPosition(copyButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('preserves password toggle horizontal padding', () => {
    render(
      <Grommet>
        <TextInput value="test" password aria-label="Password" />
      </Grommet>,
    );

    const passwordButton = screen.getByRole('button', {
      name: 'Show password',
    });
    const style = window.getComputedStyle(passwordButton);

    expect(style.paddingLeft).not.toBe('0px');
    expect(style.paddingRight).not.toBe('0px');
    expect(style.paddingTop).toBe('0px');
    expect(style.paddingBottom).toBe('0px');
  });

  test('supports copy with password toggle when reverse', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput value="test" copy password reverse aria-label="Password" />
      </Grommet>,
    );

    const copyButton = screen.getByRole('button', {
      name: 'Copy to clipboard',
    });
    const toggleButton = screen.getByRole('button', {
      name: 'Show password',
    });
    const input = screen.getByLabelText('Password');

    // reverse does not move the actions group before the input.
    expect(copyButton).not.toBe(toggleButton);
    expect(
      copyButton.compareDocumentPosition(input) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy();
    expect(
      toggleButton.compareDocumentPosition(input) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy();

    await user.click(copyButton);
    expect(await navigator.clipboard.readText()).toBe('test');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toBeInTheDocument();
  });

  test('zeros right padding when copy button is reversed', () => {
    render(
      <Grommet>
        <TextInput value="test" copy reverse aria-label="Reversed copy" />
      </Grommet>,
    );

    const input = screen.getByLabelText('Reversed copy');

    expect(input).toHaveStyleRule('padding-right', '0px');
  });

  test('supports copy, password toggle, and reverse icon together', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <TextInput
          value="test"
          copy
          password
          reverse
          icon={<Search />}
          aria-label="Password"
        />
      </Grommet>,
    );

    const copyButton = screen.getByRole('button', {
      name: 'Copy to clipboard',
    });
    const toggleButton = screen.getByRole('button', {
      name: 'Show password',
    });
    const icon = screen.getByLabelText('Search');
    const input = screen.getByLabelText('Password');

    // reverse moves the icon after the input while the actions group stays after it
    expect(copyButton).not.toBe(toggleButton);
    expect(icon).not.toBe(toggleButton);
    expect(
      input.compareDocumentPosition(icon) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      input.compareDocumentPosition(toggleButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      input.compareDocumentPosition(copyButton) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    await user.click(copyButton);
    expect(await navigator.clipboard.readText()).toBe('test');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
  });

  test('read only copy theme icon', async () => {
    render(
      <Grommet theme={{ textInput: { icons: { copy: Add } } }}>
        <TextInput value="test" readOnly readOnlyCopy aria-readonly />
      </Grommet>,
    );

    expect(screen.getByLabelText('Add')).toBeInTheDocument();
  });

  test('read only copy with width', async () => {
    const user = userEvent.setup();

    const { asFragment } = render(
      <Grommet>
        <TextInput
          value="test"
          readOnly
          readOnlyCopy
          aria-readonly
          width={'small'}
        />
      </Grommet>,
    );

    await user.click(screen.getByRole('button'));

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe('test');

    expect(asFragment()).toMatchSnapshot();
  });
});
