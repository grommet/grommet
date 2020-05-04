import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Markdown => {
  const DocumentedMarkdown = describe(Markdown)
    .availableAt(getAvailableAtBadge('Markdown'))
    .description('Markdown formatting using Grommet components.')
    .details(
      `Grommet uses 'markdown-to-jsx' in Markdown component,
      you can see all the options in the documentation.`,
    )
    .usage(
      `import { Markdown } from 'grommet';
      <Markdown>{content}</Markdown>`,
    )
    .intrinsicElement('div');

  DocumentedMarkdown.propTypes = {
    components: PropTypes.shape({}).description(
      `Custom components and props to override html elements such as 'img'
      or 'pre'. By default 'a', 'p', 'img', and table elements are overridden
      with grommet components`,
    ),
  };

  return DocumentedMarkdown;
};
