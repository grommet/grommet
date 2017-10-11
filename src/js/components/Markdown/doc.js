import { describe, PropTypes } from 'react-desc';

export default (Markdown) => {
  const DocumentedMarkdown = describe(Markdown).description(
    'Markdown formatting using Grommet components.'
  ).usage(
    `import { Markdown } from 'grommet';
    <Markdown/>`
  );

  DocumentedMarkdown.propTypes = {
    content: PropTypes.string.description('The markdown text to render.'),
  };

  return DocumentedMarkdown;
};
