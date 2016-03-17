// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import marked from 'marked';
import Paragraph from 'grommet/components/Paragraph';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';

function renderComponent(options={}, component, props) {
  const Component = options.component || component;
  const combinedProps = { ...options.props, ...props };
  return renderToStaticMarkup(createElement(Component, combinedProps));
}

let Markdown = (props) => {

  const renderer = new marked.Renderer();

  renderer.heading = (text, level) => {
    return renderComponent(props.components.Heading,
      Heading, { tag: `h${level}`, dangerouslySetInnerHTML: {__html: text} });
  };

  renderer.image = (href, title, text) => {
    return renderComponent(props.components.Image,
      Image, { src: href, caption: title });
  };

  renderer.link = (href, title, text) => {
    return renderComponent(props.components.Anchor,
      Anchor, { href: href, title: title, label: text });
  };

  renderer.paragraph = (text) => {
    return renderComponent(props.components.Paragraph, Paragraph,
      {dangerouslySetInnerHTML: {__html: text}});
  };

  const html = marked(props.content || '', { renderer: renderer, sanitize: true });

  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html: html}} />
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
