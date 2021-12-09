import React, {
  Children,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { CarouselChild } from './CarouselChild';
import { CarouselControls } from './CarouselControls';
import { StyledCarouselContainer } from './StyledCarousel';
import { CarouselPropTypes } from './propTypes';
import { Keyboard } from '../Keyboard';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';

const Carousel = ({
  activeChild,
  wrap,
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
  const containerRef = React.createRef();
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const numSlides = children.length;
  const noDimensions = !fill && (!height || !width);

  const animationDuration = useMemo(
    () =>
      play && play < theme.carousel.animation.duration
        ? play
        : theme.carousel.animation.duration,
    [play, theme.carousel.animation.duration],
  );

  const [current, setCurrent] = useState(activeChild || initialChild);
  const [previous, setPrevious] = useState(undefined);
  const [activeChildState, setActiveChildState] = useState(activeChild);
  const [direction, setDirection] = useState(undefined);
  const [inTransition, setInTransition] = useState(false);
  const [containerProps, setContainerProps] = useState({
    containerHeight: undefined,
    containerWidth: undefined,
  });

  const onPrevious = useCallback(() => {
    if (inTransition) return;
    setDirection('previous');
    setInTransition(true);
    setPrevious(current);
    const next = current === 0 ? numSlides - 1 : current - 1;
    setCurrent(next);
    onChild(next);
  }, [current, numSlides, inTransition, onChild]);

  const onNext = useCallback(() => {
    if (inTransition) return;
    setDirection('next');
    setInTransition(true);
    setPrevious(current);
    const next = current === numSlides - 1 ? 0 : current + 1;
    setCurrent(next);
    onChild(next);
  }, [current, numSlides, inTransition, onChild]);

  const onSelectorNavigation = useCallback(
    (index) => {
      if (current === index) return;
      if (inTransition) return;
      setDirection(index > current ? 'next' : 'previous');
      setInTransition(true);
      setPrevious(current);
      setCurrent(index);
      onChild(index);
    },
    [current, inTransition, onChild],
  );

  const onControlledNavigation = useCallback(() => {
    if (inTransition) return;
    if (activeChild === activeChildState) return;
    if (activeChild === current) return;
    setDirection(activeChild > current ? 'next' : 'previous');
    setInTransition(true);
    setPrevious(current);
    setCurrent(activeChild);
    setActiveChildState(activeChild);
    onChild(activeChild);
  }, [activeChild, activeChildState, current, inTransition, onChild]);

  /**
   * Handles when the "fill" or "height" & "width" props are not specified
   * and no Carousel container is allocated for the slides. On a transition,
   * this calculates the current dimensions of the slide and sets those as the
   * container height and width of the Carousel.
   */

  useEffect(() => {
    if (noDimensions) {
      if (inTransition) {
        const { offsetWidth: currentWidth, offsetHeight: currentHeight } =
          containerRef.current;
        if (currentHeight && currentWidth) {
          setContainerProps({
            containerHeight: currentHeight,
            containerWidth: currentWidth,
          });
        }
      } else {
        setContainerProps({
          containerHeight: undefined,
          containerWidth: undefined,
        });
      }
    }
  // can't depend on containerRef here
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inTransition, noDimensions]);

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
        onNext();
      }, play);
    }
    return () => clearTimeout(playTimer);
  }, [play, onNext]);

  // Allow Carousel slides to be controlled outside the component
  useEffect(() => {
    onControlledNavigation(
      current,
      activeChild,
      activeChildState,
      inTransition,
    );
  }, [
    onControlledNavigation,
    current,
    activeChild,
    activeChildState,
    inTransition,
  ]);

  // Handles when there is only one child
  if (numSlides === undefined)
    return <StyledCarouselContainer>{children}</StyledCarouselContainer>;

  return (
    <Keyboard onLeft={() => onPrevious()} onRight={() => onNext()}>
      <StyledCarouselContainer
        height={height}
        width={width}
        ref={containerRef}
        {...containerProps}
        {...rest}
      >
        <CarouselControls
          wrap={wrap}
          controls={controls}
          current={current}
          inTransition={inTransition}
          onNext={onNext}
          numSlides={numSlides}
          onPrevious={onPrevious}
          onSelectorNavigation={onSelectorNavigation}
        />
        {Children.map(children, (child, index) => (
          <CarouselChild
            index={index}
            animationDuration={animationDuration}
            current={current}
            previous={previous}
            noDimensions={noDimensions}
            direction={direction}
          >
            {child}
          </CarouselChild>
        ))}
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.propTypes = CarouselPropTypes;
Carousel.defaultProps = {
  wrap: false,
  controls: true,
  fill: false,
  initialChild: 0,
  activeChild: undefined,
  onChild: () => {},
};

export { Carousel };
