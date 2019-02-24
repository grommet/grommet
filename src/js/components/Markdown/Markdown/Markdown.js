import React from 'react';
import PropTypes from 'prop-types';
import { Markdown as MarkdownM} from '../Markdown';

function Markdown(props) {
  return <MarkdownM {...props} />
}

Markdown.propTypes = {
  components: PropTypes.object,
  children: PropTypes.node,
}

export default Markdown;
