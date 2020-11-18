import { describe, PropTypes } from 'react-desc';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Markdown) {
  var DocumentedMarkdown = describe(Markdown).availableAt(getAvailableAtBadge('Markdown', 'Type')).description('Markdown formatting using Grommet components.').details("Grommet uses 'markdown-to-jsx' in Markdown component,\n      you can see all the options in the documentation.").usage("import { Markdown } from 'grommet';\n      <Markdown>{content}</Markdown>").intrinsicElement('div');
  DocumentedMarkdown.propTypes = {
    components: PropTypes.object.description("Custom components and props to override html elements such as 'img'\n      or 'pre'. By default 'a', 'p', 'img', and table elements are overridden\n      with grommet components.\n      Available options:\n      a: { component: Anchor },\n      img: { component: Image },\n      p: { component: Paragraph },\n      table: { component: Table },\n      td: { component: TableCell },\n      tbody: { component: TableBody },\n      tfoot: { component: TableFooter },\n      th: { component: TableCell },\n      thead: { component: TableHeader },\n      tr: { component: TableRow }"),
    options: PropTypes.shape({}).description("Used to tune the jsx compiler to specific properties, available options on [markdown-to-jsx](https://github.com/probablyup/markdown-to-jsx).")
  };
  return DocumentedMarkdown;
};