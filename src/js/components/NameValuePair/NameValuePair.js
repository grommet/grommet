import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValueListContext } from '../NameValueList/NameValueListContext';

const NameValuePair = ({ children, name: nameProp, ...rest }) => {
  const { nameProps, pairProps, valueProps } = useContext(NameValueListContext);
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const direction = pairProps?.direction;

  const column =
    direction === 'column' ||
    direction === 'column-reverse' ||
    size === 'small';

  const Container = column ? Box : Fragment;
  const containerProps = column
    ? { width: valueProps?.width, ...rest }
    : undefined;

  let name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number')
    name = (
      <Text
        as="dt"
        textAlign={size !== 'small' ? nameProps?.align : undefined}
        {...theme.nameValuePair.name}
      >
        {nameProp}
      </Text>
    );
  else
    name = (
      <Box as="dt" align={size !== 'small' ? nameProps?.align : undefined}>
        {nameProp}
      </Box>
    );

  let value;
  if (typeof children === 'string' || typeof children === 'number')
    value = (
      <Text
        as="dd"
        margin="none"
        textAlign={size !== 'small' ? valueProps?.align : undefined}
        {...theme.nameValuePair.value}
      >
        {children}
      </Text>
    );
  else
    value = (
      <Box
        as="dd"
        margin="none"
        align={size !== 'small' ? valueProps?.align : undefined}
      >
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

export { NameValuePair };
