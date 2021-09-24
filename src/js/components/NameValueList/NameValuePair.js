import React, { Fragment, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

export const NameValuePair = ({
  align,
  data,
  direction,
  nameProps,
  valueProps,
}) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const columnPair = direction === 'column' || size === 'small';

  const Container = columnPair ? Box : Fragment;
  const containerProps = columnPair ? { width: 'medium' } : undefined;

  let name = (
    <Text
      textAlign={size !== 'small' ? align?.name : undefined}
      {...theme.nameValueList.name.text}
      {...nameProps?.text}
    >
      {data?.name}
    </Text>
  );
  if (data?.nameIcon || nameProps?.container) {
    name = (
      <Box
        align={size !== 'small' ? align?.name : undefined}
        {...theme.nameValueList.name.container}
        {...nameProps?.container}
      >
        {data?.nameIcon ? <Box flex={false}>{data?.nameIcon}</Box> : undefined}
        {name}
      </Box>
    );
  }

  let value = (
    <Text
      textAlign={size !== 'small' ? align?.value : undefined}
      {...theme.nameValueList.value.text}
      {...valueProps?.text}
    >
      {data?.value}
    </Text>
  );
  if (data?.valueIcon || valueProps?.container) {
    value = (
      <Box
        align={align?.value}
        {...theme.nameValueList.value.container}
        {...valueProps?.container}
      >
        {data?.valueIcon ? (
          <Box flex={false}>{data?.valueIcon}</Box>
        ) : undefined}
        {value}
      </Box>
    );
  }

  return (
    <Container {...containerProps}>
      {name}
      {value}
    </Container>
  );
};
