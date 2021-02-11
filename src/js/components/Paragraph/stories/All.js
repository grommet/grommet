import React from 'react';

import { Grommet, Paragraph } from 'grommet';
import { grommet } from 'grommet/themes';

const sizes = ['xxlarge', 'xlarge', 'large', 'medium', 'small'];

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const All = () => (
  <Grommet theme={grommet}>
    {sizes.map(size => (
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
  </Grommet>
);

export default {
  title: 'Type/Paragraph/All',
};
