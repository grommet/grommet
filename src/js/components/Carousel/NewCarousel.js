import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Previous, Next, Radial, RadialSelected } from 'grommet-icons';
import { NewCarouselChild } from './NewCarouselChild';
import { NewCarouselPropTypes } from './propTypes';
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

const NewCarousel = ({
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
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [current, setCurrent] = useState(initialChild);
  const [inTransition, setInTransition] = useState(false);
  const [direction, setDirection] = useState(undefined);
  const [previous, setPrevious] = useState(undefined);
  const numSlides = children.length;

  const arrowNavigation = controls && controls !== 'selectors';
  const jumpNavigation = controls && controls !== 'arrows';

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

  useEffect(() => {
    let transitionTimer;
    if (inTransition) {
      transitionTimer = setTimeout(() => {
        setInTransition(false);
      }, 500);
    }
    return () => clearTimeout(transitionTimer);
  }, [inTransition, setInTransition]);

  useEffect(() => {
    let playTimer;
    if (play) {
      playTimer = setInterval(() => {
        onNext(current, inTransition);
      }, play);
    }
    return () => clearTimeout(playTimer);
  }, [current, inTransition, play, onNext]);

  useEffect(() => {
    if (activeChild && activeChild !== current) {
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
        widthProp={fill ? '100%' : width}
        heightProp={fill ? '100%' : height}
        style={{ position: 'relative' }}
        {...rest}
      >
        {/* Left: Previous Arrow */}
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
          {React.Children.map(children, (child, index) => (
            <NewCarouselChild
              index={index}
              key={`child-${index + 1}`}
              current={current}
              previous={previous}
              direction={direction}
            >
              {child}
            </NewCarouselChild>
          ))}
        </Box>

        {/* Right: Next Arrow */}
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

        {/* Bottom: Progress Indicator */}
        {progress && (
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

NewCarousel.propTypes = NewCarouselPropTypes;

NewCarousel.defaultProps = {
  fill: false,
  controls: true,
  onChild: () => {},
  initialChild: 0,
  progress: false,
  activeChild: undefined,
};

export { NewCarousel };
