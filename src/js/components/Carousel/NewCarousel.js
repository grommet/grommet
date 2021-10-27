import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Previous, Radial, RadialSelected, Next } from 'grommet-icons';
import { NewCarouselChild } from './NewCarouselChild';
import { NewCarouselPropTypes } from './propTypes';
import { Box } from '../Box';
import { Button } from '../Button';
import { ThemeContext } from '../../contexts';
import { defaultProps } from '../../default-props';
import { widthStyle, heightStyle } from '../../utils';

const StyledControl = styled(Button)`
  z-index: 1;
  transition-timing-function: ease-in-out;
  background-color: #ffffff99;
  &:hover {
    transition: 0.3s;
    background-color: #ffffffe6;
  }
`;

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

const handleDotNavigation =
  ({ setDirection, setCurrent, setPrevious, setInTransition, onChild }) =>
  (current, index, inTransition) => {
    if (inTransition) return;
    setInTransition(true);
    setDirection(index < current ? 'previous' : 'next');
    setPrevious(current);
    setCurrent(index);
    onChild(index);
  };

const StyledContainer = styled(Box)`
  ${(props) => props.heightProp && heightStyle(props.heightProp, props.theme)}
  ${(props) => props.widthProp && widthStyle(props.widthProp, props.theme)}
`;

const NewCarousel = ({
  alignSelf,
  a11yTitle,
  children,
  controls,
  fill,
  gridArea,
  height,
  initialChild,
  onChild,
  margin,
  width,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const [current, setCurrent] = useState(initialChild);
  const [inTransition, setInTransition] = useState(false);
  const [direction, setDirection] = useState(undefined);
  const [previous, setPrevious] = useState(undefined);

  const numSlides = children.length;

  useEffect(() => {
    let transitionTimer;
    if (inTransition) {
      transitionTimer = setTimeout(() => {
        setInTransition(false);
      }, 500);
    }
    return () => clearTimeout(transitionTimer);
  }, [inTransition, setInTransition]);

  // Handles when there is only one child
  if (numSlides === undefined)
    return (
      <StyledContainer
        widthProp={fill ? '100%' : width}
        heightProp={fill ? '100%' : height}
      >
        {children}
      </StyledContainer>
    );

  const arrowNavigation = !controls || controls === 'arrow';
  const dotNavigation = !controls || controls === 'dot';

  const onDotNavigation = handleDotNavigation({
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

  return (
    <StyledContainer
      theme={theme}
      justify="end"
      overflow="hidden"
      widthProp={fill ? '100%' : width}
      heightProp={fill ? '100%' : height}
      margin={margin}
      a11yTitle={a11yTitle}
      gridArea={gridArea && gridArea}
      alignSelf={alignSelf && alignSelf}
      style={{ position: 'relative' }}
    >
      {/* Left: Previous Arrow */}
      {arrowNavigation && (
        <Box
          width="45px"
          style={{ position: 'absolute' }}
          justify="center"
          align="center"
          fill="vertical"
        >
          <StyledControl
            icon={<Previous />}
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
          width="45px"
          style={{ position: 'absolute', left: `calc(100% - 45px)` }}
          justify="center"
          align="center"
          fill="vertical"
        >
          <StyledControl
            onClick={() => onNext(current, inTransition)}
            icon={<Next />}
          />
        </Box>
      )}

      {/* Bottom: Dot Navigation */}
      {dotNavigation && (
        <Box
          style={{ position: 'absolute' }}
          direction="row"
          alignSelf="center"
          justify="center"
          align="center"
        >
          {children.map((_, index) => (
            <StyledControl
              key={`slide-${index + 1}`}
              onClick={() => onDotNavigation(current, index, inTransition)}
              icon={
                current === index ? (
                  <RadialSelected color="black" size="small" />
                ) : (
                  <Radial color="black" size="small" />
                )
              }
            />
          ))}
        </Box>
      )}
    </StyledContainer>
  );
};

NewCarousel.propTypes = NewCarouselPropTypes;

NewCarousel.defaultProps = {
  fill: false,
  controls: undefined,
  gridArea: undefined,
  alignSelf: undefined,
  a11yTitle: '',
  height: {},
  width: {},
  margin: {},
  onChild: () => {},
  initialChild: 0,
};

export { NewCarousel };
