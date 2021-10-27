import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Previous, Next } from 'grommet-icons';
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

const getBorderColor = (dark, index, current) => {
  if (dark) return index === current ? 'white' : '#C0CADC';
  return '#F8F8F8';
};

const getBackgroundColor = (dark, index, current) => {
  if (dark) return index === current ? 'white' : 'transparent';
  return index === current ? 'brand' : 'white';
};

const NewCarousel = ({
  alignSelf,
  a11yTitle,
  children,
  fill,
  dark,
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
      <StyledCarouselContainer
        widthProp={fill ? '100%' : width}
        heightProp={fill ? '100%' : height}
      >
        {children}
      </StyledCarouselContainer>
    );

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
    <StyledCarouselContainer
      theme={theme}
      justify="end"
      background="white"
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

      {/* Bottom: Progress Indicator */}
      <Box
        direction="row"
        gap="xsmall"
        pad={{ vertical: 'xsmall' }}
        alignSelf="center"
        justify="center"
        background={dark ? '#404B5C' : 'white'}
        fill="horizontal"
        align="center"
      >
        {children.map((_, index) => (
          <Box
            round
            width="8px"
            height="8px"
            flex={false}
            border={getBorderColor(dark, index, current)}
            background={getBackgroundColor(dark, index, current)}
          />
        ))}
      </Box>
    </StyledCarouselContainer>
  );
};

NewCarousel.propTypes = NewCarouselPropTypes;

NewCarousel.defaultProps = {
  fill: false,
  dark: false,
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
