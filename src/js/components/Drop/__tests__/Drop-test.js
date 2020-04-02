import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Drop } from '..';

const customTheme = {
  global: {
    drop: {
      shadowSize: 'large',
    },
  },
};

class TestInput extends Component {
  state = {
    showDrop: false,
  };

  inputRef = React.createRef();

  componentDidMount() {
    this.setState({ showDrop: true }); // eslint-disable-line
  }

  render() {
    const {
      inputProps,
      theme,
      elevation,
      containerTarget,
      ...rest
    } = this.props;
    const { showDrop } = this.state;
    let drop;
    if (showDrop) {
      drop = (
        <Drop
          id="drop-node"
          elevation={elevation}
          target={this.inputRef.current}
          {...rest}
        >
          this is a test
        </Drop>
      );
    }
    return (
      <Grommet theme={theme} containerTarget={containerTarget}>
        <input ref={this.inputRef} {...inputProps} />
        {drop}
      </Grommet>
    );
  }
}

describe('Drop', () => {
  afterEach(cleanup);

  test('basic', () => {
    window.scrollTo = jest.fn();
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left right top bottom', () => {
    render(<TestInput align={{ left: 'right', top: 'bottom' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align left left', () => {
    render(<TestInput align={{ left: 'left', bottom: 'bottom' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right left top top', () => {
    render(<TestInput align={{ right: 'left', top: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right bottom top', () => {
    render(<TestInput align={{ right: 'right', bottom: 'top' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('align right right', () => {
    render(<TestInput align={{ right: 'right' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('invalid align', () => {
    render(<TestInput align={{ whatever: 'right' }} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('no stretch', () => {
    render(<TestInput stretch={false} />);

    expectPortal('drop-node').toMatchSnapshot();
  });

  test('close', () => {
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();

    cleanup();
    expect(document.getElementById('drop-node')).toBeNull();
  });

  test('invoke onClickOutside', () => {
    const onClickOutside = jest.fn();
    render(<TestInput onClickOutside={onClickOutside} />);
    expectPortal('drop-node').toMatchSnapshot();

    fireEvent(
      document,
      new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
    );
    expect(onClickOutside).toBeCalled();
  });

  test('resize', () => {
    render(<TestInput />);
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('restrict focus', () => {
    render(<TestInput restrictFocus />);
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();

    cleanup();

    expect(document.activeElement).toMatchSnapshot();
  });

  test('default elevation renders', () => {
    render(<TestInput />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('theme elevation renders', () => {
    render(<TestInput theme={customTheme} />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('props elevation renders', () => {
    render(<TestInput theme={customTheme} elevation="medium" />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('plain renders', () => {
    render(<TestInput plain />);
    expectPortal('drop-node').toMatchSnapshot();
  });

  test('default containerTarget', () => {
    const { getByTestId } = render(<TestInput data-testid="drop" />);
    const actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
    expect(actualRoot).toBe(document.body);
  });

  test('custom containerTarget', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    try {
      const { getByTestId } = render(
        <TestInput data-testid="drop" containerTarget={target} />,
      );
      const actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
      expect(actualRoot).toBe(target);
    } finally {
      document.body.removeChild(target);
    }
  });
});
