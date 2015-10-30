// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DocsArticle = require('../../DocsArticle');
var Box = require('grommet/components/Box');

var BoxDoc = React.createClass({

  render: function() {
    var inline = "<Box>\n  ...\n</Box>";
    return (
      <DocsArticle title="Box" colorIndex="neutral-3">

        <p>General purpose flexible box layout. This does not support all of the
          <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">flexbox capabilities</a>.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>align        start|center|end</code></dt>
            <dd>How to align the contents along the cross axis.</dd>
            <dt><code>appCentered  true|false</code></dt>
            <dd>Whether the box background should stretch across an App that is centered.</dd>
            <dt><code>colorIndex   {"{category}-{index}"}</code></dt>
            <dd>The color identifier to use for the background color.
              For example: <code>"neutral-1"</code></dd>
            <dt><code>direction    row|column</code></dt>
            <dd>The orientation to layout the child components in.</dd>
            <dt><code>full         true|horizontal|vertical|false</code></dt>
            <dd>Whether the width and/or height should take the full viewport size.</dd>
            <dt><code>onClick      {"{func}"}</code></dt>
            <dd>Optional click handler.</dd>
            <dt><code>justify      start|center|between|end</code></dt>
            <dd>How to align the contents along the main axis.</dd>
            <dt><code>pad          {"none|small|medium|large|{...}"}</code></dt>
            <dd>The amount of padding to put around the contents. An object
              can be specified to distinguish horizontal and vertical padding: <code>
              {"{horizontal: none|small|medium|large, vertical: none|small|medium|large}"}
              </code>.</dd>
            <dt><code>reverse      true|false</code></dt>
            <dd>Whether to reverse the order of the child components.</dd>
            <dt><code>responsive   true|false</code></dt>
            <dd>Whether children laid out in a row direction should be
              switched to a column layout when the display area narrows.</dd>
            <dt><code>media   lap-and-up|palm</code></dt>
            <dd>Whether to show the box only for lap-and-up or palm size. Optional.</dd>
            <dt><code>separator   top|bottom|left|right</code></dt>
            <dd>Add a separator.</dd>
            <dt><code>tag          {"{text}"}</code></dt>
            <dd>The DOM tag to use for the element.</dd>
            <dt><code>texture      {"{url}"}</code></dt>
            <dd>A texture image to apply to the background.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Default</h3>
          <div className="example">
            <Box>
              <div>first</div>
              <div>second</div>
            </Box>
          </div>
          <pre><code className="html hljs xml">{"<Box> ..."}</code></pre>

          <h3>Row</h3>
          <div className="example">
            <Box direction="row">
              <div>first</div>
              <div>second</div>
            </Box>
          </div>
          <pre><code className="html hljs xml">{"<Box direction=\"row\"> ..."}</code></pre>

          <h3>Kitchen sink</h3>
          <div className="example">
            <Box direction="row" align="center" colorIndex="neutral-1" justify="between"
              pad="large" reverse={true} tag="aside">
              <div>first</div>
              <div>second</div>
            </Box>
          </div>
          <pre><code className="html hljs xml">{"<Box direction=\"row\" align=\"center\" colorIndex=\"neutral-1\"\n  justify=\"between\" reverse={true} tag=\"aside\"> ..."}</code></pre>

          <h3>Palm-only Box</h3>
          <p>Set the browser size to mobile in order to see the box.</p>
          <div className="example">
            <Box colorIndex="neutral-2" direction="row" media="palm" align="center">
              <div>first</div>
              <div>second</div>
            </Box>
          </div>
          <pre><code className="html">{"<Box colorIndex=\"neutral-2\" direction=\"row\" media=\"palm\" align=\"center\"> ..."}</code></pre>
        </section>

      </DocsArticle>
    );
  }
});

module.exports = BoxDoc;
