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

  test('default', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible open={open}>
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(false);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(2);
  });

  test('vertical', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible open={open} direction="vertical">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(false);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(2);
  });

  test('horizontal', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible open={open} direction="horizontal">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(false);
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(2);
  });
});
