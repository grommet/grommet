import React, { useContext } from 'react';
import { StyledControl } from './StyledCarousel';
import { CarouselControlsPropTypes } from './propTypes';
import { Button } from '../Button';
import { ThemeContext } from '../../contexts';
import { normalizeColor } from '../../utils';

const CarouselControls = ({
  controls,
  current,
  inTransition,
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
        <StyledControl offset="left" fill="vertical">
          <Button
            plain
            hoverIndicator
            fill="vertical"
            onClick={() => onPrevious(current, inTransition)}
            icon={<PreviousIcon color={arrowColor} />}
          />
        </StyledControl>
      )}

      {/* Next Arrow */}
      {arrowNavigation && (
        <StyledControl offset="right" fill="vertical">
          <Button
            plain
            hoverIndicator
            fill="vertical"
            onClick={() => onNext(current, inTransition)}
            icon={<NextIcon color={arrowColor} />}
          />
        </StyledControl>
      )}

      {/* Selectors */}
      {selectorNavigation && (
        <StyledControl
          offset="bottom"
          direction="row"
          fill="horizontal"
          gap="xsmall"
          pad={{ vertical: 'xsmall' }}
        >
          {Array.from(Array(numSlides).keys()).map((_, index) => (
            <Button
              plain
              hoverIndicator
              key={`control-${index + 1}`}
              onClick={() => onJumpNavigation(current, index, inTransition)}
              icon={
                <SelectorIcon
                  color={current === index ? selectorColor : undefined}
                />
              }
            />
          ))}
        </StyledControl>
      )}
    </>
  );
};

CarouselControls.propTypes = CarouselControlsPropTypes;

export { CarouselControls };
