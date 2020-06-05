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

  test('rerender-default', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open}>
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    rerender(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open}>
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
  });

  test('rerender-vertical', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open} direction="verical">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    rerender(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open} direction="vertical">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
  });

  test('rerender-horizontal', () => {
    const useEffect = jest.fn();
    let open = false;
    const { container, rerender, getByText } = render(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open} direction="horizontal">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Toggle'));
    expect(open).toBe(true);
    rerender(
      <Grommet>
        <Button
          primary
          onClick={() => {
            open = !open;
            useEffect();
          }}
          label="Toggle"
        />
        <Collapsible id="hidden-test" open={open} direction="horizontal">
          <Box>
            <Text>Example</Text>
          </Box>
        </Collapsible>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(useEffect).toBeCalledTimes(1);
  });
});
