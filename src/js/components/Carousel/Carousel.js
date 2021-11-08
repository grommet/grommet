import React, { Children, useRef, useState, useEffect } from 'react';
import { CarouselChild } from './CarouselChild';
import { CarouselControls } from './CarouselControls';
import { StyledCarouselContainer } from './StyledCarousel';
import { CarouselPropTypes } from './propTypes';
import { Keyboard } from '../Keyboard';

const handleOnJumpNavigation =
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
  children,
  controls,
  height,
  fill,
  width,
  initialChild,
  onChild,
  play,
}) => {
  const noContainer = !fill && !height && !width;
  const numSlides = children.length;
  const firstChildRef = useRef(null);
  const [current, setCurrent] = useState(initialChild);
  const [previous, setPrevious] = useState(undefined);
  const [containerProps, setContainerProps] = useState({
    heightProp: height,
    widthProp: width,
  });
  const [direction, setDirection] = useState(undefined);
  const [inTransition, setInTransition] = useState(false);
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
    if (
      noContainer &&
      (containerProps.heightProp === undefined ||
        containerProps.widthProp === undefined)
    ) {
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
    return <StyledCarouselContainer>{children}</StyledCarouselContainer>;

  return (
    <Keyboard
      onLeft={() => onPrevious(current, inTransition)}
      onRight={() => onNext(current, inTransition)}
    >
      <StyledCarouselContainer {...containerProps}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <CarouselControls
            controls={controls}
            current={current}
            inTransition={inTransition}
            onNext={onNext}
            numSlides={numSlides}
            onPrevious={onPrevious}
            onJumpNavigation={onJumpNavigation}
          />
          {Children.map(children, (child, index) => (
            <CarouselChild
              key={`carousel-child-${index + 1}`}
              index={index}
              ref={index === current ? firstChildRef : null}
              current={current}
              previous={previous}
              direction={direction}
            >
              {child}
            </CarouselChild>
          ))}
        </div>
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.propTypes = CarouselPropTypes;
Carousel.defaultProps = {
  fill: false,
  controls: true,
  initialChild: 0,
  activeChild: undefined,
  onChild: () => {},
};

export { Carousel };
