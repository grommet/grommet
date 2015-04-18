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
            <dt><code>compact  true|false</code></dt>
            <dd>Whether to compact the tiles into a smaller space.</dd>
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
              <Tile>
                <Header>
                  <h3>First</h3>
                </Header>
                hello
                <Footer>
                  <span></span>
                  <Menu icon={<Edit/>}>
                    <a>action 1</a>
                    <a>action 2</a>
                    <a>action 3</a>
                  </Menu>
                </Footer>
              </Tile>
              <Tile>
                <Header>
                  <h3>Second</h3>
                </Header>
                hello
                <Footer>
                  <span></span>
                  <Menu icon={<Edit/>}>
                    <a>action 1</a>
                    <a>action 2</a>
                    <a>action 3</a>
                  </Menu>
                </Footer>
              </Tile>
              <Tile>
                <Header>
                  <h3>Third</h3>
                </Header>
                hello
                <Footer>
                  <span></span>
                  <Menu icon={<Edit/>}>
                    <a>action 1</a>
                    <a>action 2</a>
                    <a>action 3</a>
                  </Menu>
                </Footer>
              </Tile>
            </Tiles>
          </div>
          <pre><code className="html">
            {"<Tiles>\n  <Tile>\n    ...\n  </Tile>\n  ...\n</Tiles>"}
          </code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = TileDoc;
