var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Section = require('grommet/components/Section');
var Menu = require('grommet/components/Menu');

var inline =
      "<Section>\n" +
      "  ...\n" +
      "</Section>";

var SectionDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument flush={false}>
        <header>
          <h1>Section</h1>
          <p>Responsively grouping related contents inside a page.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>compact  true|false</code></dt>
            <dd>Whether to have a reducted padding for the given section. Default is false.</dd>
             <dt><code>colorIndex  {"{n}"}</code></dt>
            <dd>Optional attribute which defines the color index to use for the section background.</dd>
            <dt><code>direction  right|left|down|up</code></dt>
            <dd>Which direction the contents should be laid out in. Default is down.</dd>
            <dt><code>centered  true|false</code></dt>
            <dd>Whether to centralize or not the content inside the section. Default is false.</dd>
            <dt><code>texture  true|false</code></dt>
            <dd>Optional attribute which applies a texture to the section background.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Menu and Document</h3>
          <div className="example">
            <Section direction="right">
              <Menu>
                <span>Link 1</span>
                <span>Link 2</span>
              </Menu>
              <GrommetDocument>
                <h2>Sample Content</h2>
              </GrommetDocument>
            </Section>
          </div>
          <pre><code className="html">
            {"<Section direction=\"right\">\n  <Menu>\n    ...\n  </Menu>\n  <Document>\n    <h2>\n      Sample Content\n    </h2>\n  </Document>\n</Section>"}
          </code></pre>
        </section>

      </GrommetDocument>
    );
  }
});

module.exports = SectionDoc;
