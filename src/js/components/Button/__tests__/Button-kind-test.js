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
// import { buttonKindTheme } from './theme/buttonKindTheme';

describe('Button kind', () => {
  test('should have no accessibility violations', async () => {
    const { container, getByText } = render(
      <Grommet theme={hpe}>
        <Button a11yTitle="Test button" label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('button with icon and align', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button icon={<Add />} align="start" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('button icon colors', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button icon={<Add />} color="#000" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`mouseOver and mouseOut events`, async () => {
    const { container, getByText } = render(
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
        <Button primary />
        <Button primary disabled />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('secondary button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button secondary />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('border on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('no border on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('extend on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" fill />
        <Button label="Test" fill="vertical" />
        <Button label="Test" fill="horizontal" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('font on button default', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('font undefined', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hover on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" plain hoverIndicator onClick={() => {}} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('opacity on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('padding on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('render of children', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button>Test</Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  // Custom theme with intelligentPad set to true
  // const themeWithIntelligentPadTrue = {
  //   button: {
  //     size: {
  //       medium: {
  //         pad: {
  //           horizontal: '10px',
  //           vertical: '10px',
  //         },
  //       },
  //     },
  //     default: {},
  //     secondary: {
  //       border: {
  //         color: 'brand',
  //         width: '2px',
  //       },
  //       color: 'text-strong',
  //       font: {
  //         weight: 600,
  //       },
  //     },
  //   },
  // };

  test('padding is applied correctly when intelligentPad is true', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button secondary label="Test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  // Custom theme with intelligentPad set to false
  const themeWithIntelligentPadFalse = {
    button: {
      size: {
        medium: {
          pad: {
            horizontal: '10px',
            vertical: '10px',
          },
        },
      },
      intelligentPad: false,
      default: {},
      secondary: {
        border: {
          color: 'brand',
          width: '2px',
        },
        color: 'text-strong',
        font: {
          weight: 600,
        },
      },
    },
  };

  test('padding is applied correctly when intelligentPad is false', () => {
    const { container } = render(
      <Grommet theme={themeWithIntelligentPadFalse}>
        <Button secondary label="Test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('no padding on default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('size of default button', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button label="Test" size="small" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`disabled state cursor should indicate the button cannot be 
  clicked`, () => {
    const { getByText } = render(
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
        <Button disabled hoverIndicator label="Button" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should apply styling according to theme size definitions`, () => {
    const { container } = render(
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
        <Button a11yTitle="Button, alert" label="Button" badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display number content`, () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button a11yTitle="Button, 2 unread alerts" label="Button" badge={2} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display "+" when number is greater than max`, () => {
    const { container } = render(
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
        <Button a11yTitle="Button, Add user alert" icon={<Add />} badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should align to button container if specified in theme`, () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Button a11yTitle="Button, alert" label="Button" badge={2} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`hoverIndicator with color and background`, () => {
    const { container, getByText } = render(
      <Grommet theme={hpe}>
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
      <Grommet theme={hpe}>
        <Button secondary label="Button" />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.mouseOver(getByText('Button'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test(`plain with icon`, () => {
    const { asFragment } = render(
      <Grommet theme={hpe}>
        <Button plain icon={<Add />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test(`should apply kind direction`, () => {
    const { asFragment } = render(
      <Grommet theme={hpe}>
        <Button secondary label="Button" icon={<svg />} />
      </Grommet>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('icon only pad should apply when icon but no label', () => {
    const { asFragment } = render(
      <Grommet theme={hpe}>
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
    // const theme = {
    //   icon: {
    //     matchSize: true,
    //   },
    //   button: {
    //     default: {},
    //   },
    // };

    const { asFragment } = render(
      <Grommet theme={hpe}>
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
    // const theme = {
    //   button: {
    //     default: {},
    //   },
    // };

    const { asFragment } = render(
      <Grommet>
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

  test('should render elevation', () => {
    const DEFAULT_ELEVATION = 'inset 3px 0 red';
    const PRIMARY_ELEVATION = 'inset 5px 0 blue';

    const theme = {
      global: {
        elevation: {
          light: {
            'test-elevation': DEFAULT_ELEVATION,
            'test-elevation-primary': PRIMARY_ELEVATION,
          },
          dark: {
            'test-elevation': DEFAULT_ELEVATION,
            'test-elevation-primary': PRIMARY_ELEVATION,
          },
        },
      },
      button: {
        default: {
          elevation: 'test-elevation',
        },
        primary: {
          elevation: 'test-elevation-primary',
        },
        hover: {
          elevation: 'large',
          primary: {
            elevation: 'medium',
          },
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={theme}>
        <Button label="Default" />
        <Button label="Primary" primary />
        {/* should not render elevation on plain button */}
        <Button>Plain</Button>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
