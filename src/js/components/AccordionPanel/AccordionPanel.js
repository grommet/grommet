import React, { forwardRef, useContext, useMemo, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { normalizeColor } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { Collapsible } from '../Collapsible';
import { Heading } from '../Heading';

const AccordionPanel = forwardRef(
  (
    {
      active,
      animate,
      children,
      header,
      label,
      onClick,
      onMouseOut,
      onMouseOver,
      onPanelChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [hover, setHover] = useState(undefined);

    const iconColor = useMemo(
      () => normalizeColor(theme.accordion.icons.color || 'control', theme),
      [theme],
    );

    const AccordionIcon = useMemo(
      () =>
        active ? theme.accordion.icons.collapse : theme.accordion.icons.expand,
      [active, theme.accordion.icons],
    );

    return (
      <Box ref={ref} flex={false} onClick={onClick}>
        <Button
          role="tab"
          aria-selected={active}
          aria-expanded={active}
          onClick={onPanelChange}
          onMouseOver={event => {
            setHover(theme.dark ? 'light-4' : 'dark-3');
            if (onMouseOver) onMouseOver(event);
          }}
          onMouseOut={event => {
            setHover(undefined);
            if (onMouseOut) onMouseOut(event);
          }}
          onFocus={event => {
            setHover(theme.dark ? 'light-4' : 'dark-3');
            if (onFocus) onFocus(event);
          }}
          onBlur={event => {
            setHover(undefined);
            if (onBlur) onBlur(event);
          }}
        >
          {header || (
            <Box align="center" direction="row" justify="between" {...rest}>
              {typeof label === 'string' ? (
                <Box pad={{ horizontal: 'xsmall' }}>
                  <Heading
                    level={
                      (theme.accordion.heading &&
                        theme.accordion.heading.level) ||
                      4
                    }
                    color={hover}
                  >
                    {label}
                  </Heading>
                </Box>
              ) : (
                label
              )}
              {AccordionIcon && (
                <Box pad={{ horizontal: 'small' }}>
                  <AccordionIcon color={iconColor} />
                </Box>
              )}
            </Box>
          )}
        </Button>
        <Box border={theme.accordion.border}>
          {animate ? (
            <Collapsible open={active}>{children}</Collapsible>
          ) : (
            active && children
          )}
        </Box>
      </Box>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';

let AccordionPanelDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  AccordionPanelDoc = require('./doc').doc(AccordionPanel);
}
const AccordionPanelWrapper = AccordionPanelDoc || AccordionPanel;

export { AccordionPanelWrapper as AccordionPanel };
