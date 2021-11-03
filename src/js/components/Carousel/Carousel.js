import React, {
  Children,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';
import { Previous, Next, Radial, RadialSelected } from 'grommet-icons';
import { CarouselChild } from './CarouselChild';
import { CarouselPropTypes } from './propTypes';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { widthStyle, heightStyle } from '../../utils';

const StyledDot = styled(Button)`
  border-radius: 50%;
  &:hover {
    background-color: #ffffff80;
  }
`;

const StyledControl = styled(Button)`
  z-index: 1;
  transition-timing-function: ease-in-out;
  background-color: #ffffff99;
  border-radius: 50%;
  &:hover {
    transition: 0.3s;
    background-color: #ffffffe6;
  }
`;

const StyledCarouselContainer = styled(Box)`
  ${(props) => props.heightProp && heightStyle(props.heightProp, props.theme)}
  ${(props) => props.widthProp && widthStyle(props.widthProp, props.theme)}
`;

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
  progress,
  initialChild,
  showProgress,
  onChild,
  play,
  width,
  ...rest
}) => {
  const noContainer = !width && !height && !fill;
  const numSlides = children.length;
  const arrowNavigation = controls && controls !== 'selectors';
  const jumpNavigation = controls && controls !== 'arrows';
  const theme = useContext(ThemeContext) || defaultProps.theme;

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
  }, []);

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
  }, [activeChild]);

  // Handles when there is only one child
  if (numSlides === undefined)
    return (
      <StyledCarouselContainer
        widthProp={fill ? '100%' : width}
        heightProp={fill ? '100%' : height}
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
        style={{ position: 'relative' }}
        {...rest}
      >
        {/* Previous Arrow */}
        {arrowNavigation && (
          <Box
            pad={{ horizontal: 'small' }}
            style={{ position: 'absolute' }}
            width="48px"
            justify="center"
            align="center"
            fill="vertical"
          >
            <StyledControl
              icon={<Previous color="black" size="small" />}
              onClick={() => onPrevious(current, inTransition)}
            />
          </Box>
        )}

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
              absolute={absolute}
              current={current}
              previous={previous}
              direction={direction}
            >
              {child}
            </CarouselChild>
          ))}
        </Box>

        {/* Next Arrow */}
        {arrowNavigation && (
          <Box
            width="48px"
            pad={{ horizontal: 'small' }}
            style={{ position: 'absolute', left: `calc(100% - 48px)` }}
            justify="center"
            align="center"
            fill="vertical"
          >
            <StyledControl
              onClick={() => onNext(current, inTransition)}
              icon={<Next color="black" size="small" />}
            />
          </Box>
        )}

        {/* Selector / Jump Navigation */}
        {jumpNavigation && (
          <Box
            direction="row"
            fill="horizontal"
            justify="center"
            gap="small"
            pad={!progress && 'xsmall'}
            style={{
              position: 'absolute',
              top: progress && `calc(100% - 40px)`,
            }}
          >
            {children.map((child, index) => (
              <StyledDot
                plain
                key={`slide-${index + 1}`}
                onClick={() => onJumpNavigation(current, index, inTransition)}
                icon={
                  current === index ? (
                    <RadialSelected color="brand" size="small" />
                  ) : (
                    <Radial color="dark-3" size="small" />
                  )
                }
              />
            ))}
          </Box>
        )}

        {/* Progress Indicator */}
        {showProgress && (
          <Box
            direction="row"
            gap="xsmall"
            pad={{ vertical: 'xsmall' }}
            alignSelf="center"
            justify="center"
            fill="horizontal"
            align="center"
          >
            {children.map((_, index) => (
              <Box
                round
                width="8px"
                height="8px"
                flex={false}
                border={{ color: 'dark-3' }}
                background={index === current ? 'brand' : 'white'}
              />
            ))}
          </Box>
        )}
      </StyledCarouselContainer>
    </Keyboard>
  );
};

Carousel.propTypes = CarouselPropTypes;

Carousel.defaultProps = {
  fill: false,
  controls: true,
  onChild: () => {},
  initialChild: 0,
  showProgress: false,
  activeChild: undefined,
};

export { Carousel };
