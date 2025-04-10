import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Box } from '../../Box';
import { Button } from '../../Button';
import { Grommet } from '../../Grommet';
import { Tip } from '..';

describe('Tip', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Tip content="tooltip content"> Example</Tip>
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders outside grommet wrapper', async () => {
    const { container } = render(<Tip content="tooltip content"> Example</Tip>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`mouseOver and mouseOut events on the Tip's child`, async () => {
    const { getByText } = render(
      <Grommet>
        <Tip
          content={
            <Box id="tooltip-id" data-testid="tooltip">
              tooltip
            </Box>
          }
        >
          Test Events
        </Tip>
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Test Events'));
    const tooltip = await waitFor(() => screen.getByText('tooltip'));
    expect(document.getElementById('tooltip-id')).not.toBeNull();
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();

    fireEvent.mouseOut(getByText('Test Events'));
    expect(document.getElementById('tooltip-id')).toBeNull();
  });

  test(`focus and blur events on the Tip's child`, async () => {
    const { container, getByText } = render(
      <Grommet>
        <Tip content="tooltip">
          <Button label="Test Events" />
        </Tip>
      </Grommet>,
    );

    fireEvent.focus(getByText('Test Events'));
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.blur(getByText('Test Events'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('plain', async () => {
    const { getByText } = render(
      <Grommet>
        <Tip plain content="tooltip">
          Example
        </Tip>
      </Grommet>,
    );

    // Styles of plain are captured in snapshots only when applying mouseOver
    fireEvent.mouseOver(getByText('Example'));
    const tooltip = await waitFor(() => screen.getByText('tooltip'));
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
  });

  test('themed', async () => {
    const { getByText } = render(
      <Grommet
        theme={{
          tip: {
            drop: {
              background: 'brand',
              elevation: 'large',
              margin: '21px',
            },
          },
        }}
      >
        <Tip content="tooltip">Example</Tip>
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Example'));
    const tooltip = await waitFor(() => screen.getByText('tooltip'));
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
  });

  test(`dropProps should pass props to Drop`, async () => {
    const { getByText } = render(
      <Grommet>
        <Tip
          dropProps={{
            plain: false, // should display box-shadow
          }}
          content="hello dropProps"
        >
          Test dropProps
        </Tip>
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Test dropProps'));
    const tooltip = await waitFor(() => screen.getByText('hello dropProps'));
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
  });

  test(`should work with a child that isn't a React Element`, () => {
    const { container } = render(
      <Grommet>
        <Tip content="Hello">Not React Element</Tip>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`shouldn't crash with no children`, () => {
    const { container } = render(
      <Grommet>
        <Tip />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`throw error with more than one child`, () => {
    console.error = jest.fn();
    expect(() => {
      render(
        <Grommet>
          <Tip>
            <Box>1</Box>
            <Box>2</Box>
          </Tip>
        </Grommet>,
      );
    }).toThrow(
      `React.Children.only expected to receive a single React element child.`,
    );
  });

  test(`throw error with more than one non React Element`, () => {
    console.error = jest.fn();
    expect(() => {
      render(
        <Grommet>
          <Tip>123 {false}</Tip>
        </Grommet>,
      );
    }).toThrow(
      `React.Children.only expected to receive a single React element child.`,
    );
  });

  test(`call child mouse and focus functions`, async () => {
    const user = userEvent.setup();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    render(
      <Grommet>
        <Tip content="tip info">
          <Button
            label="Button label"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </Tip>
      </Grommet>,
    );
    await user.hover(screen.getByText('Button label'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    await user.unhover(screen.getByText('Button label'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test(`should be visible by default`, async () => {
    const { getByText } = render(
      <Grommet>
        <Tip content="tooltip" defaultVisible>
          Default Visible
        </Tip>
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Default Visible'));
    const tooltip = await waitFor(() => screen.getByText('tooltip'));
    expect(tooltip?.parentNode?.parentNode).toMatchSnapshot();
  });

  test('pressing Escape key closes tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Grommet>
        <Tip content="tooltip text">
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const button = screen.getByText('Hover me');
    expect(button).toBeInTheDocument();

    // Tab to the button
    await user.tab();
    expect(button).toHaveFocus();
    await waitFor(() => {
      expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    });

    // pressing the Escape key
    fireEvent.keyDown(document, { key: 'Escape', keyCode: 27 });

    await waitFor(() => {
      expect(screen.queryByText('tooltip text')).not.toBeInTheDocument();
    });
  });

  test(`Scenario 1: Combined margin should apply between the target and the tip,
       theme.tip.content.margin should apply to remaining sides`, async () => {
    render(
      <Grommet
        theme={{
          global: {
            drop: {
              intelligentMargin: true,
              margin: '10px',
            },
          },
          tip: {
            content: {
              margin: '5px',
            },
          },
        }}
      >
        <Tip defaultVisible content="tooltip text">
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const tooltip = screen.getByText('tooltip text');
    expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    expect(tooltip).toHaveStyle('margin: 15px 5px 5px 5px');
  });

  test(`Scenario 2: Combined margin should apply to all sides
     when intelligentMargin is false`, async () => {
    render(
      <Grommet
        theme={{
          global: {
            drop: {
              intelligentMargin: false,
              margin: '10px',
            },
          },
          tip: {
            content: {
              margin: '5px',
            },
          },
        }}
      >
        <Tip defaultVisible content="tooltip text">
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const tooltip = screen.getByText('tooltip text');
    expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    expect(tooltip).toHaveStyle('margin: 15px 15px 15px 15px');
  });

  test(`Scenario 3: Combined margin should apply to all theme-defined sides
     when theme.tip.content.margin is an object`, async () => {
    render(
      <Grommet
        theme={{
          global: {
            drop: {
              intelligentMargin: false,
              margin: 'small',
            },
          },
          tip: {
            content: {
              margin: { top: '5px', right: '7px', bottom: '5px', left: '7px' },
            },
          },
        }}
      >
        <Tip defaultVisible content="tooltip text">
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const tooltip = screen.getByText('tooltip text');
    expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    expect(tooltip).toHaveStyle('margin: 17px 19px 17px 19px');
  });

  test(`Scenario 4: Combined margin should only apply between the target
     and the tip, theme.tip.content.margin should apply to
     remaining theme-defined sides`, async () => {
    render(
      <Grommet
        theme={{
          global: {
            drop: {
              intelligentMargin: true,
              margin: 'small',
            },
          },
          tip: {
            content: {
              margin: {
                top: 'small',
                right: 'xsmall',
                bottom: 'small',
                left: 'xsmall',
              },
            },
          },
        }}
      >
        <Tip defaultVisible content="tooltip text">
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const tooltip = screen.getByText('tooltip text');
    expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    expect(tooltip).toHaveStyle('margin: 24px 6px 12px 6px');
  });
  test(`Scenario 4: Combined margin should only apply between the target
    and the tip, theme.tip.content.margin should apply to
    remaining theme-defined sides`, async () => {
    render(
      <Grommet
        theme={{
          global: {
            drop: {
              intelligentMargin: true,
              margin: 'small',
            },
          },
        }}
      >
        <Tip
          dropProps={{ margin: 'large' }}
          defaultVisible
          content="tooltip text"
        >
          <button>Hover me</button>
        </Tip>
      </Grommet>,
    );

    const tooltip = screen.getByText('tooltip text');
    expect(screen.queryByText('tooltip text')).toBeInTheDocument();
    expect(tooltip).toHaveStyle('margin: 54px 54px 54px 54px');
  });
});
