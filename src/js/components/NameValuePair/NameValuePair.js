import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { NameValueListContext } from '../NameValueList/NameValueListContext';
import { isSmall } from '../../utils/responsive';

const NameValuePair = ({ children, name: nameProp }) => {
  const { nameProps, pairProps, valueProps } = useContext(NameValueListContext);
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const direction = pairProps?.direction;

  const column =
    direction === 'column' || direction === 'column-reverse' || isSmall(size);

  const Container = column ? Box : Fragment;

  const nameAlign = !isSmall(size) ? nameProps?.align : undefined;
  const valueAlign = !isSmall(size) ? valueProps?.align : undefined;
  // using margin to act as gap
  // <dl> elements must only directly contain
  // properly-ordered <dt> and <dd> groups
  let valueGap;
  if (column && theme.nameValuePair?.column?.gap)
    valueGap = { bottom: theme.nameValuePair.column.gap };

  let name;
  if (typeof nameProp === 'string' || typeof nameProp === 'number')
    name = (
      <Text
        as="dt"
        margin={valueGap}
        textAlign={nameAlign}
        {...theme.nameValuePair.name}
      >
        {nameProp}
      </Text>
    );
  else
    name = (
      <Box as="dt" align={nameAlign}>
        {nameProp}
      </Box>
    );

  let value;
  if (typeof children === 'string' || typeof children === 'number')
    value = (
      // override browser default margin for dd
      <Text
        as="dd"
        margin="none"
        textAlign={valueAlign}
        {...theme.nameValuePair.value}
      >
        {children}
      </Text>
    );
  else
    value = (
      // override browser default margin for dd
      <Box margin="none" as="dd" align={valueAlign}>
        {children}
      </Box>
    );

  const first = direction !== 'column-reverse' ? name : value;
  const second = direction !== 'column-reverse' ? value : name;

  return (
    <Container>
      {first}
      {second}
    </Container>
  );
};

export { NameValuePair };
