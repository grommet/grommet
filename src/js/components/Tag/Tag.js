import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FormClose } from 'grommet-icons/icons/FormClose';

import { defaultProps } from '../../default-props';

import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';

import { StyledRemoveButton, StyledTagButton } from './StyledTag';

const Tag = forwardRef(
  ({ name, value, onRemove, onClick, ...rest }, ref) => {

    const theme = useContext(ThemeContext) || defaultProps.theme;

    const contents = (
      <Box
        flex={false}
        pad={theme.tag.padding}
        direction="row"
        gap={theme.tag.gap}
      >
        {name && <Text {...theme.tag.name}>{name}</Text>}
        {name && value && <Text>{theme.tag.separator}</Text>}
        {value && <Text {...theme.tag.value}>{value}</Text>}
      </Box>
    );

    return onRemove || !onClick ? (
      <Box flex={false} ref={ref} {...theme.tag.container} {...rest}>
        {contents}
        {onRemove && (
          <StyledRemoveButton
            onClick={onRemove}
            plain
            hoverIndicator
            focusIndicator
            icon={<FormClose />}
            {...theme.tag.remove}
          />
        )}
      </Box>
    ) : (
      <StyledTagButton
        ref={ref}
        plain
        onClick={onClick} 
        hoverIndicator
        focusIndicator
        flex={false}
        {...theme.tag.container}
        {...rest}
      >
        {contents}
      </StyledTagButton>
    );
  },
);

Tag.displayName = 'Tag';
Tag.prototype = TagPropTypes;

export { Tag };
