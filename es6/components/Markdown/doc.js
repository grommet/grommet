import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Markdown) {
  var DocumentedMarkdown = describe(Markdown).availableAt(getAvailableAtBadge('Markdown')).description('Markdown formatting using Grommet components.').details("Grommet uses 'markdown-to-jsx' in Markdown component,\n      you can see all the options in the documentation.").usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>").intrinsicElement('div');
  DocumentedMarkdown.propTypes = {
    components: PropTypes.shape({}).description("Custom components and props to override html elements such as 'img'\n      or 'pre'. By default 'a', 'p', 'img', and table elements are overridden\n      with grommet components"),
    options: PropTypes.shape({}).description("Used to tune the jsx compiler to specific properties, available options on [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx).")
  };
  return DocumentedMarkdown;
};