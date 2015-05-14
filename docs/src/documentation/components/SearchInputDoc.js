// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SearchInput = require('grommet/components/SearchInput');
var GrommetDocument = require('grommet/components/Document');

var SearchInputDoc = React.createClass({

  _values: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],

  _onChange: function (value) {
    this.setState({value: value, suggestions: this._values});
  },

  _onSearch: function (text) {
    var regexp = new RegExp('^' + text);
    var suggestions = this._values.filter(function (value) {
      return regexp.test(value);
    });
    this.setState({suggestions: suggestions});
  },

  getInitialState: function () {
    return {value: "one", suggestions: this._values};
  },

  render: function() {
    var inline =
      "<SearchInput onChange={...} onSearch={...} />";
    return (
      <GrommetDocument>
        <header>
          <h1>SearchInput</h1>
          <p>An input field with a search control.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>defaultValue  {"{string}"}</code></dt>
            <dd>What text to start with in the input.</dd>
            <dt><code>id            {"{string}"}</code></dt>
            <dd>The id attribute of the input.</dd>
            <dt><code>name          {"{string}"}</code></dt>
            <dd>The name attribute of the input.</dd>
            <dt><code>onChange      {"function ({text}) {...}"}</code></dt>
            <dd>Function that will be called when the user types some text into the input.</dd>
            <dt><code>onSearch      {"function ({text}) {...}"}</code></dt>
            <dd>Function that will be called when the user types some text into the search.</dd>
            <dt><code>placeHolder   {"{string}"}</code></dt>
            <dd>Placeholder text to use when the input is empty.</dd>
            <dt><code>suggestions   [{"{string}"}, ...]</code></dt>
            <dd>Suggestions</dd>
            <dt><code>value         {"{string}"}</code></dt>
            <dd>What text to put in the input.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Empty</h3>
          <div className="example">
            <SearchInput id="item1" name="item-1"
              onChange={this._onChange}
              onSearch={this._onSearch}
              suggestions={this.state.suggestions} />
          </div>
          <pre><code className="html">{"<SearchInput />"}</code></pre>

          <h3>Value</h3>
          <div className="example">
            <SearchInput id="item2" name="item-2"
              value={this.state.value} onChange={this._onChange}
              onSearch={this._onSearch}
              suggestions={this.state.suggestions} />
          </div>
          <pre><code className="html">{"<SearchInput value=\"" + this.state.value + "\" />"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = SearchInputDoc;
