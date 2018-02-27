import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { findAllByType } from '../../../utils';
import { Grommet } from '../../Grommet';

import { Tab, Tabs } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('Tabs renders without Tab', () => {
  const component = renderer.create(
    <Grommet>
      <Tabs />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tabs renders with Tab', () => {
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
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tabs renders complex Tab title', () => {
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
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tabs changes to second tab', () => {
  const onActive = jest.fn();
  const component = renderer.create(
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

  const tree = component.toJSON();

  const button = findAllByType(tree, 'button');
  button[1].props.onClick();
  expect(onActive).toBeCalled();

  expect(component.toJSON()).toMatchSnapshot();
});

test('Tabs changes active index', () => {
  const onActive = jest.fn();
  const component = mount(
    <Tabs activeIndex={1} onActive={onActive}>
      <Tab title='Tab 1'>
        Tab body 1
      </Tab>
      <Tab title='Tab 2'>
        Tab body 2
      </Tab>
    </Tabs>
  );

  component.find('button').first().simulate('click');
  expect(onActive).toBeCalledWith(0);

  component.setProps({ activeIndex: 0 });

  expect(component.getDOMNode()).toMatchSnapshot();
});

test('Tabs sets on hover', () => {
  const component = mount(
    <Tabs>
      <Tab title='Tab 1' onMouseOver={() => {}} onMouseOut={() => {}}>
        Tab body 1
      </Tab>
      <Tab title='Tab 2'>
        Tab body 2
      </Tab>
    </Tabs>
  );

  component.find('button').first().simulate('mouseOver');
  expect(component.getDOMNode()).toMatchSnapshot();

  component.find('button').last().simulate('mouseOver');
  expect(component.getDOMNode()).toMatchSnapshot();

  component.find('button').first().simulate('mouseOut');
  expect(component.getDOMNode()).toMatchSnapshot();

  component.find('button').last().simulate('mouseOut');
  expect(component.getDOMNode()).toMatchSnapshot();
});
