import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ThemeContext } from 'styled-components';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { defaultProps } from '../../default-props';
import { TagPropTypes } from './propTypes';
import { Box } from '../Box';
import { Text } from '../Text';
import { Tip } from '../Tip';

import { StyledRemoveButton, StyledTagButton } from './StyledTag';

const Tag = forwardRef(
  ({ name, value, size, truncate, onRemove, onClick, ...rest }, ref) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const textContainerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);
    const PADDING_DEFAULT = 96;
    const MAX_NAME_LENGTH = 128;

    const containerProps = {
      ref,
      align: 'center',
      background: theme.tag.background,
      border: theme.tag.border,
      round: theme.tag.size?.[size]?.round || theme.tag.round,
      ...rest,
    };

    useEffect(() => {
      const updateTagWidth = () => {
        setContainerWidth(textContainerRef?.current?.offsetParent?.clientWidth);
        setTextWidth(textContainerRef?.current?.clientWidth);
      };
      updateTagWidth();
      window.addEventListener('resize', updateTagWidth);
    }, [textContainerRef]);

    const tipValue1 =
      value.length < MAX_NAME_LENGTH
        ? value
        : value.substring(0, MAX_NAME_LENGTH);
    const tipValue2 =
      value.length < MAX_NAME_LENGTH ? '' : value.substring(MAX_NAME_LENGTH);

    const shouldTruncate = textWidth >= containerWidth - PADDING_DEFAULT;
    const shouldDisplayTip = truncate === 'tip' && shouldTruncate;

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
        direction="row"
        ref={textContainerRef}
        width={{ max: `${containerWidth - PADDING_DEFAULT}px` }}
        pad={theme.tag.size?.[size]?.pad || theme.tag.pad}
        overflow="hidden"
      >
        {name && (
          <Text {...theme.tag.name} size={size} truncate={shouldTruncate}>
            {' '}
            {name}
          </Text>
        )}
        {name && value ? <Text size={size}>{theme.tag.separator}</Text> : ''}
        {value && (
          <Text {...theme.tag.value} size={size} truncate={shouldTruncate}>
            {value}
          </Text>
        )}
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
