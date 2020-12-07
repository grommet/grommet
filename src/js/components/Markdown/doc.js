import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = Markdown => {
  const DocumentedMarkdown = describe(Markdown)
    .availableAt(getAvailableAtBadge('Markdown', 'Type'))
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
    components: PropTypes.object.description(
      `Custom components and props to override html elements such as 'img'
      or 'pre'. By default 'a', 'p', 'img', and table elements are overridden
      with grommet components.
      Available options:
      a: { component: Anchor },
      img: { component: Image },
      p: { component: Paragraph },
      table: { component: Table },
      td: { component: TableCell },
      tbody: { component: TableBody },
      tfoot: { component: TableFooter },
      th: { component: TableCell },
      thead: { component: TableHeader },
      tr: { component: TableRow }`,
    ),
    options: PropTypes.shape({}).description(
      `Used to tune the jsx compiler to specific properties, available options on [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx).`,
    ),
  };

  return DocumentedMarkdown;
};
