import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';

import 'jest-styled-components';

import { mnet, defaultProps, extendDefaultTheme, Box, MnetUIBase } from '..';

const CustomBox = styled.div`
  background: ${props => props.theme.global.colors.brand};
`;
CustomBox.defaultProps = {};
Object.setPrototypeOf(CustomBox.defaultProps, defaultProps);

test('default theme is used', () => {
  const component = renderer.create(<Box background="brand" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('extends default theme', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  const component = renderer.create(<Box background="brand" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('extends default theme twice', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  let component = renderer.create(<Box background="brand" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  extendDefaultTheme({ global: { colors: { brand: 'blue' } } });

  component = renderer.create(<Box background="brand" />);
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('uses mnet theme instead of default', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  const component = renderer.create(
    <MnetUIBase theme={mnet}>
      <Box background="brand" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('leverages default theme', () => {
  extendDefaultTheme({ global: { colors: { brand: 'red' } } });
  const component = renderer.create(<CustomBox />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
