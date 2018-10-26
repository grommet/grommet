import { describe } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Markdown => {
  const DocumentedMarkdown = describe(Markdown)
    .availableAt(getAvailableAtBadge('Markdown'))
    .description('Markdown formatting using Grommet components.')
    .usage(
      `import { Markdown } from 'grommet';
      <Markdown>{content}</Markdown>`,
    );

  // DocumentedMarkdown.propTypes = {
  //   content: PropTypes.string.description('The markdown text to render.'),
  // };

  return DocumentedMarkdown;
};
