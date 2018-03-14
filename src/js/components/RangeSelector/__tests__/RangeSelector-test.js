import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Grommet } from '../../Grommet';
import { RangeSelector } from '../';

Enzyme.configure({ adapter: new Adapter() });

test('renders', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders color', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector color='accent-1' values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders direction', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector direction='horizontal' values={[20, 30]} />
      <RangeSelector direction='vertical' values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders invert', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector invert={true} values={[20, 30]} />
      <RangeSelector invert={false} values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders max', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector max={50} values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders min', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector min={10} values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders opacity', () => {
  const component = renderer.create(
    <Grommet>
      {['weak', 'medium', 'strong'].map(opacity => (
        <RangeSelector key={opacity} opacity={opacity} values={[20, 30]} />
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders round', () => {
  const component = renderer.create(
    <Grommet>
      {['xsmall', 'small', 'medium', 'large', 'full'].map(round => (
        <RangeSelector key={round} round={round} values={[20, 30]} />
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders size', () => {
  const component = renderer.create(
    <Grommet>
      {['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(size => (
        <RangeSelector key={size} size={size} values={[20, 30]} />
      ))}
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders step', () => {
  const component = renderer.create(
    <Grommet>
      <RangeSelector step={10} values={[20, 30]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('handles keyboard', () => {
  const onChange = jest.fn();
  const component = mount(
    <Grommet>
      <RangeSelector values={[20, 30]} onChange={onChange} />
    </Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
  const lowerControl = component.find('[aria-label="Lower Bounds"]').first();
  lowerControl.simulate('keydown', { key: 'Left', keyCode: 37 });
  expect(onChange).toBeCalled();
  lowerControl.simulate('keydown', { key: 'Right', keyCode: 39 });
  expect(onChange).toBeCalled();
  const upperControl = component.find('[aria-label="Upper Bounds"]').first();
  upperControl.simulate('keydown', { key: 'Right', keyCode: 39 });
  expect(onChange).toBeCalled();
  upperControl.simulate('keydown', { key: 'Left', keyCode: 37 });
  expect(onChange).toBeCalled();
});

test('handles mouse', () => {
  const onChange = jest.fn();
  const component = mount(
    <Grommet>
      <RangeSelector values={[20, 30]} onChange={onChange} />
    </Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();
  component.find('div').at(1)
    .simulate('click', { clientX: 0, clientY: 0 });
  expect(onChange).toBeCalled();
  const map = {};
  window.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
  component.find('[aria-label="Lower Bounds"]').first()
    .simulate('mousedown');
  map.mousemove({ clientX: 0, clientY: 0 });
  expect(onChange).toBeCalled();
  map.mouseup();
  component.find('[aria-label="Upper Bounds"]').first()
    .simulate('mousedown');
  map.mousemove({ clientX: 0, clientY: 0 });
  expect(onChange).toBeCalled();
  map.mouseup();
});
