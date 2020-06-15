import React from 'react';

import 'jest-styled-components';

import { cleanup, render } from '@testing-library/react';
import { Grommet, Button } from '../..';
import { customTheme } from '../Button-kind-theme';

describe('Button kind', () => {
  afterEach(cleanup);

  test('custom theme', () => {
    const { container } = render(
      <Grommet theme={customTheme}>
        <Button default />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'green',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('no border', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: false,
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('extend', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              extend: {
                color: 'green',
              },
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button label="Test" fill />
        <Button label="Test" fill="vertical" />
        <Button label="Test" fill="horizontal" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('font', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              font: {
                weight: 700,
                height: '20px',
              },
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('font undefined', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              font: {
                weight: undefined,
                height: undefined,
              },
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hover', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              hover: {
                color: 'white',
                background: 'green',
              },
            },
          },
        }}
      >
        <Button label="Test" plain hoverIndicator onClick={() => {}} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('opacity', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              opacity: true,
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('padding', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              padding: {
                horizontal: '12px',
                vertical: '6px',
              },
              background: {
                color: 'green',
              },
              color: 'text',
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('no padding', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              padding: '0px',
              color: 'text',
              border: {
                color: false,
              },
            },
          },
        }}
      >
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('size', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              size: {
                small: {
                  border: {
                    radius: '4px',
                  },
                  pad: {
                    vertical: '4px',
                    horizontal: '8px',
                  },
                },
              },
            },
          },
        }}
      >
        <Button label="Test" size="small" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
