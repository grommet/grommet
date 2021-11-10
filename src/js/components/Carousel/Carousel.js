import React, {
  Children,
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import { CarouselChild } from './CarouselChild';
import { CarouselControls } from './CarouselControls';
import {
  StyledCarouselContainer,
  StyledCarouselInnerContainer,
} from './StyledCarousel';
import { CarouselPropTypes } from './propTypes';
import { Keyboard } from '../Keyboard';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';

const handleSelectorNavigation =
  ({ setDirection, setCurrent, setInTransition, setPrevious, onChild }) =>
  (current, index, inTransition) => {
    if (current === index) return;
    if (inTransition) return;
    setDirection(index > current ? 'next' : 'previous');
    setInTransition(true);
    setPrevious(current);
    setCurrent(index);
    onChild(index);
  };

const handleControlledNavigation =
  ({
    setCurrent,
    setPrevious,
    setDirection,
    setInTransition,
    setActiveChildState,
    onChild,
  }) =>
  (current, activeChild, activeChildState) => {
    if (activeChild === activeChildState) return;
    if (activeChild === current) return;
    setDirection(activeChild > current ? 'next' : 'previous');
    setInTransition(true);
    setPrevious(current);
    setCurrent(activeChild);
    setActiveChildState(activeChild);
    onChild(activeChild);
  };

const handleOnNext =
  ({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    numSlides,
    onChild,
  }) =>
  (current, inTransition) => {
    if (inTransition) return;
    setDirection('next');
    setInTransition(true);
    setPrevious(current);
    const next = current === numSlides - 1 ? 0 : current + 1;
    setCurrent(next);
    onChild(next);
  };

const handleOnPrevious =
  ({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    numSlides,
    onChild,
  }) =>
  (current, inTransition) => {
    if (inTransition) return;
    setDirection('previous');
    setInTransition(true);
    setPrevious(current);
    const next = current === 0 ? numSlides - 1 : current - 1;
    setCurrent(next);
    onChild(next);
  };

const Carousel = ({
  activeChild,
  continuous,
  children,
  controls,
  height,
  fill,
  width,
  initialChild,
  onChild,
  play,
  ...rest
}) => {
  const firstChildRef = useRef(null);
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const numSlides = children.length;
  const noContainer = !fill && (!height || !width);
  const animationDuration =
    play && play < theme.carousel.animation.duration
      ? play
      : theme.carousel.animation.duration;

  const [current, setCurrent] = useState(activeChild || initialChild);
  const [previous, setPrevious] = useState(undefined);
  const [activeChildState, setActiveChildState] = useState(activeChild);
  const [direction, setDirection] = useState(undefined);
  const [inTransition, setInTransition] = useState(false);
  const [containerProps, setContainerProps] = useState({
    heightProp: height,
    widthProp: width,
  });

  const onSelectorNavigation = handleSelectorNavigation({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    onChild,
  });
  const onControlledNavigation = handleControlledNavigation({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    setActiveChildState,
    onChild,
  });
  const onNext = handleOnNext({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    numSlides,
    onChild,
  });
  const onPrevious = handleOnPrevious({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
    numSlides,
    onChild,
  });

  /**
   * Handles when the "fill" or "height" & "width" props are not specified
   * and no Carousel container is allocated for the slides. This renders
   * the first active child to expand to the given height and width it
   * needs and then dynamically reads those values to set as the fixed
   * dimensions of the Carousel container.
   */
  useEffect(() => {
    if (noContainer) {
      const { current: childRef } = firstChildRef;
      if (childRef) {
        if (childRef.offsetWidth > 0 && childRef.offsetHeight > 0) {
          setContainerProps({
            heightProp: `${childRef.offsetHeight}px`,
            widthProp: `${childRef.offsetWidth}px`,
          });
        } else setContainerProps({});
      }
    } else {
      setContainerProps({
        heightProp: fill ? '100%' : height,
        widthProp: fill ? '100%' : width,
      });
    }
  }, [noContainer, fill, height, width]);

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
    let playTimer;
    if (play) {
      playTimer = setInterval(() => {
        onNext(current, inTransition);
      }, play);
    }
    return () => clearTimeout(playTimer);
  }, [current, inTransition, play, onNext]);

  // Allow Carousel slides to be controlled outside the component
  useEffect(() => {
    onControlledNavigation(current, activeChild, activeChildState);
  }, [onControlledNavigation, current, activeChild, activeChildState]);

  // Handles when there is only one child
  if (numSlides === undefined)
    return <StyledCarouselContainer>{children}</StyledCarouselContainer>;

  return (
    <Keyboard
      onLeft={() => onPrevious(current, inTransition)}
      onRight={() => onNext(current, inTransition)}
    >
      <StyledCarouselContainer {...containerProps} {...rest}>
        <StyledCarouselInnerContainer>
          <CarouselControls
            continuous={continuous}
            controls={controls}
            current={current}
            inTransition={inTransition}
            onNext={onNext}
            numSlides={numSlides}
            onPrevious={onPrevious}
            onJumpNavigation={onSelectorNavigation}
          />
          {Children.map(children, (child, index) => (
            <CarouselChild
              index={index}
              animationDuration={animationDuration}
              ref={index === current ? firstChildRef : null}
              current={current}
              previous={previous}
              direction={direction}
            >
              {child}
            </CarouselChild>
          ))}
        </StyledCarouselInnerContainer>
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.propTypes = CarouselPropTypes;
Carousel.defaultProps = {
  continuous: false,
  controls: true,
  fill: false,
  initialChild: 0,
  activeChild: undefined,
  onChild: () => {},
};

export { Carousel };
