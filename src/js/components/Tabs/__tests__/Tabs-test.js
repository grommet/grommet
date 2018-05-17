import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render, Simulate } from 'react-testing-library';

import { Grommet } from '../../Grommet';

import { Tab, Tabs } from '../';

describe('Tabs', () => {
  test('no Tab', () => {
    const component = renderer.create(
      <Grommet>
        <Tabs />
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Tab', () => {
    const component = renderer.create(
      <Grommet>
        <Tabs>
          <Tab title='Tab 1'>
            Tab body 1
          </Tab>
          {undefined}
          <Tab title='Tab 2'>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('complex title', () => {
    const component = renderer.create(
      <Grommet>
        <Tabs>
          <Tab title={<div>Tab 1</div>}>
            Tab body 1
          </Tab>
          {undefined}
          <Tab title={<div>Tab 2</div>}>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('change to second tab', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Grommet>
        <Tabs onActive={onActive}>
          <Tab title='Tab 1'>
            Tab body 1
          </Tab>
          <Tab title='Tab 2'>
            Tab body 2
          </Tab>
        </Tabs>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Tab 2'));
    expect(onActive).toBeCalled();

    expect(container.firstChild).toMatchSnapshot();
  });

  test('change active index', () => {
    const onActive = jest.fn();
    const { getByText, container } = render(
      <Tabs activeIndex={1} onActive={onActive}>
        <Tab title='Tab 1'>
          Tab body 1
        </Tab>
        <Tab title='Tab 2'>
          Tab body 2
        </Tab>
      </Tabs>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(getByText('Tab 1'));
    expect(onActive).toBeCalledWith(0);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('set on hover', () => {
    const { getByText, container } = render(
      <Tabs>
        <Tab title='Tab 1' onMouseOver={() => {}} onMouseOut={() => {}}>
          Tab body 1
        </Tab>
        <Tab title='Tab 2'>
          Tab body 2
        </Tab>
      </Tabs>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOver(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOver(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOut(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();

    Simulate.mouseOut(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
});
