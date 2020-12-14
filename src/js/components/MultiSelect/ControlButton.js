import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';

const ControlButton = ({ onOk, onCancel }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  const ControlButtonWrapper = styled(Box)`
    ${props => props.theme.multiselect.controls.wrapper.extend};
  `;

  return (
    <ControlButtonWrapper {...theme.multiselect.controls.wrapper}>
      <Button
        role="button"
        a11yTitle="OK button (Update selected values)"
        {...theme.multiselect.controls.button}
        onClick={onOk}
        primary
      >
        <Text weight={600}>OK</Text>
      </Button>
      <Button
        role="button"
        a11yTitle="Cancel button"
        {...theme.multiselect.controls.button}
        onClick={onCancel}
        secondary
      >
        <Text weight={600}>Cancel</Text>
      </Button>
    </ControlButtonWrapper>
  );
}

export { ControlButton };
