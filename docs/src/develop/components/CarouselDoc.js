// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DocsArticle = require('../../DocsArticle');
var Carousel = require('grommet/components/Carousel');

var TileDoc = React.createClass({

  render: function() {
    var inline =
      "<Carousel>\n" +
      "  <img />\n" +
      "  <img />\n" +
      "  ...\n" +
      "</Carousel>";

    return (
      <DocsArticle title="Carousel" colorIndex="neutral-3">

        <p>Image carousel.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Carousel>
              <img src="img/carousel-1.png" />
              <img src="img/carousel-2.png" />
            </Carousel>
          </div>
          <pre><code className="html hljs xml">
            {"<Carousel>\n  <img />\n    ...\n</Carousel>"}
          </code></pre>

        </section>

      </DocsArticle>
    );
  }
});

module.exports = TileDoc;
