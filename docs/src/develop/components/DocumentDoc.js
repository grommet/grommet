// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var GrommetDocument = require('grommet/components/Document');

var DocumentDoc = React.createClass({

  render: function() {
    var inline = [
      "<Document>",
      "  <header>",
      "    <h1>{title}</h1>",
      "    <p>{description}</p>",
      "  </header>",
      "  <section>",
      "    <h2>{header}</h2>",
      "    <p>{content}</p>",
      "  </section>",
      "</Document>"
    ].join('\n');

    return (
      <Article primary={true}>
        <header>
          <h1>Document</h1>
          <p>NOTE: This component is deprecated and will be removed soon.
            It has been superseded by the Article component.</p>
          <p>Styles standard HTML5 markup for use in documentation.</p>
          <pre><code className="html hljs xml">{inline}</code></pre>
        </header>

        <section>
          <h2>Example</h2>

          <div className="example">
            <GrommetDocument>
              <header>
                <h1>Title</h1>
                <p>Lorem ipsum ...</p>
              </header>
              <section>
                <h2>Header</h2>
                <p>Lorem ipsum ...</p>
              </section>
            </GrommetDocument>
          </div>

        </section>

      </Article>
    );
  }
});

module.exports = DocumentDoc;
