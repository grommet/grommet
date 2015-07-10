// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
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
      <Article>
        <header>
          <h1>Carousel</h1>
          <p>Image carousel.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Example</h2>

          <div className="example">
            <Carousel>
              <img src="img/carousel-1.png" />
              <img src="img/carousel-2.png" />
            </Carousel>
          </div>
          <pre><code className="html">
            {"<Carousel>\n  <img />\n    ...\n</Carousel>"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = TileDoc;
