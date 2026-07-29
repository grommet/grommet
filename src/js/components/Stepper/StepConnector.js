import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';
import { StyledConnector } from './StyledStepper';

export const StepConnector = ({ step, direction, children }) => {
  const { theme, passThemeFlag } = useThemeValue();

  const indicatorSize =
    theme.stepper?.indicator?.size &&
    theme.global?.edgeSize?.[theme.stepper.indicator.size]
      ? theme.global.edgeSize[theme.stepper.indicator.size]
      : theme.global?.edgeSize?.medium || '24px';
  const childGap = theme.global?.edgeSize?.xsmall || '8px';
  const childPadTop = theme.global?.edgeSize?.medium || '24px';
  const minConnectorInlineSize = theme.global?.edgeSize?.small || '12px';

  const directionStyle =
    direction === 'horizontal'
      ? {
          alignItems: 'center',
          minWidth: minConnectorInlineSize,
        }
      : {
          justifyContent: 'flex-start',
          minHeight: minConnectorInlineSize,
        };

  const renderChildren = () => {
    if (!children) return null;

    const childIndent = `calc(${indicatorSize} + ${
      theme.global?.edgeSize?.small || '12px'
    })`;

    return direction === 'horizontal' ? (
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: childGap,
          paddingTop: childPadTop,
          maxWidth: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {children}
      </span>
    ) : (
      <ol
        style={{
          listStyle: 'none',
          padding: `0 0 0 ${childIndent}`,
          margin: 0,
        }}
      >
        {children}
      </ol>
    );
  };

  return (
    <li
      role="presentation"
      aria-hidden={children ? undefined : 'true'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
        overflow: 'visible',
        ...directionStyle,
      }}
    >
      <StyledConnector
        direction={direction}
        status={step.status}
        aria-hidden="true"
        isBetween
        {...passThemeFlag}
      />
      {renderChildren()}
    </li>
  );
};
