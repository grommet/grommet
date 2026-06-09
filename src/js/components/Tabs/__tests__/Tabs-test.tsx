import React from 'react';
import styled, { css } from 'styled-components';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { axe } from 'jest-axe';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  test('supports arrow key navigation between tabs', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
          <Tab title="Tab 3">Tab body 3</Tab>
        </Tabs>
      </Grommet>,
    );

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });

    await user.tab();
    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');

    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab body 2');
  });

  test('supports Home and End keys within the tablist', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
          <Tab title="Tab 3">Tab body 3</Tab>
        </Tabs>
      </Grommet>,
    );

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });

    await user.tab();
    await user.keyboard('{End}');

    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab body 3');

    await user.keyboard('{Home}');

    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab body 1');
  });

  test('skips disabled tabs during keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2" disabled>
            Tab body 2
          </Tab>
          <Tab title="Tab 3">Tab body 3</Tab>
        </Tabs>
      </Grommet>,
    );

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const thirdTab = screen.getByRole('tab', { name: 'Tab 3' });

    await user.tab();
    expect(firstTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');

    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Tab body 3');
  });

  test('associates the active tab with its tabpanel', () => {
    render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    const panel = screen.getByRole('tabpanel');

    expect(firstTab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-label', 'Tab 1 Tab Contents');
  });

  test('uses fallback panel label for icon-only tabs', () => {
    render(
      <Grommet>
        <Tabs>
          <Tab a11yTitle="First tab" icon={<svg />}>
            Tab body 1
          </Tab>
          <Tab a11yTitle="Second tab" icon={<svg />}>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>,
    );

    expect(screen.getByRole('tabpanel')).toHaveAttribute(
      'aria-label',
      '1 Tab Contents',
    );
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

  test('onKeyDown', () => {
    const onKeyDown = jest.fn();

    render(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2" onKeyDown={onKeyDown}>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>,
    );

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
    fireEvent.keyDown(secondTab, { key: 'ArrowLeft' });

    expect(onKeyDown).toHaveBeenCalled();
  });
});
