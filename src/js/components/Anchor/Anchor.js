import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { findButtonParent, normalizeColor, useSizedIcon } from '../../utils';

import { Box } from '../Box';

import { StyledAnchor } from './StyledAnchor';
import { AnchorPropTypes } from './propTypes';
import { useAnalytics } from '../../contexts/AnalyticsContext';
import { TextContext } from '../Text/TextContext';
import { convertRestToTransientProps } from '../../utils/styles';

const Anchor = forwardRef(
  (
    {
      as,
      a11yTitle,
      'aria-label': ariaLabel,
      children,
      color,
      disabled,
      gap,
      href,
      icon,
      label,
      onBlur,
      onClick: onClickProp,
      onFocus,
      reverse,
      size: sizeProp,
      ...restProps
    },
    ref,
  ) => {
    const rest = convertRestToTransientProps(restProps);
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const [focus, setFocus] = useState();
    const { size } = useContext(TextContext);
    const sendAnalytics = useAnalytics();

    const onClick = useCallback(
      (event) => {
        sendAnalytics({
          type: 'anchorClick',
          element: findButtonParent(event.target),
          event,
          href,
          label: typeof label === 'string' ? label : undefined,
        });
        if (onClickProp) onClickProp(event);
      },
      [onClickProp, sendAnalytics, label, href],
    );

    useEffect(() => {
      if ((icon || label) && children) {
        console.warn(
          'Anchor should not have children if icon or label is provided',
        );
      }
    }, [children, icon, label]);

    let coloredIcon = icon;
    if (icon && !icon.props.color) {
      coloredIcon = cloneElement(icon, {
        color: normalizeColor(
          color ||
            theme.anchor?.size?.[sizeProp || size]?.color ||
            theme.anchor.color,
          theme,
        ),
      });
    }

    const anchorIcon = useSizedIcon(coloredIcon, sizeProp || size, theme);

    const first = reverse ? label : anchorIcon;
    const second = reverse ? anchorIcon : label;

    return (
      <StyledAnchor
        {...rest}
        aria-label={ariaLabel || a11yTitle}
        as={as}
        // disabled is not supported by native HTML,
        // but keeping because is passes @emotion/is-prop-valid check
        disabled={disabled}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        onFocus={(event) => {
          setFocus(true);
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          setFocus(false);
          if (onBlur) onBlur(event);
        }}
        ref={ref}
        $colorProp={color}
        $focus={focus}
        $hasIcon={!!icon}
        $hasLabel={label}
        $reverse={reverse}
        $size={sizeProp || size}
      >
        {first && second ? (
          <Box
            as="span"
            direction="row"
            align="center"
            gap={gap || theme.anchor.gap}
            responsive={false}
            style={{ display: 'inline-flex' }}
          >
            {first}
            {second}
          </Box>
        ) : (
          first || second || children
        )}
      </StyledAnchor>
    );
  },
);

Anchor.displayName = 'Anchor';
Anchor.propTypes = AnchorPropTypes;

export { Anchor };
