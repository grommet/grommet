import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FormClose } from 'grommet-icons/icons/FormClose';

import { defaultProps } from '../../default-props';

import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';

import { StyledRemoveButton, StyledTagButton } from './StyledTag';

const Tag = forwardRef(
  ({ name, value, size, onRemove, onClick, ...rest }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;

    const containerProps = {
      ref,
      align: 'center',
      background: theme.tag.background,
      border: theme.tag.border,
      round: theme.tag.size?.[size]?.round || theme.tag.round,
      ...rest,
    };
    const contents = (
      <Box
        width={{ min: 'min-content' }}
        pad={theme.tag.size?.[size]?.pad || theme.tag.pad}
      >
        <Text size={size}>
          {name && (
            <Text {...theme.tag.name} size={size}>
              {' '}
              {name}
            </Text>
          )}
          {name && value ? <Text size={size}>{theme.tag.separator}</Text> : ''}
          {value && (
            <Text {...theme.tag.value} size={size}>
              {value}
            </Text>
          )}
        </Text>
      </Box>
    );

    if (onClick && onRemove) {
      console.warn('Tag cannot combine "onClick" and "onRemove".');
    }

    return onRemove || !onClick ? (
      <Box
        flex={false}
        direction="row"
        width={{ min: 'min-content' }}
        {...containerProps}
      >
        {contents}
        {onRemove && (
          <StyledRemoveButton
            onClick={onRemove}
            plain
            hoverIndicator
            focusIndicator
            icon={<FormClose {...theme.tag.size?.[size]?.icon} />}
            round={theme.tag.size?.[size]?.round || theme.tag.round}
            {...theme.tag.remove}
          />
        )}
      </Box>
    ) : (
      <StyledTagButton
        flex={false}
        plain
        onClick={onClick}
        hoverIndicator
        focusIndicator
        {...containerProps}
      >
        {contents}
      </StyledTagButton>
    );
  },
);

Tag.displayName = 'Tag';
Tag.prototype = TagPropTypes;

export { Tag };
