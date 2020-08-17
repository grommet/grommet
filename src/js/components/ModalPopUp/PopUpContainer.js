import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../Button';
import { Heading } from '../Heading';

const PopUpContainer = ({
  title,
  message,
  onPrimaryClick,
  renderButton,
  isLoading,
  onClose,
}) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;

  return (
    <Box {...theme.modalpopup.container}>
      {title && (
        <Box {...theme.modalpopup.title.wrapper}>
          <Heading {...theme.modalpopup.title.text}>{title}</Heading>
        </Box>
      )}
      <Box {...theme.modalpopup.message.wrapper}>
        <Text {...theme.modalpopup.message.text}>{message}</Text>
      </Box>
      {renderButton || (
        <Box {...theme.modalpopup.buttons.wrapper}>
          <Button
            {...theme.modalpopup.buttons.button}
            onClick={onPrimaryClick || onClose}
            isLoading={isLoading}
            background="accent-1"
            primary
          >
            <Text weight={600}>OK</Text>
          </Button>
          <Button
            {...theme.modalpopup.buttons.button}
            onClick={onClose}
            background="accent-2"
            secondary
          >
            <Text weight={600}>Cancel</Text>
          </Button>
        </Box>
      )}
    </Box>
  );
};

PopUpContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onPrimaryClick: PropTypes.func,
  renderButton: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

PopUpContainer.defaultProps = {
  title: '',
  onPrimaryClick: undefined,
  renderButton: undefined,
};

export { PopUpContainer };