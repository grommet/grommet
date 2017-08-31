import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Grommet } from '../../grommet';
import { Drop } from '../';

// TODO: need because of weird bug in jest styled components
import StyledGrommet from '../../grommet/StyledGrommet';

StyledGrommet.displayName = 'StyledGrommet';

class FakeInput extends Component {
  state = {
    showDrop: false,
  }
  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({ showDrop: true });
    /* eslint-enable react/no-did-mount-set-state */
  }
  render() {
    const { inputProps, ...rest } = this.props;
    const { showDrop } = this.state;
    let drop;
    if (showDrop) {
      drop = (
        <Drop control={this.componentRef} {...rest} />
      );
    }
    return (
      <Grommet>
        <input
          ref={(ref) => {
            this.componentRef = ref;
          }}
          {...inputProps}
        />
        {drop}
      </Grommet>
    );
  }
}

test('Drop renders', () => {
  const component = renderer.create(
    <Grommet>
      <Drop />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Drop mounts', () => {
  const component = mount(<FakeInput />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop aligns left right top bottom', () => {
  const component = mount(<FakeInput align={{ left: 'right', top: 'bottom' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop aligns skips left random', () => {
  const component = mount(<FakeInput align={{ left: 'random', bottom: 'bottom' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop aligns right left top top', () => {
  const component = mount(<FakeInput align={{ right: 'left', top: 'top' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop aligns right right bottom top', () => {
  const component = mount(<FakeInput align={{ right: 'right', bottom: 'top' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop aligns skips right random', () => {
  const component = mount(<FakeInput align={{ right: 'random' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop skips invalid align', () => {
  const component = mount(<FakeInput align={{ whatever: 'right' }} />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop closes drop', () => {
  const component = mount(<FakeInput />);
  component.unmount();
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop invokes onClose', () => {
  const onClose = jest.fn();
  mount(<FakeInput onClose={onClose} />);
  global.document.dispatchEvent(new Event('click'));
  expect(onClose).toBeCalled();
});

test('Drop updates', () => {
  const onClose = jest.fn();
  const component = mount(<FakeInput onClose={onClose} />);
  component.setProps({ onClose: undefined });
  expect(toJSON(component)).toMatchSnapshot();
});

test('Drop resizes', () => {
  const component = mount(<FakeInput id='test' />);
  global.window.innerWidth = 1000;
  global.window.innerHeight = 1000;
  global.window.dispatchEvent(new Event('resize'));
  expect(toJSON(component)).toMatchSnapshot();
});
