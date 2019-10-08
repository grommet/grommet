import React, { Children, useState, useEffect } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { withFocus } from '../hocs';

const Carousel = ({
  initialChild,
  play: playProps,
  children,
  controls,
  fill,
  focus,
  theme,
  ...rest
}) => {
  let timer;
  const [activeIndex, setActiveIndex] = useState(initialChild);
  const [priorActiveIndex, setPriorActiveIndex] = useState();

  const play = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      const lastIndex = Children.count(children) - 1;
      if (activeIndex < lastIndex) {
        setPriorActiveIndex(activeIndex);
        setActiveIndex(activeIndex + 1);
      } else {
        setPriorActiveIndex(activeIndex);
        setActiveIndex(0);
      }
    }, playProps);
  };

  useEffect(() => {
    if (playProps) {
      play();
    } else {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [playProps]);

  const onRight = () => {
    clearInterval(timer);
    setPriorActiveIndex(activeIndex);
    setActiveIndex(activeIndex + 1);
  };

  const onLeft = () => {
    clearInterval(timer);
    setPriorActiveIndex(activeIndex);
    setActiveIndex(activeIndex - 1);
  };

  const onSelect = index => () => {
    clearInterval(timer);
    setPriorActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  const showArrows = controls && controls !== 'selectors';
  const showSelectors = controls && controls !== 'arrows';
  const lastIndex = Children.count(children) - 1;
  const onLeftAction = activeIndex > 0 ? onLeft : undefined;
  const onRightAction = activeIndex < lastIndex ? onRight : undefined;

  const CurrentIcon = theme.carousel.icons.current;
  const iconColor = normalizeColor(
    theme.carousel.icons.color || 'control',
    theme,
  );

  const selectors = [];
  const wrappedChildren = Children.map(children, (child, index) => {
    selectors.push(
      <Button
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        icon={
          <CurrentIcon color={activeIndex === index ? iconColor : undefined} />
        }
        onClick={onSelect(index)}
      />,
    );

    let animation;
    if (index === activeIndex) {
      if (priorActiveIndex !== undefined) {
        animation = {
          type: priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
          size: 'xlarge',
          duration: theme.carousel.animation.duration,
        };
      }
    } else if (index === priorActiveIndex) {
      animation = {
        type: 'fadeOut',
        duration: theme.carousel.animation.duration,
      };
    } else {
      animation = { type: 'fadeOut', duration: 0 };
    }

    return (
      <Box fill={fill} overflow="hidden">
        <Box fill={fill} animation={animation}>
          {child}
        </Box>
      </Box>
    );
  });

  const NextIcon = theme.carousel.icons.next;
  const PreviousIcon = theme.carousel.icons.previous;
  const nextIconDisabled = activeIndex >= lastIndex;
  const previousIconDisabled = activeIndex <= 0;

  return (
    <Keyboard onLeft={onLeftAction} onRight={onRightAction}>
      <Stack guidingChild={activeIndex} fill={fill} {...rest}>
        {wrappedChildren}
        <Box tabIndex="0" focus={focus} fill direction="row" justify="between">
          {showArrows && (
            <Button
              fill="vertical"
              icon={
                <PreviousIcon
                  color={normalizeColor(
                    previousIconDisabled
                      ? theme.carousel.disabled.icons.color
                      : theme.carousel.icons.color,
                    theme,
                  )}
                />
              }
              plain
              disabled={previousIconDisabled}
              onClick={onLeftAction}
              hoverIndicator
            />
          )}
          {showSelectors && (
            <Box justify="end" fill={!showArrows && 'horizontal'}>
              <Box direction="row" justify="center">
                {selectors}
              </Box>
            </Box>
          )}
          {showArrows && (
            <Button
              fill="vertical"
              icon={
                <NextIcon
                  color={normalizeColor(
                    nextIconDisabled
                      ? theme.carousel.disabled.icons.color
                      : theme.carousel.icons.color,
                    theme,
                  )}
                />
              }
              plain
              disabled={nextIconDisabled}
              onClick={onRightAction}
              hoverIndicator
            />
          )}
        </Box>
      </Stack>
    </Keyboard>
  );
};

Carousel.defaultProps = {
  initialChild: 0,
  controls: true,
};
Object.setPrototypeOf(Carousel.defaultProps, defaultProps);

let CarouselDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CarouselDoc = require('./doc').doc(Carousel);
}
const CarouselWrapper = compose(
  withFocus(),
  withTheme,
)(CarouselDoc || Carousel);

export { CarouselWrapper as Carousel };
