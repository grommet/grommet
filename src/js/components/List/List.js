import React from 'react';
import { compose } from 'recompose';
import styled, { css, withTheme } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { backgroundStyle, focusStyle, normalizeColor } from '../../utils';
import { withFocus, withForwardRef } from '../hocs';

const StyledList = styled(Box)`
  list-style: none;
  margin: 0;
  padding: 0;
  ${props => props.focus && focusStyle}
`;

const hoverStyle = css`
  ${props =>
    backgroundStyle(
      normalizeColor(props.theme.global.hover.background, props.theme),
      props.theme,
    )}
  color: ${props =>
    normalizeColor(props.theme.global.hover.color, props.theme)};
`;

const StyledButton = styled(Button)`
  ${props => props.active && hoverStyle}
`;

const normalize = (item, index, property) => {
  if (typeof property === 'function') {
    return property(item, index);
  }
  return item[property];
};

const List = React.forwardRef((props, ref) => {
  const {
    action,
    background,
    border,
    children,
    data,
    focus,
    itemProps,
    pad,
    primaryKey,
    secondaryKey,
    step,
    theme,
    onClickItem,
    onMore,
    ...rest
  } = props;
  const [active, setActive] = React.useState();

  return (
    <Keyboard
      onEnter={
        onClickItem && active >= 0
          ? event => {
              event.persist();
              const adjustedEvent = event;
              adjustedEvent.item = data[active];
              adjustedEvent.index = active;
              onClickItem(adjustedEvent);
            }
          : undefined
      }
      onUp={
        onClickItem && active
          ? () => {
              setActive(active - 1);
            }
          : undefined
      }
      onDown={
        onClickItem && data.length
          ? () => {
              setActive(
                active >= 0 ? Math.min(active + 1, data.length - 1) : 0,
              );
            }
          : undefined
      }
    >
      <StyledList
        as="ol"
        ref={ref}
        tabIndex={onClickItem ? 0 : undefined}
        {...rest}
      >
        <InfiniteScroll
          items={data}
          onMore={onMore}
          scrollableAncestor="window"
          step={step}
          renderMarker={marker => (
            <Box as="li" flex={false}>
              {marker}
            </Box>
          )}
        >
          {(item, index) => {
            let content;
            let boxProps = {};

            if (children) {
              content = children(item);
            } else if (primaryKey) {
              if (secondaryKey) {
                content = [
                  <Text key="p" weight="bold">
                    {normalize(item, index, primaryKey)}
                  </Text>,
                  <Text key="s">{normalize(item, index, secondaryKey)}</Text>,
                ];
                boxProps = {
                  direction: 'row',
                  align: 'center',
                  justify: 'between',
                  gap: 'medium',
                };
              } else {
                content = (
                  <Text key="p" weight="bold">
                    {normalize(item, index, primaryKey)}
                  </Text>
                );
              }
            } else if (typeof item === 'object') {
              content = item[Object.keys(item)[0]];
            } else {
              content = item;
            }

            if (action) {
              content = [
                <Box align="start">{content}</Box>,
                action(item, index),
              ];
              boxProps = {
                direction: 'row',
                align: secondaryKey ? 'start' : 'center',
                justify: 'between',
                gap: 'medium',
                pad: { ...(pad || {}), right: 'small' },
              };
            }

            let adjustedBorder = border;
            if (border === 'horizontal' && index) {
              adjustedBorder = 'bottom';
            }

            if (itemProps && itemProps[index]) {
              boxProps = { ...boxProps, ...itemProps[index] };
            }

            if (onClickItem) {
              content = (
                <Box key={index} as="li" flex={false}>
                  <StyledButton
                    active={active === index}
                    onClick={event => {
                      event.persist(); // extract from React's synthetic event pool
                      const adjustedEvent = event;
                      adjustedEvent.item = item;
                      adjustedEvent.index = index;
                      onClickItem(adjustedEvent);
                    }}
                    onMouseOver={() => setActive(index)}
                    onMouseOut={() => setActive(undefined)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(undefined)}
                  >
                    <Box
                      pad={pad}
                      background={background}
                      border={adjustedBorder}
                      {...boxProps}
                    >
                      {content}
                    </Box>
                  </StyledButton>
                </Box>
              );
            } else {
              content = (
                <Box
                  key={index}
                  as="li"
                  flex={false}
                  pad={pad}
                  background={background}
                  border={adjustedBorder}
                  {...boxProps}
                >
                  {content}
                </Box>
              );
            }
            return content;
          }}
        </InfiniteScroll>
      </StyledList>
    </Keyboard>
  );
});

List.defaultProps = {
  border: 'horizontal',
  pad: { horizontal: 'medium', vertical: 'small' },
};

List.displayName = 'List';

let ListDoc;
if (process.env.NODE_ENV !== 'production') {
  ListDoc = require('./doc').doc(List); // eslint-disable-line global-require
}
const ListWrapper = compose(
  withTheme,
  withFocus(),
  withForwardRef,
)(ListDoc || List);

export { ListWrapper as List };
