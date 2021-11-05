import React, { useContext } from 'react';
import { StyledArrow } from './StyledCarousel';
import { CarouselControlsPropTypes } from './propTypes';
import { Button } from '../Button';
import { Box } from '../Box';
import { ThemeContext } from '../../contexts';
import { normalizeColor } from '../../utils';

const CarouselControls = ({
  controls,
  current,
  inTransition,
  children,
  numSlides,
  onNext,
  onPrevious,
  onJumpNavigation,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const arrowNavigation = controls && controls !== 'selectors';
  const selectorNavigation = controls && controls !== 'arrows';

  const SelectorIcon = theme.carousel.icons.current;
  const PreviousIcon = theme.carousel.icons.previous;
  const NextIcon = theme.carousel.icons.next;

  const arrowColor = normalizeColor(theme.carousel.icons.color, theme);
  const selectorColor = normalizeColor(
    theme.carousel.icons.color || 'control',
    theme,
  );

  return (
    <>
      {/* Previous Arrow */}
      {arrowNavigation && (
        <StyledArrow
          plain
          hoverIndicator
          fill="vertical"
          onClick={() => onPrevious(current, inTransition)}
          icon={<PreviousIcon color={arrowColor} />}
        />
      )}

      {/* Carousel Slides */}
      {children}

      {/* Next Arrow */}
      {arrowNavigation && (
        <StyledArrow
          next
          plain
          hoverIndicator
          fill="vertical"
          onClick={() => onNext(current, inTransition)}
          icon={<NextIcon color={arrowColor} />}
        />
      )}

      {/* Selectors */}
      {selectorNavigation && (
        <Box
          direction="row"
          fill="horizontal"
          gap="xsmall"
          align="center"
          justify="center"
          pad={{ vertical: 'xsmall' }}
          style={{ position: 'absolute' }}
        >
          {Array.from(Array(numSlides).keys()).map((_, index) => (
            <Button
              plain
              hoverIndicator
              key={`slide-${index + 1}`}
              onClick={() => onJumpNavigation(current, index, inTransition)}
              icon={
                <SelectorIcon
                  color={current === index ? selectorColor : undefined}
                />
              }
            />
          ))}
        </Box>
      )}
    </>
  );
};

CarouselControls.propTypes = CarouselControlsPropTypes;

export { CarouselControls };
