import React, { useMemo } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { Swatch } from './Swatch';

const Legend = ({
  activeProperty,
  properties: propertiesProp,
  propertyStyles,
  setActiveProperty,
}) => {
  const properties = useMemo(
    () => Object.values(propertiesProp).filter(p => propertyStyles[p.property]),
    [propertiesProp, propertyStyles],
  );
  const interactive = useMemo(() => Object.keys(properties).length > 1, [
    properties,
  ]);
  return (
    <Box
      gridArea="legend"
      margin={{ top: 'small' }}
      direction="row"
      gap="small"
    >
      {properties.map(({ property, label }) => {
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
          >
            <Box
              direction="row"
              align="center"
              pad={{ horizontal: 'small', vertical: 'xsmall' }}
              gap="xsmall"
            >
              <Swatch {...propertyStyles[property]} {...swatchProps} />
              <Text {...textProps}>{label || property}</Text>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
};

export { Legend };
