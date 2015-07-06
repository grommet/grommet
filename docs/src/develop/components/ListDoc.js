// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var List = require('grommet/components/List');

var SCHEMA = [
  {attribute: 'uid', uid: true},
  {attribute: 'face', image: true},
  {attribute: 'name', primary: true},
  {attribute: 'mood', secondary: true}
];

var DATA = [
  {uid: 1, face: '', name: 'Alan', mood: 'happy'},
  {uid: 2, face: '', name: 'Bryan', mood: 'calm'},
  {uid: 3, face: '', name: 'Chris', mood: 'cool'},
  {uid: 4, face: '', name: 'Eric', mood: 'odd'}
];

var ListDoc = React.createClass({

  render: function() {
    var inline = [
      "<List ... />"
    ].join('\n');

    var schema = [
      "{",
      "  attribute: name,",
      "  default:   string|node",
      "  image:     true|false,",
      "  label:     image label,",
      "  primary:   true|false,",
      "  secondary: true|false,",
      "  timestamp: true|false,",
      "  uid:       true|false",
      "}"
    ].join('\n');

    return (
      <Article>
        <header>
          <h1>List</h1>
          <p>List of things.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>data        {"[{...}, ...]"}</code></dt>
            <dd>The data set.</dd>
            <dt><code>large       true|false</code></dt>
            <dd>Larger sized version.</dd>
            <dt><code>onMore      {"function () {...}"}</code></dt>
            <dd>Function that will be called when more data is needed.</dd>
            <dt><code>onSelect    {"function (datum) {...}"}</code></dt>
            <dd>Function that will be called when the user selects an item.</dd>
            <dt><code>schema        {"[{...}, ...]"}</code></dt>
            <dd>An array of objects describing the data.
            <code>{schema}</code>
            </dd>
            <dt><code>selected    {"uid|[uid, ...]"}</code></dt>
            <dd>The currently selected items.</dd>
            <dt><code>small       true|false</code></dt>
            <dd>Smaller sized version.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Default</h3>
          <div className="example">
            <List schema={SCHEMA} data={DATA} />
          </div>

          <h3>Small</h3>
          <div className="example">
            <List schema={SCHEMA} data={DATA} small={true} />
          </div>

          <h3>Large</h3>
          <div className="example">
            <List schema={SCHEMA} data={DATA} large={true} />
          </div>

        </section>

      </Article>
    );
  }
});

module.exports = ListDoc;
