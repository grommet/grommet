// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import 'jest-styled-components';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import { Grommet } from '../../Grommet';
import { FileInput } from '..';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { Alert } from 'grommet-icons';

describe('FileInput', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <FileInput aria-label="Upload files" />
      </Grommet>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test.each([1, 2, 11])(
    'overlay exclusion follows action bounds across padding changes (%s files)',
    async (count) => {
      const user = userEvent.setup();
      let rightInset = 40;
      const removeWidth = 30;
      const browseWidth = 60;
      const rect = (left: number, width: number) =>
        ({
          left,
          right: left + width,
          width,
          top: 0,
          bottom: 40,
          height: 40,
          x: left,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect);
      const bounds = jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function getBounds(this: HTMLElement) {
          if (this.firstElementChild?.getAttribute('type') === 'file')
            return rect(0, 500);
          if (this.getAttribute('aria-label')?.startsWith('remove'))
            return rect(
              500 - rightInset - removeWidth - (count === 1 ? browseWidth : 0),
              removeWidth,
            );
          if (this.textContent === 'Browse' && this.tagName === 'A')
            return rect(500 - rightInset - browseWidth, browseWidth);
          return rect(0, 0);
        });

      try {
        render(
          <Grommet
            theme={{
              global: {
                input: {
                  pad: { right: '40px' },
                  hover: { pad: { right: '64px' } },
                  focus: { pad: { right: '80px' } },
                },
              },
            }}
          >
            <Form
              value={{
                uploads: Array.from(
                  { length: count },
                  (_, index) => new File(['hello'], `file-${index}.txt`),
                ),
              }}
            >
              <FileInput aria-label="Upload files" name="uploads" multiple />
            </Form>
          </Grommet>,
        );

        const input = screen.getByLabelText('Upload files');
        const excludedControls = removeWidth + (count === 1 ? browseWidth : 0);
        expect(input).toHaveStyleRule('right', `${40 + excludedControls}px`);

        rightInset = 64;
        await user.hover(input);
        expect(input).toHaveStyleRule('right', `${64 + excludedControls}px`);

        rightInset = 80;
        await user.tab();
        expect(input).toHaveFocus();
        expect(input).toHaveStyleRule('right', `${80 + excludedControls}px`);

        rightInset = 96;
        fireEvent(window, new Event('resize'));
        expect(input).toHaveStyleRule('right', `${96 + excludedControls}px`);
      } finally {
        bounds.mockRestore();
      }
    },
  );

  test.each(['hover', 'focus', 'both'] as const)(
    'keyboard focus shadow wins over %s elevation',
    async (state) => {
      const user = userEvent.setup();
      render(
        <Grommet
          theme={{
            global: {
              focus: {
                outline: { size: '0px', color: 'transparent' },
                shadow: '0 0 0 3px red',
                twoColor: true,
              },
              input: {
                hover: state !== 'focus' ? { elevation: 'none' } : undefined,
                focus: state !== 'hover' ? { elevation: 'none' } : undefined,
              },
            },
          }}
        >
          <FileInput aria-label="Upload files" />
        </Grommet>,
      );

      const input = screen.getByLabelText('Upload files');
      const surface = input.parentElement as HTMLElement;
      await user.tab();
      expect(input).toHaveFocus();
      await user.hover(input);
      expect(input).toHaveFocus();
      expect(getComputedStyle(surface).boxShadow).toBe('0 0 0 3px red');

      const focusRules = Array.from(document.styleSheets).flatMap((sheet) =>
        Array.from(sheet.cssRules),
      ) as CSSStyleRule[];
      expect(
        focusRules.some(
          (rule) =>
            rule.style?.getPropertyValue('box-shadow') === '0 0 0 3px red' &&
            Array.from(surface.classList).some((className) =>
              rule.selectorText?.includes(`.${className}.${className}`),
            ),
        ),
      ).toBe(true);
    },
  );

  test('pointer focus does not add a keyboard shadow with appearance elevation', async () => {
    const user = userEvent.setup();
    render(
      <Grommet
        theme={{
          global: {
            focus: { shadow: '0 0 0 3px red' },
            input: {
              hover: { elevation: 'none' },
              focus: { elevation: 'none' },
            },
          },
        }}
      >
        <FileInput aria-label="Upload files" />
      </Grommet>,
    );

    const input = screen.getByLabelText('Upload files');
    await user.click(input);
    expect(input).toHaveFocus();
    expect(getComputedStyle(input.parentElement as HTMLElement).boxShadow).toBe(
      'none',
    );
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should use theme icons', () => {
    const exampleFile = { name: 'file-size-error.csv', size: 15000 };
    const Test = () => {
      const [value, setValue] = React.useState({
        fileInput: [exampleFile],
      });
      return (
        <Form validate="change" value={value} onChange={setValue}>
          <FormField
            label="File input with max size"
            htmlFor="fileInput"
            name="fileInput"
          >
            <FileInput id="fileInput" name="fileInput" maxSize={200} />
          </FormField>
        </Form>
      );
    };
    const { container } = render(
      <Grommet theme={{ fileInput: { icons: { error: Alert } } }}>
        <Test />
      </Grommet>,
    );
    expect(screen.getByLabelText(/Error, /i)).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('basic outside grommet wrapper', () => {
    const { container } = render(<FileInput name="file" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" multiple />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple aggregateThreshold', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" multiple={{ aggregateThreshold: 2 }} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('accept', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" accept="image/*" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <FileInput name="file" disabled />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('messages', () => {
    const { container } = render(
      <Grommet>
        <FileInput
          name="file"
          messages={{
            browse: 'test browse',
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('background', () => {
    const customTheme = {
      fileInput: {
        background: {
          color: 'background-contrast',
        },
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const customTheme = {
      fileInput: {
        border: {
          color: 'brand',
          size: 'large',
        },
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('pad', () => {
    const customTheme = {
      fileInput: {
        pad: 'small',
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('margin', () => {
    const customTheme = {
      fileInput: {
        margin: 'small',
      },
    };
    const { container } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('custom theme input font size', () => {
    const { container } = render(
      <Grommet theme={{ global: { input: { font: { size: '16px' } } } }}>
        <FileInput />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('maxSize', () => {
    const maxSize = 5000000;
    const { container } = render(
      <Grommet>
        <FileInput name="file" maxSize={maxSize} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('multiple max', () => {
    const { container } = render(
      <Grommet>
        <FileInput
          name="file"
          multiple={{
            max: 5,
          }}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled with file selected', () => {
    const exampleFile = { name: 'file-size-okay.csv', size: 15000 };
    const Test = () => {
      const [value, setValue] = React.useState({
        fileInput: [exampleFile],
      });
      return (
        <Form validate="change" value={value} onChange={setValue}>
          <FormField
            label="File input with max size"
            htmlFor="fileInput"
            name="fileInput"
          >
            <FileInput id="fileInput" name="fileInput" disabled />
          </FormField>
        </Form>
      );
    };
    const { container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('theme anchor margin and label gap', () => {
    const customTheme = {
      fileInput: {
        anchor: {
          margin: 'large',
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <FileInput name="file" />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('cancelling the file picker should not clear an existing file', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Grommet>
        <FileInput onChange={onChange} />
      </Grommet>,
    );

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // Select a file
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    await user.upload(input, file);
    expect(screen.getByText('hello.txt')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);

    // Simulate cancelling the file picker — browser fires change with empty FileList
    fireEvent.change(input, { target: { files: [] } });

    // File should still be shown and onChange should not have fired again
    expect(screen.getByText('hello.txt')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
