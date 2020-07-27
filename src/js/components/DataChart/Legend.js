import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Swatch } from './Swatch';

const Legend = ({
  activeProperty,
  series: seriesProp,
  seriesStyles,
  setActiveProperty,
}) => {
  const series = useMemo(
    () => seriesProp.filter(s => seriesStyles[s.property]),
    [seriesProp, seriesStyles],
  );
  const interactive = useMemo(() => Object.keys(series).length > 1, [series]);
  return (
    <Box margin={{ top: 'small' }} direction="row" wrap>
      {series.map(({ property, label }) => {
        const isActive = property === activeProperty;
        const swatchProps = {};
        const textProps = {};
        if (activeProperty !== undefined) {
          if (!isActive) {
            // swatchProps.color = 'status-disabled';
            textProps.color = 'text-xweak';
          } else {
            textProps.color = 'text-strong';
          }
        }
        return (
          <Button
            key={property}
            active={isActive}
            onClick={
              interactive
                ? () => {
                    setActiveProperty(isActive ? undefined : property);
                  }
                : undefined
            }
            hoverIndicator
            margin={{ right: 'small' }}
          >
            <Box
              direction="row"
              align="center"
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              gap="xsmall"
            >
              <Swatch {...seriesStyles[property]} {...swatchProps} />
              <Text {...textProps}>{label || property}</Text>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
};

export { Legend };
