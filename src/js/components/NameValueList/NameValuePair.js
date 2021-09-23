import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

export const NameValuePair = ({
  data,
  layout,
  pairProps,
  nameProps,
  valueProps,
  align,
}) => {
  // based on the layout prop we would style accordingly
  // Should we base gap on theme ?
  // const theme = useContext(ThemeContext) || defaultProps.theme;
  const layoutDirection = layout === 'vertical' ? 'row' : 'column';
  return (
    <Box
      direction={layoutDirection}
      gap={layout === 'vertical' ? 'large' : 'small'}
      {...pairProps}
    >
      <Box>
        <Box
          direction="row"
          gap="small"
          width="small"
          // user can overid the set props with theme
          {...nameProps?.container}
        >
          {data.nameVisual}
          <Text
            textAlign={align?.name}
            weight="bold"
            color="text-strong"
            {...nameProps?.text}
          >
            {data.name}
          </Text>
        </Box>
      </Box>
      <Box fill>
        <Box
          direction="row"
          gap="small"
          width={{ max: 'medium' }}
          flex
          justify={align?.value}
          {...valueProps?.container}
        >
          {/* how should we name the "visual" that can accompany? */}
          {data.valueVisual}
          <Text
            textAlign={align?.value}
            color="text-strong"
            {...valueProps?.text}
          >
            {data.value}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
