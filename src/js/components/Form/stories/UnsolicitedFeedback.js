import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Form,
  Layer,
  FormField,
  Text,
  TextArea,
  Header,
  Heading,
  ThumbsRating,
  ResponsiveContext,
} from 'grommet';

// floating button purposes
const PositionedFeedbackBox = styled(Box)`
  bottom: 0px;
  right: 0px;
  position: ${(props) => props.theme.feedback?.buttonContainer?.position};
  border-radius: ${(props) =>
    props.theme.feedback?.buttonContainer?.borderRadius};
  z-index: ${(props) => props.theme.feedback?.buttonContainer?.zIndex};
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
    }, 3000);
  };

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <>
      <PositionedFeedbackBox>
        <Button
          onClick={onOpen}
          margin={{ vertical: 'medium', horizontal: 'medium' }}
          elevation="large"
          color="purple!"
          label="Submit Feedback"
          a11yTitle="This button launches a modal to give feedback."
          primary
          alignSelf="start"
        />
      </PositionedFeedbackBox>
      {open && (
        <Layer onEsc={onClose}>
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
                  <ThumbsRating
                    id="thumbs-rating"
                    name="rating"
                    options={['1', '2']}
                    color="pink"
                  />
                </FormField>
                <FormField label="Comments" htmlFor="comments" name="comments">
                  <TextArea id="comments" name="comments" />
                </FormField>
                {!isSuccessful ? (
                  <Box
                    margin={{ top: 'medium', bottom: 'small' }}
                    direction="row"
                    justify="end"
                    gap="small"
                  >
                    <Button onClick={onClose} label="Cancel" />
                    <Button label="Submit Feedback" primary type="submit" />
                  </Box>
                ) : (
                  <Box margin={{ top: 'medium', bottom: 'small' }} align="end">
                    <Text weight="bold" size="large">
                      Thank you for your response!
                    </Text>
                  </Box>
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
