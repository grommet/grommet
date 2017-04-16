// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'markdown-to-jsx';
import deepAssign from 'deep-assign';
import Paragraph from './Paragraph';
import Table from './Table';
import Heading from './Heading';
import Anchor from './Anchor';
import Image from './Image';

let GrommetMarkdown = (props) => {

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
    a: {
      component: Anchor
    },
    img: {
      component: Image,
      props: {
        caption: true
      }
    },
    p: {
      component: Paragraph
    },
    table: {
      component: Table
    }
  }, heading, components);

  return (
    <Markdown options={{ overrides: options }}>
      {content}
    </Markdown>
  );
};

GrommetMarkdown.propTypes = {
  content: PropTypes.string,
  components: PropTypes.shape({
    props: PropTypes.object
  })
};

GrommetMarkdown.defaultProps = {
  components: {},
  content: ''
};

export default GrommetMarkdown;
