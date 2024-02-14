import { css } from 'styled-components';

export const readOnlyStyle = (theme) => {
  const styles = [];
  if (theme.global.input.readOnly?.border?.color)
    styles.push(
      css`
        border-color: ${theme.global.input.readOnly.border.color};
      `,
    );
  if (theme.global.input.readOnly?.background)
    styles.push(
      css`
        background-color: ${theme.global.input.readOnly.background};
      `,
    );
  return styles;
};
