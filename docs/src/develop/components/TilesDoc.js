// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Edit = require('grommet/components/icons/Edit');

var TileDoc = React.createClass({

  render: function() {
    var inline =
      "<Tiles>\n" +
      "  <Tile>\n" +
      "    <Header>\n" +
      "      ...\n" +
      "    </Header>\n" +
      "    ...\n" +
      "    <Footer>\n" +
      "      ...\n" +
      "    </Footer>\n" +
      "  </Tile>\n" +
      "  ...\n" +
      "</Tiles>";

    var richTiles = [];
    var index = 1;
    while (index <= 8) {
      richTiles.push(
        <Tile key={index}>
          <Header tag="h4" textAlign="center">{"Tile " + index}</Header>
          hello
          <Footer>
            <span></span>
            <Menu icon={<Edit/>} dropAlign={{bottom: 'bottom', right: 'right'}}>
              <a>action 1</a>
              <a>action 2</a>
              <a>action 3</a>
            </Menu>
          </Footer>
        </Tile>
      );
      index += 1;
    }

    return (
      <Article>
        <header>
          <h1>Tile(s)</h1>
          <p>Lay out equivalently sized tiles of content.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>fill        true|false</code></dt>
            <dd>Whether the contents expand to fill all of the available space.</dd>
            <dt><code>flush       true|false</code></dt>
            <dd>Whether the contents are flush with the left and right edges or not.
              Defaults to true.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <Tiles>
              <Tile>
                First
              </Tile>
              <Tile>
                Second
              </Tile>
              <Tile>
                Third
              </Tile>
            </Tiles>
          </div>
          <pre><code className="html">
            {"<Tiles>\n  <Tile>\n    ...\n  </Tile>\n  ...\n</Tiles>"}
          </code></pre>

          <h3>Headers and Footers</h3>
          <div className="example">
            <Tiles>
              {richTiles}
            </Tiles>
          </div>
          <pre><code className="html">
            {"<Tiles>\n  <Tile>\n    ...\n  </Tile>\n  ...\n</Tiles>"}
          </code></pre>

          <h3>Fill</h3>
          <div className="example">
            <Tiles fill={true}>
              {richTiles}
            </Tiles>
          </div>
          <pre><code className="html">
            {"<Tiles fill={true}>\n  ...\n</Tiles>"}
          </code></pre>

          <h3>Row</h3>
          <div className="example">
            <Tiles fill={true} direction="row">
              {richTiles}
            </Tiles>
          </div>
          <pre><code className="html">
            {"<Tiles fill={true} direction=\"row\">\n  ...\n</Tiles>"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = TileDoc;
