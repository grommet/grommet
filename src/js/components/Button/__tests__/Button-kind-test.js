import React from 'react';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { fireEvent, render, screen } from '@testing-library/react';
import { Add } from 'grommet-icons';

import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from '../../../utils';
import { Grommet, Button, Box } from '../..';
import { buttonKindTheme } from './theme/buttonKindTheme';

describe('Button kind', () => {
  test('should have no accessibility violations', async () => {
    const { container, getByText } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button a11yTitle="Test button" label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('default button', () => {
    const { container } = render(
      <Grommet theme={buttonKindTheme}>
        <Button />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('button with icon and align', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              color: undefined, // needed use case for the test coverage
            },
          },
        }}
      >
        <Button icon={<Add />} align="start" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('button icon colors', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              background: {
                color: '#666666',
              },
              border: {
                color: '#666666',
              },
              color: undefined, // needed use case for the test coverage
            },
          },
        }}
      >
        <Button icon={<Add />} color="#000" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`mouseOver and mouseOut events`, async () => {
    const { container, getByText } = render(
      <Grommet
        theme={{
          button: {
            default: {
              background: '#000',
            },
          },
        }}
      >
        <Button label="label" icon={<Add />} />
      </Grommet>,
    );
    fireEvent.mouseOver(getByText('label'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOut(getByText('label'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('primary button', () => {
    const { container } = render(
      <Grommet theme={buttonKindTheme}>
        <Button primary />
        <Button primary disabled />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary button', () => {
    const { container } = render(
      <Grommet theme={buttonKindTheme}>
        <Button secondary />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border on default button', () => {
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

  test('no border on default button', () => {
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

  test('extend on default button', () => {
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

  test('font on button default', () => {
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

  test('hover on default button', () => {
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

  test('opacity on default button', () => {
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

  test('padding on default button', () => {
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

  test('render of children', () => {
    const { container } = render(
      <Grommet theme={buttonKindTheme}>
        <Button>Test</Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('no padding on default button', () => {
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

  test('size of default button', () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
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
            default: {},
          },
        }}
      >
        <Button label="Test" size="small" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`disabled state cursor should indicate the button cannot be 
  clicked`, () => {
    const { getByText } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button disabled label="Button" />
      </Grommet>,
    );

    const button = getByText('Button');
    // eslint-disable-next-line no-underscore-dangle
    const cursorStyle = window.getComputedStyle(button)._values.cursor;
    expect(cursorStyle).not.toBe('pointer');
    expect(cursorStyle).toBe('default');
  });

  test(`disabled with hoverIndicator should not hover`, () => {
    const { container, getByText } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button disabled hoverIndicator label="Button" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should apply styling according to theme size definitions`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {},
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
              medium: {
                border: {
                  radius: '4px',
                },
                pad: {
                  vertical: '6px',
                  horizontal: '12px',
                },
              },
              large: {
                border: {
                  radius: '6px',
                },
                pad: {
                  vertical: '6px',
                  horizontal: '16px',
                },
              },
            },
          },
        }}
      >
        <Button label="Button" size="small" />
        {/* button with no size specified should have medium styling applied 
        by default */}
        <Button label="Button" />
        <Button label="Button" size="medium" />
        <Button label="Button" size="large" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should be offset from top-right corner`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'border',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button a11yTitle="Button, alert" label="Button" badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display number content`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'border',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button a11yTitle="Button, 2 unread alerts" label="Button" badge={2} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display "+" when number is greater than max`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'border',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button
          a11yTitle="Button, 100 unread alerts"
          label="Button"
          badge={{ value: 100, max: 9 }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should apply background`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'border',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button
          a11yTitle="Button, 100 unread alerts"
          label="Button"
          badge={{
            background: 'status-ok',
            value: 100,
          }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should render custom element`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            default: {
              border: {
                color: 'border',
                width: '2px',
              },
            },
          },
        }}
      >
        <Button
          a11yTitle="Button, Add user alert"
          label="Button"
          badge={<Add />}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should render relative to contents when button has no 
  border or background`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button a11yTitle="Button, Add user alert" icon={<Add />} badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should align to button container if specified in theme`, () => {
    const { container } = render(
      <Grommet
        theme={{
          button: {
            badge: {
              align: 'container',
            },
            default: {
              border: undefined,
            },
          },
        }}
      >
        <Button a11yTitle="Button, alert" label="Button" badge={2} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`hoverIndicator with color and background`, () => {
    const { container, getByText } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button
          hoverIndicator={{
            background: {
              color: 'pink',
            },
            color: 'white',
          }}
          label="Button"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`hover secondary with color and background`, () => {
    const { container, getByText } = render(
      <Grommet
        theme={{
          button: {
            default: {},
            secondary: {
              color: 'white',
              background: {
                color: 'skyblue',
              },
            },
            hover: {
              secondary: {
                color: 'green',
                background: {
                  color: 'orange',
                },
              },
            },
          },
        }}
      >
        <Button secondary label="Button" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`plain with icon`, () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          button: { default: {} },
        }}
      >
        <Button plain icon={<Add />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test(`should apply kind direction`, () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          button: {
            default: {},
            secondary: {
              direction: 'column',
              font: {
                size: 'xsmall',
              },
            },
          },
        }}
      >
        <Button secondary label="Button" icon={<svg />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('icon only pad should apply when icon but no label', () => {
    const { asFragment } = render(
      <Grommet
        theme={{
          button: {
            default: {},
            size: {
              small: {
                pad: {
                  horizontal: '12px',
                  vertical: '5px',
                },
                iconOnly: {
                  pad: '5px',
                },
              },
              medium: {
                pad: {
                  horizontal: '18px',
                  vertical: '8px',
                },
                iconOnly: {
                  pad: {
                    vertical: '8px',
                    horizontal: '12px',
                  },
                },
              },
              large: {
                pad: {
                  horizontal: '24px',
                  vertical: '18px',
                },
                iconOnly: {
                  pad: '18px',
                },
              },
            },
          },
        }}
      >
        <Button icon={<Add />} size="small" />
        <Button label="Add" size="small" />
        <Button icon={<Add />} />
        <Button label="Add" />
        <Button icon={<Add />} size="large" />
        <Button label="Add" size="large" />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('button with transparent background', () => {
    const { asFragment } = render(
      <Grommet
        theme={deepMerge(hpe, {
          button: {
            'background-contrast': {
              background: 'background-contrast',
              color: 'text-strong',
            },
            active: {
              'background-contrast': {
                color: 'text-strong',
              },
            },
          },
        })}
      >
        <Box
          background={{ dark: true, color: 'background' }}
          pad="large"
          gap="medium"
          align="start"
        >
          <Button label="Test button" kind="background-contrast" />
          <Button
            label="Active Test button"
            kind="background-contrast"
            active
          />
        </Box>
        <Box pad="large" gap="medium" align="start">
          <Button label="Test button" kind="background-contrast" />
          <Button
            label="Active Test button"
            kind="background-contrast"
            active
          />
        </Box>
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('match icon size to size prop when theme.icon.matchSize is true', () => {
    const theme = {
      icon: {
        matchSize: true,
      },
      button: {
        default: {},
      },
    };

    const { asFragment } = render(
      <Grommet theme={theme}>
        <Button size="xsmall" label="Label" icon={<Add />} />
        <Button size="small" label="Label" icon={<Add />} />
        <Button label="Label" icon={<Add />} />
        <Button size="large" label="Label" icon={<Add />} />
        <Button size="xlarge" label="Label" icon={<Add />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render pad', () => {
    const theme = {
      button: {
        default: {},
      },
    };

    const { asFragment } = render(
      <Grommet theme={theme}>
        <Button
          data-testid="string-pad"
          label="String pad"
          icon={<Add />}
          pad="xlarge"
        />
        <Button
          data-testid="object-pad"
          label="Object pad"
          icon={<Add />}
          pad={{ horizontal: '18px', vertical: '6px' }}
        />
        {/* should not render pad on plain button */}
        <Button data-testid="child-pad" pad="xlarge">
          <Add />
        </Button>
      </Grommet>,
    );

    const stringPadButton = screen.getByTestId('string-pad');
    const objectPadButton = screen.getByTestId('object-pad');
    const childPadButton = screen.getByTestId('child-pad');
    let style;
    style = window.getComputedStyle(stringPadButton);
    expect(style.padding).toBe('96px');

    style = window.getComputedStyle(objectPadButton);
    expect(style.paddingTop).toBe('6px');
    expect(style.paddingBottom).toBe('6px');
    expect(style.paddingLeft).toBe('18px');
    expect(style.paddingRight).toBe('18px');

    style = window.getComputedStyle(childPadButton);
    expect(style.padding).toBe('0px');

    expect(asFragment()).toMatchSnapshot();
  });
});
