import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FormClose } from 'grommet-icons/icons/FormClose';

import { defaultProps } from '../../default-props';

import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';
import { Tip } from '../Tip';

import { StyledRemoveButton, StyledTagButton } from './StyledTag';

const Tag = forwardRef(
  (
    {
      name,
      value,
      size,
      truncate,
      truncateNumChars = 16,
      onRemove,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const containerProps = {
      ref,
      align: 'center',
      background: theme.tag.background,
      border: theme.tag.border,
      round: theme.tag.size?.[size]?.round || theme.tag.round,
      ...rest,
    };
    const displayName =
      truncate && name.length > truncateNumChars
        ? `${name.substring(0, truncateNumChars - 3)}...`
        : name;
    const displayValue =
      truncate && value.length > truncateNumChars
        ? `${value.substring(0, truncateNumChars - 3)}...`
        : value;
    const tipValue1 = value.length < 128 ? value : value.substring(0, 128);
    const tipValue2 = value.length < 128 ? '' : value.substring(128);
    const shouldDisplayTip =
      truncate &&
      (name.length > truncateNumChars || value.length > truncateNumChars);
    const tipContent = (
      <Box direction="column">
        <Text size={size}>{`${name} : `}</Text>
        {tipValue1 && (
          <Text weight="bold" size={size}>
            {tipValue1}
          </Text>
        )}
        {tipValue2 && (
          <Text weight="bold" size={size}>
            {tipValue2}
          </Text>
        )}
      </Box>
    );

    const textContent = (
      <Box
        width={{ min: 'min-content', max: '100%' }}
        pad={theme.tag.size?.[size]?.pad || theme.tag.pad}
      >
        <Text size={size}>
          {name && (
            <Text {...theme.tag.name} size={size}>
              {' '}
              {displayName}
            </Text>
          )}
          {name && value ? <Text size={size}>{theme.tag.separator}</Text> : ''}
          {value && (
            <Text {...theme.tag.value} size={size}>
              {displayValue}
            </Text>
          )}
        </Text>
      </Box>
    );
    const contents = shouldDisplayTip ? (
      <Tip content={tipContent}>{textContent}</Tip>
    ) : (
      textContent
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
