import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Copy } from 'grommet-icons/icons/Copy';
import { Button } from '../Button';
import { Tip } from '../Tip';
import { edgeStyle } from '../../utils/styles';

// to overcome `plain` styling due to (icon && !label) condition
// in buttons without theme.button.default, apply the padding here
const StyledButton = styled(Button)`
  border-radius: ${(props) => props.theme.global.control.border.radius};
  ${(props) =>
    !props.theme.button.default
      ? edgeStyle('padding', props.pad, false, undefined, props.theme)
      : ''}
`;

export const CopyButton = ({
  onClickCopy,
  onBlurCopy,
  readOnlyCopyPrompt,
  tip,
  value,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Tip dropProps={{ align: { bottom: 'top' } }} content={tip}>
      <StyledButton
        onClick={onClickCopy}
        icon={<Copy />}
        pad={{
          horizontal: theme.global.input.padding?.horizontal,
          left: theme.global.input.padding?.left,
          right: theme.global.input.padding?.right,
          // only apply horizontal padding since button will
          // fill height of input
          top: '0',
          bottom: '0',
        }}
        onBlur={onBlurCopy}
        onMouseOut={onBlurCopy}
        aria-label={`${readOnlyCopyPrompt} ${value}`}
      />
    </Tip>
  );
};
