import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Form,
  Layer,
  FormField,
  Footer,
  Text,
  TextArea,
  Header,
  Heading,
  ThumbsRating,
  ResponsiveContext,
} from 'grommet';

// create a floating button for story example
// temp fix until this theme issue is resolved:
// https://github.com/grommet/grommet-theme-hpe/issues/283
const PositionedFeedbackButton = styled(Button)`
  position: fixed;
  bottom: 0px;
  border-radius: 6px;
  right: 0px;
  z-index: 10;
  color: ${(props) => props.theme.global.colors['text-strong'].dark};
`;

// This example shows a way to perform validation across multiple fields.
export const UnSolicitedFeedback = () => {
  const size = useContext(ResponsiveContext);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const closeFeedbackModal = () => {
    setTimeout(() => {
      setOpen(false);
      setIsSuccessful(false);
    }, 2000);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
      <PositionedFeedbackButton
        onClick={onOpen}
        margin={{ vertical: 'medium', horizontal: 'medium' }}
        elevation="large"
        color="brand"
        label="Submit Feedback"
        a11yTitle="This button launches a modal to give feedback."
        primary
        alignSelf="start"
      />
      {open && (
        <Layer onClickOutside={onClose} onEsc={onClose}>
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            pad="medium"
            gap="medium"
          >
            <Header
              direction="column"
              align="start"
              gap="xxsmall"
              pad={{ horizontal: 'xxsmall' }}
            >
              <Heading level={4} size="small" margin="none">
                Let us know how your expirence was!
              </Heading>
            </Header>
            <Box
              // Padding used to prevent focus from being cutoff
              pad={{ horizontal: 'xxsmall' }}
            >
              <Form
                method="post"
                validate="submit"
                kind="survey"
                onSubmit={(value) => {
                  console.log('submit', value);
                  setIsSuccessful(true);
                  closeFeedbackModal();
                }}
              >
                <FormField
                  htmlFor="thumbs-rating"
                  name="rating"
                  label="Was this content helpful?"
                >
                  <ThumbsRating id="thumbs-rating" name="rating" />
                </FormField>
                <FormField label="Comments" htmlFor="comments" name="comments">
                  <TextArea id="comments" name="comments" />
                </FormField>
                {!isSuccessful ? (
                  <Footer
                    margin={{ top: 'medium', bottom: 'small' }}
                    direction="row"
                    justify="end"
                    gap="small"
                  >
                    <Button onClick={onClose} label="Cancel" />
                    <Button label="Submit Feedback" primary type="submit" />
                  </Footer>
                ) : (
                  <Footer
                    margin={{ top: 'medium', bottom: 'small' }}
                    align="end"
                  >
                    <Text weight="bold" size="large">
                      Thank you for your response!
                    </Text>
                  </Footer>
                )}
              </Form>
            </Box>
          </Box>
        </Layer>
      )}
    </>
    // </Grommet>
  );
};

UnSolicitedFeedback.storyName = 'UnSolicited feedback';

UnSolicitedFeedback.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Input/Form/UnSolicited feedback',
};
