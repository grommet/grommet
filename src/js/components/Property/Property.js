import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { PropertyListContext } from '../PropertyList/PropertyListContext';

const Property = ({
  children,
  name: nameProp,
  value: valueProp,
  nameProps,
  valueProps,
  ...rest
}) => {
  const { align, direction: contextDirection } =
    useContext(PropertyListContext);
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const direction = contextDirection?.property;

  const column =
    direction === 'column' ||
    direction === 'column-reverse' ||
    size === 'small';

  const Container = column ? Box : Fragment;
  const containerProps = column ? { width: 'medium', ...rest } : undefined;

  let name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number')
    name = (
      <Text
        as="dt"
        textAlign={size !== 'small' ? align?.name : undefined}
        {...theme.property.name}
        {...nameProps}
      >
        {nameProp}
      </Text>
    );
  else
    name = (
      <Box as="dt" margin="none">
        {nameProp}
      </Box>
    );

  let value;
  if (typeof valueProp === 'string' || typeof valueProp === 'number')
    value = (
      <Text
        as="dd"
        textAlign={size !== 'small' ? align?.value : undefined}
        {...theme.property.value}
        {...valueProps}
      >
        {valueProp}
      </Text>
    );
  else if (children || valueProp)
    value = (
      <Box as="dd" margin="none">
        {children}
      </Box>
    );

  const first = direction !== 'column-reverse' ? name : value;
  const second = direction !== 'column-reverse' ? value : name;

  return (
    <Container {...containerProps}>
      {first}
      {second}
    </Container>
  );
};

export { Property };
