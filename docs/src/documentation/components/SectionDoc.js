var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Section = require('grommet/components/Section');
var Panel = require('grommet/components/Panel');

var inline =
      "<Section>\n" +
      "  ...\n" +
      "</Section>";

var SectionDoc = React.createClass({
  render: function() {
    return (
      <GrommetDocument>
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

          <h3>Section and Panels to the right</h3>
          <div className="example">
            <Section direction="right">
              <Panel title="Panel One">
                <p>Sample Content One</p>
              </Panel>
              <Panel title="Panel Two">
                <p>Sample Content Two</p>
              </Panel>
            </Section>
          </div>
          <pre><code className="html">
            {"<Section direction=\"right\">\n  <Panel title=\"Panel One\">\n    <p>\n      Sample Content One\n    </p>\n  </Panel>\n  <Panel title=\"Panel Two\">\n    <p>\n      Sample Content Two\n    </p>\n  </Panel>\n</Section>"}
          </code></pre>
        </section>  
      </GrommetDocument>
    );
  }
});

module.exports = SectionDoc;