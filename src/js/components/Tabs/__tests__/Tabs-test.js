import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/react';

import { Grommet, Tab, Tabs } from '../..';

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
    const component = renderer.create(
      <Grommet>
        <Tabs>
          <Tab />
        </Tabs>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Tab', () => {
    const component = renderer.create(
      <Grommet>
        <Tabs>
          <Tab title="Tab 1">Tab body 1</Tab>
          {undefined}
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('complex title', () => {
    const component = renderer.create(
      <Grommet>
        <Tabs>
          <Tab title={<div>Tab 1</div>}>Tab body 1</Tab>
          {undefined}
          <Tab title={<div>Tab 2</div>}>Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('with icon + reverse', () => {
    const component = renderer.create(
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
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('alignControls', () => {
    const component = renderer.create(
      <Grommet full>
        <Tabs alignControls="center">
          <Tab title="Tab 1">Tab body 1</Tab>
          <Tab title="Tab 2">Tab body 2</Tab>
        </Tabs>
      </Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
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
    expect(onActive).toBeCalledWith(1);

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

    const disabledTab = getByText('Disabled Tab').parentElement;
    const disabledTabStyle = window.getComputedStyle(disabledTab);
    expect(disabledTabStyle.color).toBe(disabledTextColor);
    expect(disabledTabStyle.borderBottomColor).toBe(disabledBorderBottomColor);
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

    const disabledTab = getByText('Disabled Tab').parentElement;
    const disabledTabStyle = window.getComputedStyle(disabledTab);
    expect(disabledTabStyle.color).toBe(disabledTextColor);
    expect(disabledTabStyle.borderBottomColor).toBe(disabledBorderBottomColor);
  });
});
