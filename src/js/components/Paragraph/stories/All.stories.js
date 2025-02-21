import React from 'react';

import { Paragraph } from 'grommet';

const sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small', '10px'];

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const All = () => (
  <>
    {sizes.map((size) => (
      <Paragraph key={size} size={size}>
        {`Paragraph ${size}`}
        {paragraphFiller}
      </Paragraph>
    ))}
    <Paragraph color="status-critical">This is an error message.</Paragraph>
    <Paragraph fill>
      This is a full-width paragraph, using the &quot;fill&quot; property:{' '}
      {paragraphFiller}
    </Paragraph>
    <Paragraph
      dangerouslySetInnerHTML={{ __html: 'This is a dangerouslySetInnerHTML!' }}
    />
  </>
);

export default {
  title: 'Type/Paragraph/All',
};
