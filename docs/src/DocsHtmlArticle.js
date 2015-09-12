// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var DocsHtmlArticle = {
  wrap: function(Component, colorIndex) {

    return React.createClass({

      componentDidMount: function () {
        // decorate the article and header with the classes we need to align with <Article> and <Header>
        var article = this.refs.article.getDOMNode();
        article.classList.add('box', 'box--direction-column', 'box--responsive',
          'box--pad-horizontal-large', 'article');
        var header = article.querySelectorAll('header')[0];
        if (header) {
          header.classList.add('box', 'box--direction-row', 'box--align-center',
            'box--pad-none', 'background-color-index-' + colorIndex, 'header', 'header--large');
        }
      },

      render: function() {
        return React.createElement(Component, {ref: 'article'});
      }
    });
  }
};

module.exports = DocsHtmlArticle;
