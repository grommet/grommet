import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Markdown => {
  const DocumentedMarkdown = describe(Markdown)
    .availableAt(getAvailableAtBadge('Markdown'))
    .description('Markdown formatting using MnetUIBase components.')
    .usage(
      `import { Markdown } from 'mnet-ui-base';
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
