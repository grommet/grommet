import React, { forwardRef } from 'react';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';

import { StyledRemoveButton, StyledTagButton } from './StyledTag';
import { useThemeValue } from '../../utils/useThemeValue';

const Tag = forwardRef(
  ({ name, value, size = 'medium', onRemove, onClick, ...rest }, ref) => {
    const { theme, passThemeFlag } = useThemeValue();
    const RemoveIcon = theme.tag.icons?.remove || FormClose;

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
            icon={<RemoveIcon {...theme.tag.size?.[size]?.icon} />}
            round={theme.tag.size?.[size]?.round || theme.tag.round}
            {...theme.tag.remove}
            {...passThemeFlag}
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
        {...passThemeFlag}
      >
        {contents}
      </StyledTagButton>
    );
  },
);

Tag.displayName = 'Tag';
Tag.prototype = TagPropTypes;

export { Tag };
