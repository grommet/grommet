import React, {
  Children,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { CarouselChild } from './CarouselChild';
import { CarouselControls } from './CarouselControls';
import { StyledCarouselContainer } from './StyledCarousel';
import { CarouselPropTypes } from './propTypes';
import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { ResponsiveContext, ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';

const handleOnJumpNavigation =
  ({ setDirection, setCurrent, setPrevious, setInTransition, onChild }) =>
  (current, index, inTransition) => {
    if (inTransition) return;
    setInTransition(true);
    setDirection(index > current ? 'next' : 'previous');
    setPrevious(current);
    setCurrent(index);
    onChild(index);
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
    setInTransition(true);
    setDirection('next');
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
    setInTransition(true);
    setDirection('previous');
    setPrevious(current);
    const next = current === 0 ? numSlides - 1 : current - 1;
    setCurrent(next);
    onChild(next);
  };

const Carousel = ({
  activeChild,
  children,
  controls,
  fill,
  height,
  initialChild,
  onChild,
  play,
  width,
  ...rest
}) => {
  const numSlides = children.length;
  const noContainer = !width && !height && !fill;
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const size = useContext(ResponsiveContext);
  const firstChildRef = useRef(null);

  const [current, setCurrent] = useState(initialChild);
  const [previous, setPrevious] = useState(undefined);
  const [inTransition, setInTransition] = useState(false);
  const [absolute, setAbsolute] = useState(!noContainer);
  const [direction, setDirection] = useState(undefined);
  const [carouselWidth, setCarouselWidth] = useState(undefined);
  const [carouselHeight, setCarouselHeight] = useState(undefined);

  const onJumpNavigation = handleOnJumpNavigation({
    setDirection,
    setCurrent,
    setPrevious,
    setInTransition,
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
        setCarouselWidth(`${childRef.offsetWidth}px`);
        setCarouselHeight(`${childRef.offsetHeight}px`);
        setAbsolute(true);
      }
    } else {
      setCarouselWidth(fill ? '100%' : width);
      setCarouselHeight(fill ? '100%' : height);
    }
  }, [fill, width, height, noContainer, size]);

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
      }, 500);
    }
    return () => clearTimeout(transitionTimer);
  }, [inTransition, setInTransition]);

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

  // Allows Carousel slides to be controlled outside the component
  useEffect(() => {
    if (activeChild !== undefined && activeChild !== current) {
      onJumpNavigation(current, activeChild, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChild]);

  // Handles when there is only one child
  if (numSlides === undefined)
    return (
      <StyledCarouselContainer
        widthProp={carouselWidth}
        heightProp={carouselHeight}
      >
        {children}
      </StyledCarouselContainer>
    );

  return (
    <Keyboard
      onLeft={() => onPrevious(current, inTransition)}
      onRight={() => onNext(current, inTransition)}
    >
      <StyledCarouselContainer
        theme={theme}
        tabIndex={0}
        justify="end"
        overflow="hidden"
        widthProp={carouselWidth}
        heightProp={carouselHeight}
        {...rest}
      >
        <CarouselControls
          controls={controls}
          current={current}
          inTransition={inTransition}
          onNext={onNext}
          numSlides={numSlides}
          onPrevious={onPrevious}
          onJumpNavigation={onJumpNavigation}
        >
          {/* Carousel Slides */}
          <Box
            style={{ position: 'relative' }}
            overflow="hidden"
            direction="row"
            fill
          >
            {Children.map(children, (child, index) => (
              <CarouselChild
                key={`carousel-child-${index + 1}`}
                index={index}
                ref={index === current ? firstChildRef : null}
                absolute={index === current ? absolute : true}
                current={current}
                noContainer={noContainer}
                previous={previous}
                direction={direction}
              >
                {child}
              </CarouselChild>
            ))}
          </Box>
        </CarouselControls>
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.propTypes = CarouselPropTypes;

Carousel.defaultProps = {
  fill: false,
  controls: true,
  initialChild: 0,
  showProgress: false,
  activeChild: undefined,
  onChild: () => {},
};

export { Carousel };
