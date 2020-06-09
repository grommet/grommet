import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { Collapsible } from '..';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  afterEach(cleanup);

  test('open', () => {
    const { container } = render(
      <Grommet>
        <Collapsible open>
          <Box background="dark-1">Box Body</Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick open default', () => {
    const collapseOnClick = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Expand'));
    expect(open).toBe(true);
    rerender(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open}>
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(collapseOnClick).toBeCalledTimes(1);
  });

  test('direction vertical', () => {
    const collapseOnClick = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open} direction="vertical">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Expand'));
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open} direction="vertical">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(collapseOnClick).toBeCalledTimes(1);
  });

  test('direction horizontal', () => {
    const collapseOnClick = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open} direction="horizontal">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Expand'));
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(
      <Grommet>
        <Button
          onClick={() => {
            open = !open;
            collapseOnClick();
          }}
          label="Expand"
        />
        <Collapsible open={open} direction="horizontal">
          <Text>Example</Text>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(collapseOnClick).toBeCalledTimes(1);
  });
});
