import React from 'react';
import styled, { css } from 'styled-components';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';

import { Grommet, Tab, Tabs } from '../..';
import { ThemeType } from '../../../themes';

describe('Tabs', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab a11yTitle="test" />
        </Tabs>
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('no Tab', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab />
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('no Tabs', () => {
    const { container } = render(
      <Grommet>
        <Tab />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('Tab', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          {undefined}
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders outside grommet wrapper', () => {
    const { container } = render(
      <Tabs>
        <Tab title="Tab 1">Tab body 1</Tab>
        {undefined}
        <Tab title="Tab 2">Tab body 2</Tab>
      </Tabs>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('complex title', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab title={<div>Tab 1</div>}>Tab body 1</Tab>
          {undefined}
          <Tab title={<div>Tab 2</div>}>Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('with icon + reverse', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1" icon={<svg />}>
            Tab body 1
          </Tab>
          <Tab title="Tab 2" icon={<svg />} reverse>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('alignControls', () => {
    const { container } = render(
      <Grommet full>
        <Tabs alignControls="center">
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Custom Tab component', () => {
    const CustomTab = () => <Tab title="Tab 1">Tab body 1</Tab>;
    const { container } = render(
      <Grommet>
        <Tabs>
          <CustomTab />
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('change to second tab', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Tabs onActive={onActive}>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Tab 2'));
    expect(onActive).toHaveBeenCalledWith(1);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('set on hover', () => {
    const { getByText, container } = render(
      <Grommet>
        <Tabs>
          {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
          <Tab title="Tab 1" onMouseOver={() => {}} onMouseOut={() => {}}>
            Tab body 1
          </Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOut(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOut(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should style as disabled', () => {
    const { container } = render(
      <Grommet>
        <Tabs>
          <Tab title="Enabled Tab">This tab is enabled</Tab>
          <Tab title="Disabled Tab" disabled>
            This tab is disabled
          </Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should apply custom theme disabled style', () => {
    const disabledTextColor = 'blue';
    const disabledBorderBottomColor = 'green';
    const customTheme = {
      tab: {
        border: {
          disabled: {
            color: disabledBorderBottomColor,
          },
        },
        disabled: {
          color: disabledTextColor,
        },
      },
    };

    const { container, getByText } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Enabled Tab">This tab is enabled</Tab>
          <Tab title="Disabled Tab" disabled>
            This tab is disabled
          </Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const disabledTab = getByText('Disabled Tab').parentElement!;
    const disabledTabStyle = window.getComputedStyle(disabledTab);
    expect(disabledTabStyle.color).toBe('rgb(0, 0, 255)'); // blue
    expect(disabledTabStyle.borderBottomColor).toBe('rgb(0, 128, 0)');
  });

  test(`should apply custom theme disabled style when theme.button.default is 
  defined`, () => {
    const disabledTextColor = 'blue';
    const disabledBorderBottomColor = 'green';
    const customTheme = {
      button: {
        default: {},
      },
      tab: {
        border: {
          disabled: {
            color: disabledBorderBottomColor,
          },
        },
        disabled: {
          color: disabledTextColor,
        },
      },
    };

    const { container, getByText } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Enabled Tab">This tab is enabled</Tab>
          <Tab title="Disabled Tab" disabled>
            This tab is disabled
          </Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const disabledTab = getByText('Disabled Tab').parentElement!;
    const disabledTabStyle = window.getComputedStyle(disabledTab);
    expect(disabledTabStyle.color).toBe('rgb(0, 0, 255)');
    expect(disabledTabStyle.borderBottomColor).toBe('rgb(0, 128, 0)');
  });

  test('styled component should change tab color when active', () => {
    // @ts-ignore
    const ButtonTab = styled(Tab)<{ active?: boolean }>`
      ${(props) => css`
        background: ${props.active ? 'blue' : 'green'};
      `}
    `;

    const { container, getByText } = render(
      <Grommet>
        <Tabs>
          <ButtonTab title="About" />
          <ButtonTab title="Activity" />
          <ButtonTab title="Stickers" />
        </Tabs>
      </Grommet>,
    );
    fireEvent.click(getByText('Activity'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have no default styles with plain prop', () => {
    const { container, getByText } = render(
      <Grommet>
        <Tabs>
          <Tab title="Title 1" plain />
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    const plainTab = getByText('Title 1').parentElement!;
    const plainTabStyle = window.getComputedStyle(plainTab);
    expect(['', 'ButtonText']).toContain(plainTabStyle.borderBottom);
  });

  test('should allow to extend tab styles', () => {
    const customTheme: ThemeType = {
      tab: {
        extend: `color: red;
                padding: 20px;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
                margin: 30px;`,
      },
    };
    const { container, getByText } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Title 1" plain>
            Some content
          </Tab>
          <Tab title="Title 2">Some content 2</Tab>
        </Tabs>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    const extendedPlainTab = getByText('Title 1')!;
    const extendedPlainTabStyle = window.getComputedStyle(extendedPlainTab);
    // color can be changed only when plain prop used
    expect(extendedPlainTabStyle.color).toBe('rgb(255, 0, 0)'); // red

    const extendedTab = getByText('Title 2')!;
    const extendedTabStyle = window.getComputedStyle(extendedTab);
    expect(extendedTabStyle.color).not.toBe('rgb(255, 0, 0)');

    const extendedTabParent = extendedTab.parentElement!;
    const extendedTabParentStyle = window.getComputedStyle(extendedTabParent);
    expect(extendedTabParentStyle.padding).toBe('20px');
  });

  test('onClick', () => {
    const onClick = jest.fn();

    const { getByText, container } = render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2" onClick={onClick}>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Tab 2'));
    expect(onClick).toHaveBeenCalled();
  });

  test('should apply theme alignSelf to tab controls', () => {
    const customTheme = {
      tabs: {
        header: {
          alignSelf: 'start',
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Tab 1">This tab is first</Tab>
          <Tab title="Tab 2">This tab is second</Tab>
        </Tabs>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('theme tab gap', () => {
    const customTheme = {
      tab: {
        gap: 'large',
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Tabs>
          <Tab title="Tab 1" icon={<svg />}>
            Tab body 1
          </Tab>
          <Tab title="Tab 2" icon={<svg />}>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('input cursor should not jump when typing in a tab (issue #6736)', () => {
    const TestComponent = () => {
      const [text, setText] = React.useState('');

      return (
        <Grommet>
          <Tabs>
            <Tab title="Tab 1">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                data-testid="test-input"
              />
            </Tab>
            <Tab title="Tab 2">Tab 2 content</Tab>
          </Tabs>
        </Grommet>
      );
    };

    const { getByTestId } = render(<TestComponent />);
    const input = getByTestId('test-input') as HTMLInputElement;

    // Type some initial text
    fireEvent.change(input, { target: { value: 'hello world' } });
    expect(input.value).toBe('hello world');

    // The real test: after typing, if we manually set cursor position
    // and then change the value, the input shouldn't lose that selection
    // This mimics what would happen if parent re-renders
    const originalSetSelectionRange = input.setSelectionRange.bind(input);
    let selectionStartAfterChange: number | null = 0;

    input.setSelectionRange = function (start: number, end: number) {
      selectionStartAfterChange = start;
      originalSetSelectionRange(start, end);
    };

    // Set cursor in the middle
    input.setSelectionRange(5, 5);

    // Type more characters - this updates the parent state and causes a rerender
    fireEvent.change(input, { target: { value: 'hello  world' } });

    // After the rerender (which happens due to setState in the component),
    // the selection start should not have moved to the end
    // With the bug, it would be 12. With the fix, it should be around 5-6
    expect(selectionStartAfterChange).not.toBe(12);
  });
});
