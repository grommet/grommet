// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var SearchInput = require('grommet/components/SearchInput');

var SearchInputDoc = React.createClass({

  getInitialState: function () {
    return {value: "one", suggestions: this._values};
  },

  _values: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],

  _onChange: function (value, selected) {
    if (selected) {
      this.setState({value: value, suggestions: this._values});
    } else {
      var regexp = new RegExp('^' + value);
      var suggestions = this._values.filter(function (val) {
        return regexp.test(val);
      });
      this.setState({value: value, suggestions: suggestions});
    }
  },

  render: function() {
    var inline =
      "<SearchInput onChange={...} onSearch={...} />";
    return (
      <Article primary={true}>
        <header>
          <h1>SearchInput</h1>
          <p>An input field with a search control.</p>
          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>defaultValue  {"{value: , label: }|{string}"}</code></dt>
            <dd>What text to start with in the input.</dd>
            <dt><code>id            {"{string}"}</code></dt>
            <dd>The id attribute of the input.</dd>
            <dt><code>name          {"{string}"}</code></dt>
            <dd>The name attribute of the input.</dd>
            <dt><code>onChange      {"function ({value: , label: }|{string}, selected) {...}"}</code></dt>
            <dd>Function that will be called when the user types some text into the input.
              selected will be true when the user has chosen one of the suggestions.</dd>
            <dt><code>placeHolder   {"{string}"}</code></dt>
            <dd>Placeholder text to use when the input is empty.</dd>
            <dt><code>suggestions   {"[{value: , label: }|{string}, ...]"}</code></dt>
            <dd>Suggestions</dd>
            <dt><code>value         {"{value: , label: }|{string}"}</code></dt>
            <dd>What text to put in the input.</dd>
          </dl>
        </section>

        <section>
          <h2>Example</h2>

          <div className="example">
            <SearchInput id="item2" name="item-2"
              value={this.state.value} onChange={this._onChange}
              onSearch={this._onSearch}
              suggestions={this.state.suggestions} />
          </div>
          <pre><code className="html">{"<SearchInput value=\"" + this.state.value + "\" />"}</code></pre>

        </section>

      </Article>
    );
  }
});

module.exports = SearchInputDoc;
