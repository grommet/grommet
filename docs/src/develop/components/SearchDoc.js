// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Search = require('grommet/components/Search');

var SearchDoc = React.createClass({

  getInitialState: function () {
    return {value: "ite"};
  },

  _onChange: function (value) {
    this.setState({value: value});
  },

  render: function() {
    var inline =
    "<Search onChange={...} />";
    return (
      <Article primary={true}>
        <header>
          <h1>Search</h1>
          <p>A responsive search control.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>defaultValue  {"{string}"}</code></dt>
            <dd>What text to start with in the input.</dd>
            <dt><code>dropAlign     {"{left: left|right, right: left|right, top: top|bottom, bottom: top|bottom}"}</code></dt>
            <dd>Where to place the drop down.
              At most one of left or right and one of top or bottom should be specified.</dd>
            <dt><code>inline        true|false</code></dt>
            <dd>Indicates that the search input should always
              be visible.</dd>
            <dt><code>onChange      {"function ({text}) {...}"}</code></dt>
            <dd>Function that will be called when the user types some text.</dd>
            <dt><code>placeHolder   {"{string}"}</code></dt>
            <dd>Placeholder text to use when the input is empty.</dd>
            <dt><code>suggestions   [{"{string}"}, ...]</code></dt>
            <dd>Suggestions</dd>
            <dt><code>value  {"{string}"}</code></dt>
            <dd>What text to show in the input.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Default</h3>
          <div className="example">
            <Search />
          </div>
          <pre><code className="html">{"<Search />"}</code></pre>

          <h3>Left</h3>
          <div className="example">
            <Search dropAlign={{right: 'right'}} />
          </div>
          <pre><code className="html">{"<Search dropAlign={{right: \"right\"}} />"}</code></pre>

          <h3>Suggestions and Default Value</h3>
          <div className="example">
            <Search defaultValue={this.state.value}
              suggestions={['item 1', 'item 2', 'item 3']}
              onChange={this._onChange} />
          </div>
          <pre><code className="html">{"<Search defaultValue=\"" +
            this.state.value + "\" suggestions={...} />"}</code></pre>

          <h3>Inline</h3>
          <div className="example">
            <Search inline={true}/>
          </div>
          <pre><code className="html">{"<Search inline={true}/>"}</code></pre>

          <h3>Inline, Default Value, and Suggestions</h3>
          <div className="example">
            <Search inline={true} value={this.state.value}
              suggestions={['item 1', 'item 2', 'item 3']}
              onChange={this._onChange} />
          </div>
          <pre><code className="html">{"<Search inline={true} value=\"" +
            this.state.value + "\" suggestions={[...]}/>"}</code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = SearchDoc;
