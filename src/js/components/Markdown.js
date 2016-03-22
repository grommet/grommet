// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import { PropTypes } from 'react';
import markdownToJSX from 'markdown-to-jsx';
import deepAssign from 'deep-assign';
import Paragraph from './Paragraph';
import Heading from './Heading';
import Anchor from './Anchor';
import Image from './Image';

let Markdown = (props) => {

  const { content, components } = props;

  const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    .reduce((heading, current) => {
      heading[current] = {
        component: Heading,
        props: {
          tag: current
        }
      };

      return heading;
    }, {});

  const options = deepAssign({
    p: {
      component: Paragraph
    },
    a: {
      component: Anchor
    },
    img: {
      component: Image,
      props: {
        caption: true
      }
    }
  }, heading, components);

  return (
    markdownToJSX(content, {}, options)
  );
};

Markdown.propTypes = {
  content: PropTypes.string,
  components: PropTypes.shape({
    props: PropTypes.object
  })
};

Markdown.defaultProps = {
  components: {},
  content: ''
};

export default Markdown;
