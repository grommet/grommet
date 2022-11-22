import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { FormClose } from 'grommet-icons';
import { PositionedFeedbackBox } from './StyledFeedbackButton';
import { AnnounceContext } from '../../contexts/AnnounceContext';
import { Box } from '../Box';
import { Button } from '../Button';
import { Form } from '../Form';
import { Heading } from '../Heading';
import { Layer } from '../Layer';
import { Text } from '../Text';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const Announcer = ({ announce, message, mode, role }) => {
  const theme = useContext(ThemeContext);
  announce(message, mode);
  return (
    <Text role={role} aria-live={mode} {...theme?.feedback?.success}>
      {message}
    </Text>
  );
};

const AnnounceContextComponent = (props) => (
  <AnnounceContext.Consumer>
    {(announce) => <Announcer announce={announce} {...props} />}
  </AnnounceContext.Consumer>
);

export const Feedback = ({
  children,
  layerProps,
  messages,
  modal,
  onSubmit,
  show,
  title,
}) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  // tracks if feedback has successfully been submitted
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  // Want to show Thank you message so close the modal after 2 seconds
  const closeFeedbackModal = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (show) setSuccessfulSubmit(false);
  }, [show]);

  let footerContent;
  if (!successfulSubmit) {
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <Button onClick={onClose} label={messages?.cancel || 'Cancel'} />
        <Button label={messages?.submit || 'Submit'} primary type="submit" />
      </Box>
    );
  } else
    footerContent = (
      <Box {...theme?.feedback?.footer}>
        <AnnounceContextComponent
          mode="assertive"
          role="alert"
          message={messages?.successful || 'Thank you!'}
        />
      </Box>
    );

  let content = (
    <Box flex={false} {...theme?.feedback?.container}>
      <FeedbackHeader title={title}>
        {modal && (
          <Button
            onClick={onClose}
            icon={<FormClose /> || theme?.feedback?.close?.icon}
            autoFocus
            {...theme?.feedback?.closeButton}
          />
        )}
      </FeedbackHeader>
      <Form
        onSubmit={(event) => {
          onSubmit(event);
          setSuccessfulSubmit(true);
          closeFeedbackModal();
        }}
        method="post"
        validate="submit"
      >
        <Box {...theme?.feedback?.body}>{children}</Box>
        {footerContent}
      </Form>
    </Box>
  );

  if (modal)
    content = open ? (
      <Layer
        // to opionated ? maybe move to just let user pass with layerProps
        position={
          !['xsmall', 'small'].includes(breakpoint) ? 'bottom-right' : 'center'
        }
        margin={{ vertical: 'xlarge', horizontal: 'medium' }}
        modal={false}
        onEsc={onClose}
        {...layerProps}
      >
        {content}
      </Layer>
    ) : (
      <PositionedFeedbackBox>
        <Button
          margin={{ vertical: 'medium', horizontal: 'medium' }}
          elevation="large"
          onClick={onOpen}
          color="purple!"
          label="Feedback"
          primary
          a11yTitle="This button launches a modal to give feedback."
          // ...buttonProps
        />
      </PositionedFeedbackBox>
    );

  return content;
};

const FeedbackHeader = ({ children, title }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box {...theme?.feedback?.header}>
      <Heading {...theme?.feedback?.heading}>{title}</Heading>
      {children}
    </Box>
  );
};
