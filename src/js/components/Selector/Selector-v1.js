import React, { forwardRef, useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { CheckBox } from '../CheckBox';
import { RadioButton } from '../RadioButton';
import { useForwardedRef } from '../../utils';
import { SelectorPropTypes } from './propTypes';
import { SelectorGroupContext } from '../SelectorGroup/SelectorGroup';

const Selector = forwardRef(({ children, title, description, icon }, ref) => {
  const theme = useContext(ThemeContext);
  const { multiple } = useContext(SelectorGroupContext);
  const componentRef = useForwardedRef(ref);

  return (
    // TO DO, should we add `round` to button?
    <Button>
      <Box
        ref={componentRef}
        border
        cssGap
        gap="medium"
        pad="small"
        round="xsmall"
      >
        <Box cssGap direction="row" gap="small" align="start">
          <Box cssGap direction="row" gap="small" flex>
            {icon || undefined}
            <Box gap="xsmall" cssGap>
              {title ? <Text weight={500}>{title}</Text> : undefined}
              {description ? (
                <Text size="small">{description}</Text>
              ) : undefined}
              {/* TO DO where should children go? should it fully replace
                title, description, etc?
              */}
            </Box>
          </Box>
          {/* TO DO ability to hide when not selected */}
          {multiple ? (
            <CheckBox pad="none" tabIndex={-1} />
          ) : (
            // TO DO how to overcome pad from extend in single selection?
            <RadioButton pad="none" tabIndex={-1} />
          )}
        </Box>
        {children}
      </Box>
    </Button>
  );
});

Selector.displayName = 'Selector';
Selector.propTypes = SelectorPropTypes;

export { Selector };
