import { schema, PropTypes } from 'react-desc';

export default Markdown => schema(Markdown, {
  description: 'Markdown formatting using Grommet components.',
  usage: `import { Markdown } from 'grommet';
  <Markdown/>`,
  props: {
    content: [
      PropTypes.string,
      'The markdown text to render.',
    ],
  },
});
