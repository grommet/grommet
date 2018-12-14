import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils';
export var doc = function doc(Markdown) {
  var DocumentedMarkdown = describe(Markdown).availableAt(getAvailableAtBadge('Markdown')).description('Markdown formatting using Grommet components.').usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>");
  DocumentedMarkdown.propTypes = {
    components: PropTypes.objectOf(PropTypes.element).description("Custom components to override default html tags such as 'img' or 'pre'.\nBy default only 'p' and 'a' are overrided with the Paragraph and Anchor components")
  };
  return DocumentedMarkdown;
};