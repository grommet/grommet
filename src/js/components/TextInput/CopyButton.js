// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Copy } from 'grommet-icons/icons/Copy';
import { Button } from '../Button';
import { Tip } from '../Tip';
import { edgeStyle } from '../../utils/styles';
import { useThemeValue } from '../../utils/useThemeValue';
import { MessageContext } from '../../contexts/MessageContext';

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
  ariaLabel,
  authoredType,
  disabled,
  messages,
  onClickCopy,
  onBlurCopy,
  tip,
  value,
}) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = useContext(MessageContext);
  const CopyIcon = theme.textInput?.icons?.copy || Copy;
  // never expose the masked value via the accessible name
  const buttonAriaLabel =
    ariaLabel ||
    (authoredType !== 'password' && (value || value === 0)
      ? format({
          id: 'input.readOnlyCopy.promptWithValue',
          messages,
          values: { value },
        })
      : format({ id: 'input.readOnlyCopy.prompt', messages }));

  return (
    <Tip dropProps={{ align: { bottom: 'top' } }} content={tip}>
      <StyledButton
        disabled={disabled}
        onClick={onClickCopy}
        icon={<CopyIcon />}
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
        aria-label={buttonAriaLabel}
        {...passThemeFlag}
      />
    </Tip>
  );
};
