import { describe } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Markdown) {
  var DocumentedMarkdown = describe(Markdown).availableAt(getAvailableAtBadge('Markdown')).description('Markdown formatting using Grommet components.').usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>"); // DocumentedMarkdown.propTypes = {
  //   content: PropTypes.string.description('The markdown text to render.'),
  // };

  return DocumentedMarkdown;
};