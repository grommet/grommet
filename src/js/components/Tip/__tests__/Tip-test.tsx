import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

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
});
