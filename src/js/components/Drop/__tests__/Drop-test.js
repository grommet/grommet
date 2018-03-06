import React, { Component } from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Drop } from '../';

Enzyme.configure({ adapter: new Adapter() });

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
        <Drop id='drop-node' target={this.inputRef} {...rest}>
          this is a test
        </Drop>
      );
    }
    return (
      <Grommet>
        <input
          ref={(ref) => {
            this.inputRef = ref;
          }}
          {...inputProps}
        />
        {drop}
      </Grommet>
    );
  }
}

describe('Drop', () => {
  beforeEach(createPortal);

  test('mounts', () => {
    mount(
      <FakeInput />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns left right top bottom', () => {
    mount(
      <FakeInput align={{ left: 'right', top: 'bottom' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns right right bottom top', () => {
    mount(
      <FakeInput align={{ right: 'right', bottom: 'top' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns skips left random', () => {
    mount(
      <FakeInput align={{ left: 'random', bottom: 'bottom' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns right left top top', () => {
    mount(
      <FakeInput align={{ right: 'left', top: 'top' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns right right bottom top', () => {
    mount(
      <FakeInput align={{ right: 'right', bottom: 'top' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('aligns skips right random', () => {
    mount(
      <FakeInput align={{ right: 'random' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('skips invalid align', () => {
    mount(
      <FakeInput align={{ whatever: 'right' }} />, {
        attachTo: document.body.firstChild,
      }
    );

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('closes drop', () => {
    const component = mount(<FakeInput />, {
      attachTo: document.body.firstChild,
    });
    component.unmount();
    expect(document.getElementById('drop-node')).toBeNull();
  });

  test('invokes onClickOutside', () => {
    const onClickOutside = jest.fn();
    mount(<FakeInput onClickOutside={onClickOutside} />);
    global.document.dispatchEvent(new Event('click'));
    expect(onClickOutside).toBeCalled();
  });

  test('updates', () => {
    const onClickOutside = jest.fn();
    const component = mount(<FakeInput onClickOutside={onClickOutside} />);
    component.setProps({ onClickOutside: undefined });
    expect(component.getDOMNode()).toMatchSnapshot();
  });

  test('resizes', () => {
    mount(<FakeInput id='test' />, {
      attachTo: document.body.firstChild,
    });
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    global.window.dispatchEvent(new Event('resize'));
    expectPortal('test').toMatchSnapshot();
  });

  test('restrict focus', () => {
    const component = mount(<FakeInput restrictFocus={true} />);

    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();

    component.unmount();

    expect(document.activeElement).toMatchSnapshot();
  });
});
