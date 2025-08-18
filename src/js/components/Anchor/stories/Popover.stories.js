import React from 'react';
import { Anchor, Box, FormField, Paragraph, TextInput } from 'grommet';

const PopoverContent = ({ ...rest }) => (
  <Paragraph margin="none" {...rest}>
    This is the content for the popover
  </Paragraph>
);

const PopoverContent2 = ({ ...rest }) => (
  <Paragraph margin="none" {...rest}>
    This is the content for the popover
  </Paragraph>
);

const FormFieldExample = () => (
  <>
    <FormField
      label={<Anchor popover={<PopoverContent2 />} label="Deduplication" />}
      name="name"
      required
    >
      <TextInput placeholder="Placeholder" name="name" />
    </FormField>
    <FormField label="Deduplication" name="name2" required>
      <TextInput placeholder="Placeholder" name="name2" />
    </FormField>
  </>
);

const ParagraphExample = () => (
  <Paragraph margin="none" size="small">
    This is an <Anchor popover={<PopoverContent />} label="example" /> of an
    inline popover link.
  </Paragraph>
);

const PopoverExample = () => (
  <Box gap="medium" align="center" pad="large">
    <Anchor popover={<PopoverContent />} label="Link" />
    <ParagraphExample />
    <FormFieldExample />
  </Box>
);

export const Popover = () => <PopoverExample />;
Popover.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Anchor/Popover',
};
