import React, {
  Children,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';
import { ThemeContext } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';

import { StyledCarouselContainer, StyledControl } from './StyledCarousel';
import { CarouselChild } from './CarouselChild';
import { CarouselPropTypes } from './propTypes';

const Carousel = ({
  activeChild,
  initialChild,
  onChild,
  play,
  children,
  controls,
  height,
  fill,
  width,
  onFocus,
  onBlur,
  wrap,
  ...rest
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const { format } = useContext(MessageContext);
  const timerRef = useRef();

  const animationDuration = useMemo(
    () =>
      play && play < theme.carousel.animation.duration
        ? play
        : theme.carousel.animation.duration,
    [play, theme.carousel.animation.duration],
  );

  const [indexes, setIndexes] = useState({
    activeIndex: activeChild !== undefined ? activeChild : initialChild,
  });
  const [activeChildState, setActiveChildState] = useState(activeChild);
  const [direction, setDirection] = useState();
  const [inTransition, setInTransition] = useState(false);

  const { activeIndex, priorActiveIndex } = indexes;
  const lastIndex = Children.count(children) - 1;

  const onChildChange = useCallback(
    (index) => {
      if (onChild) {
        onChild(index);
      }
    },
    [onChild],
  );

  const onRight = useCallback(() => {
    if (inTransition) return;
    clearInterval(timerRef.current);
    const nextActiveIndex = activeIndex < lastIndex ? activeIndex + 1 : 0;
    setIndexes({
      activeIndex: nextActiveIndex,
      priorActiveIndex: activeIndex,
    });
    setInTransition(true);
    setDirection('left');
    onChildChange(nextActiveIndex);
  }, [activeIndex, inTransition, lastIndex, onChildChange]);

  const onLeft = useCallback(() => {
    if (inTransition) return;
    clearInterval(timerRef.current);
    const nextActiveIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    setIndexes({
      activeIndex: nextActiveIndex,
      priorActiveIndex: activeIndex,
    });
    setInTransition(true);
    setDirection('right');
    onChildChange(nextActiveIndex);
  }, [activeIndex, inTransition, lastIndex, onChildChange]);

  const onSelect = useCallback(
    (index) => () => {
      if (!inTransition && activeIndex !== index) {
        clearInterval(timerRef.current);
        setIndexes({ activeIndex: index, priorActiveIndex: activeIndex });
        setInTransition(true);
        setDirection(index > activeIndex ? 'left' : 'right');
        onChildChange(index);
      }
    },
    [activeIndex, inTransition, onChildChange],
  );

  const onControlledNavigation = useCallback(() => {
    if (
      inTransition ||
      activeChild === activeChildState ||
      activeChild === activeIndex ||
      activeChild === undefined ||
      activeChild < 0 ||
      activeChild > lastIndex
    )
      return;
    setDirection(activeChild > activeIndex ? 'left' : 'right');
    setInTransition(true);
    setIndexes({ activeIndex: activeChild, priorActiveIndex: activeIndex });
    setActiveChildState(activeChild);
    onChildChange(activeChild);
  }, [
    activeChild,
    activeChildState,
    activeIndex,
    inTransition,
    lastIndex,
    onChildChange,
  ]);

  /**
   * Delays the transitions between Carousel slides. This is needed to
   * avoid users "spamming" the controls which results in jarring animations
   * and a bad user experience.
   */
  useEffect(() => {
    let transitionTimer;
    if (inTransition) {
      transitionTimer = setTimeout(() => {
        setInTransition(false);
      }, animationDuration);
    }
    return () => clearTimeout(transitionTimer);
  }, [inTransition, setInTransition, animationDuration]);

  // Handles auto-playing Carousel slides
  useEffect(() => {
    // stop playing if wrap is explicitly false and we're at the end
    if (play && (wrap !== false || activeIndex < lastIndex)) {
      const timer = setInterval(() => {
        const nextActiveIndex = activeIndex < lastIndex ? activeIndex + 1 : 0;
        setIndexes({
          activeIndex: nextActiveIndex,
          priorActiveIndex: activeIndex,
        });
        setInTransition(true);
        setDirection('left');
        onChildChange(nextActiveIndex);
      }, play);

      timerRef.current = timer;

      return () => {
        clearTimeout(timer);
      };
    }
    return () => {};
  }, [activeIndex, play, children, lastIndex, onChildChange, wrap]);

  // Allow Carousel slides to be controlled outside the component
  useEffect(() => {
    onControlledNavigation(
      activeIndex,
      activeChild,
      activeChildState,
      inTransition,
    );
  }, [
    onControlledNavigation,
    activeIndex,
    activeChild,
    activeChildState,
    inTransition,
  ]);

  const showArrows = controls && controls !== 'selectors';
  const showSelectors = controls && controls !== 'arrows';

  const CurrentIcon = theme.carousel.icons.current;
  const iconColor = normalizeColor(
    theme.carousel.icons.color || 'control',
    theme,
  );

  const selectors = [];
  const wrappedChildren = Children.map(children, (child, index) => {
    selectors.push(
      <Button
        a11yTitle={format({
          id: 'carousel.jump',
          values: { slide: index + 1 },
        })}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        icon={
          <CurrentIcon color={activeIndex === index ? iconColor : undefined} />
        }
        onClick={onSelect(index)}
      />,
    );

    return (
      <CarouselChild
        animationDuration={animationDuration}
        fill={fill || !!height || !!width}
        index={index}
        activeIndex={activeIndex}
        priorActiveIndex={priorActiveIndex}
        direction={direction}
      >
        {child}
      </CarouselChild>
    );
  });

  const NextIcon = theme.carousel.icons.next;
  const PreviousIcon = theme.carousel.icons.previous;
  const nextIconDisabled = !wrap && activeIndex >= lastIndex;
  const previousIconDisabled = !wrap && activeIndex <= 0;

  return (
    <Keyboard onLeft={onLeft} onRight={onRight}>
      <StyledCarouselContainer
        fill={fill}
        height={height}
        width={width}
        {...rest}
      >
        {showArrows && (
          <StyledControl offsetProp="left" fill="vertical">
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
              a11yTitle={format({
                id: 'carousel.previous',
                values: { slide: activeIndex },
              })}
              plain
              disabled={previousIconDisabled}
              onClick={onLeft}
              hoverIndicator
            />
          </StyledControl>
        )}
        {wrappedChildren}
        {showSelectors && (
          <StyledControl offsetProp="bottom" fill="horizontal">
            <Box justify="end" fill={!showArrows && 'horizontal'}>
              <Box direction="row" justify="center">
                {selectors}
              </Box>
            </Box>
          </StyledControl>
        )}
        {showArrows && (
          <StyledControl offsetProp="right" fill="vertical">
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
              a11yTitle={format({
                id: 'carousel.next',
                values: { slide: activeIndex + 2 },
              })}
              plain
              disabled={nextIconDisabled}
              onClick={onRight}
              hoverIndicator
            />
          </StyledControl>
        )}
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.defaultProps = {
  initialChild: 0,
  controls: true,
};
Object.setPrototypeOf(Carousel.defaultProps, defaultProps);
Carousel.displayName = 'Carousel';

Carousel.propTypes = CarouselPropTypes;

export { Carousel };
