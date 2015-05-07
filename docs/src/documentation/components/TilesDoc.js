// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Edit = require('grommet/components/icons/Edit');
var GrommetDocument = require('grommet/components/Document');

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

    var richTiles = [
      (<Tile key={1}>
        <Header>
          <h4>First</h4>
        </Header>
        hello
        <Footer>
          <span></span>
          <Menu icon={<Edit/>} align="right" direction="up">
            <a>action 1</a>
            <a>action 2</a>
            <a>action 3</a>
          </Menu>
        </Footer>
      </Tile>),
      (<Tile key={2}>
        <Header>
          <h4>Second</h4>
        </Header>
        hello
        <Footer>
          <span></span>
          <Menu icon={<Edit/>} align="right" direction="up">
            <a>action 1</a>
            <a>action 2</a>
            <a>action 3</a>
          </Menu>
        </Footer>
      </Tile>),
      (<Tile key={3}>
        <Header>
          <h4>Third</h4>
        </Header>
        hello
        <Footer>
          <span></span>
          <Menu icon={<Edit/>} align="right" direction="up">
            <a>action 1</a>
            <a>action 2</a>
            <a>action 3</a>
          </Menu>
        </Footer>
      </Tile>)
    ];

    return (
      <GrommetDocument>
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

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = TileDoc;
