import React from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';

import { Box } from '../Box';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { Text } from '../Text';
import { focusStyle, genericStyles } from '../../utils';
import { withFocus, withForwardRef } from '../hocs';

const StyledList = styled.ul`
  list-style: none;
  ${props => !props.margin && 'margin: 0;'}
  padding: 0;
  ${genericStyles}
  ${props => props.focus && focusStyle}
`;

const StyledItem = styled(Box)`
  ${props => props.onClick && `cursor: pointer;`}
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
    as,
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
        onClickItem && data && data.length
          ? () => {
              setActive(
                active >= 0 ? Math.min(active + 1, data.length - 1) : 0,
              );
            }
          : undefined
      }
    >
      <StyledList
        ref={ref}
        as={as || 'ul'}
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
              content = children(
                item,
                index,
                onClickItem ? { active: active === index } : undefined,
              );
            } else if (primaryKey) {
              if (typeof primaryKey === 'function') {
                content = primaryKey(item, index);
              } else {
                content = (
                  <Text key="p" weight="bold">
                    {normalize(item, index, primaryKey)}
                  </Text>
                );
              }
              if (secondaryKey) {
                if (typeof secondaryKey === 'function') {
                  content = [content, secondaryKey(item, index)];
                } else {
                  content = [
                    content,
                    <Text key="s">{normalize(item, index, secondaryKey)}</Text>,
                  ];
                }
                boxProps = {
                  direction: 'row',
                  align: 'center',
                  justify: 'between',
                  gap: 'medium',
                };
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
              };
            }

            let adjustedBackground = background || theme.list.item.background;
            if (active === index) {
              adjustedBackground = theme.global.hover.background;
            } else if (Array.isArray(adjustedBackground)) {
              adjustedBackground =
                adjustedBackground[index % adjustedBackground.length];
            }

            let adjustedBorder = border || theme.list.item.border;
            if (adjustedBorder === 'horizontal' && index) {
              adjustedBorder = 'bottom';
            }

            if (itemProps && itemProps[index]) {
              boxProps = { ...boxProps, ...itemProps[index] };
            }

            let clickProps;
            if (onClickItem) {
              clickProps = {
                tabIndex: -1,
                active: active === index,
                onClick: event => {
                  event.persist(); // extract from React's synthetic event pool
                  const adjustedEvent = event;
                  adjustedEvent.item = item;
                  adjustedEvent.index = index;
                  onClickItem(adjustedEvent);
                },
                onMouseOver: () => setActive(index),
                onMouseOut: () => setActive(undefined),
                onFocus: () => setActive(index),
                onBlur: () => setActive(undefined),
              };
            }

            return (
              <StyledItem
                key={index}
                tag="li"
                flex={false}
                pad={pad || theme.list.item.pad}
                background={adjustedBackground}
                border={adjustedBorder}
                {...boxProps}
                {...clickProps}
              >
                {content}
              </StyledItem>
            );
          }}
        </InfiniteScroll>
      </StyledList>
    </Keyboard>
  );
});

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
