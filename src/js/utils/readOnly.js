import { css } from 'styled-components';
import { backgroundStyle } from './background';
import { normalizeColor } from './colors';

export const readOnlyStyle = (theme) => {
  const styles = [];

  if (theme?.global.input.readOnly?.border?.color)
    styles.push(
      css`
        border-color: ${normalizeColor(
          theme.global.input.readOnly.border.color,
          theme,
        )};
      `,
    );
  if (theme?.global.input.readOnly?.background)
    styles.push(
      backgroundStyle(theme.global.input.readOnly?.background, theme),
    );
  return styles;
};
