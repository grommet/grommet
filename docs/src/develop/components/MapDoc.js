// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var GrommetMap = require('grommet/components/Map');

var MapDoc = React.createClass({

  render: function() {
    var inline =
      "<Map value={70} total={100} units=\"GB\" />";

    var data = {
      categories: [
        {id: "category-1", label: "First category", items: [
          {id: "item-1-1", node: "First item"},
          {id: "item-1-2", node: "Second item"},
          {id: "item-1-3", node: "Third item"}
        ]},
        {id: "category-2", label: "Second category", items: [
          {id: "item-2-1", node: "Fourth item"},
          {id: "item-2-2", node: "Fifth item"}
        ]},
        {id: "category-3", label: "Third category", items: [
          {id: "item-3-1", node: "Sixth item"},
          {id: "item-3-2", node: "Seventh item"}
        ]}
      ],
      links: [
        {parentId: "item-1-1", childId: "item-2-2"},
        {parentId: "item-1-2", childId: "item-2-2"},
        {parentId: "item-1-2", childId: "item-2-1"},
        {parentId: "item-2-2", childId: "item-3-1"},
        {parentId: "item-2-1", childId: "item-3-2"}
      ]
    };

    return (
      <Article>
        <header>
          <h1>Map</h1>
          <p>Shows a linear meter graphic.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>data     {"{\n    categories: [{id: , label: , items: [id: , node: ]}, ...],\n    links: [{parentId: , childId: }, ...]\n}"}</code></dt>
            <dd>An array of objects describing the data.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <GrommetMap data={data} />
          </div>
          <pre><code className="html">
            {"<Map data={...} />"}
          </code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = MapDoc;
