import React from 'react';
import { render } from '@testing-library/react';
import styled from 'styled-components';

import 'jest-styled-components';

import { grommet, defaultProps, extendDefaultTheme, Box, Grommet } from '..';

const CustomBox = styled.div`
  background: ${(props) => props.theme.global.colors.brand};
`;
CustomBox.defaultProps = {};
Object.setPrototypeOf(CustomBox.defaultProps, defaultProps);

test('default theme is used', () => {
  const { container } = render(<Box background="brand" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('extends default theme', () => {
  extendDefaultTheme({ global: { colors: { brand: '#ff0000' } } });
  const { container } = render(<Box background="brand" />);

  expect(container.firstChild).toMatchSnapshot();
});

test('extends default theme twice', () => {
  extendDefaultTheme({ global: { colors: { brand: '#ff0000' } } });
  const { rerender, asFragment } = render(<Box background="brand" />);

  expect(asFragment()).toMatchSnapshot();

  extendDefaultTheme({ global: { colors: { brand: '#0000ff' } } });
  rerender(<Box background="brand" />);

  expect(asFragment()).toMatchSnapshot();
});

test('uses Grommet theme instead of default', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  const { container } = render(
    <Grommet theme={grommet}>
      <Box background="brand" />
    </Grommet>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

test('leverages default theme', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  const { container } = render(<CustomBox />);

  expect(container.firstChild).toMatchSnapshot();
});
