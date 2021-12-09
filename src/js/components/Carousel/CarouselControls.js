import React, { useContext } from 'react';
import { StyledControl } from './StyledCarousel';
import { CarouselControlsPropTypes } from './propTypes';
import { Button } from '../Button';
import { ThemeContext } from '../../contexts';
import { MessageContext } from '../../contexts/MessageContext';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const CarouselControls = ({
  controls,
  current,
  numSlides,
  onNext,
  onPrevious,
  onSelectorNavigation,
  wrap,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  const { format } = useContext(MessageContext);
  const arrowNavigation = controls && controls !== 'selectors';
  const selectorNavigation = controls && controls !== 'arrows';

  const SelectorIcon = theme.carousel.icons.current;
  const PreviousIcon = theme.carousel.icons.previous;
  const NextIcon = theme.carousel.icons.next;

  const nextIconDisabled = !wrap && current + 1 === numSlides;
  const previousIconDisabled = !wrap && current === 0;

  const selectorColor = normalizeColor(
    theme.carousel.icons.color || 'control',
    theme,
  );

  return (
    <>
      {/* Previous Arrow */}
      {arrowNavigation && (
        <StyledControl offsetProp="left" fill="vertical">
          <Button
            plain
            hoverIndicator
            fill="vertical"
            a11yTitle={
              format({
                id: 'carousel.previous',
                values: { slide: current },
              })
            }
            onClick={onPrevious}
            disabled={previousIconDisabled}
            icon={
              <PreviousIcon
                color={normalizeColor(
                  previousIconDisabled
                    ? theme.carousel.disabled.icons.color
                    : theme.carousel.icons.color,
                  theme,
                )}
              />
            }
          />
        </StyledControl>
      )}

      {/* Next Arrow */}
      {arrowNavigation && (
        <StyledControl offsetProp="right" fill="vertical">
          <Button
            plain
            hoverIndicator
            fill="vertical"
            a11yTitle={  
              format({
                id: 'carousel.next',
                values: { slide: current + 2 },
              })
            }
            onClick={onNext}
            disabled={nextIconDisabled}
            icon={
              <NextIcon
                color={normalizeColor(
                  nextIconDisabled
                    ? theme.carousel.disabled.icons.color
                    : theme.carousel.icons.color,
                  theme,
                )}
              />
            }
          />
        </StyledControl>
      )}

      {/* Selectors */}
      {selectorNavigation && (
        <StyledControl
          offsetProp="bottom"
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
              a11yTitle={
                format({
                  id: 'carousel.jump',
                  values: { slide: index + 1 },
                })
              }
              onClick={() => onSelectorNavigation(index)}
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
