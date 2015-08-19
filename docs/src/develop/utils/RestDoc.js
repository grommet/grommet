// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');

var RestDoc = React.createClass({

  render: function() {
    var inline = [
      "Rest",
      "  .get('/rest/index/resources', params)",
      "  .end(this._onResponse);"
    ].join('\n');

    var example = [
      "var Component = React.createClass({",
      "  ...",
      "  _onResponse: function (err, res) {",
      "    if (err && err.timeout > 1000) {",
      "      this.setState({error: 'Timeout', result: {}});",
      "    } else if (res.status === 400) {",
      "      Actions.logout();",
      "    } else if (!res.ok) {",
      "      this.setState({error: res.body || res.text, result: {}});",
      "    } else {",
      "      var result = res.body;",
      "      this.setState({result: result, error: null});",
      "    }",
      "  },",
      "  _getData: function () {",
      "    Rest.get('/rest/index/resources', this.state.options.params)",
      "      .end(this._onResponse);",
      "  },",
      "  ...",
      "});"
    ].join('\n');

    return (
      <Article primary={true}>
        <header>
          <h1>Rest</h1>
          <p>Perform REST calls.
          Uses <a href="https://github.com/visionmedia/superagent">superagent</a> under
          the hood.</p>
          <pre><code className="javascript">{inline}</code></pre>
        </header>

        <section>
          <h2>Methods</h2>
          <dl>
            <dt><code>del (uri)</code></dt>
            <dd>Delete the resource indicated by the uri.</dd>
            <dt><code>get (uri, object)</code></dt>
            <dd>Get the resource indicated by the uri and optional query parameters.
            The second argument will be converted into a query string.</dd>
            <dt><code>head (uri, object)</code></dt>
            <dd>Chek the resource indicated by the uri and optional query parameters.
            The second argument will be converted into a query string.</dd>
            <dt><code>patch (uri, data)</code></dt>
            <dd>Update some of the resource indicated by the uri with the provided data.</dd>
            <dt><code>post (uri, data)</code></dt>
            <dd>Create a resource under the indicated uri with the provided data.</dd>
            <dt><code>put (uri, data)</code></dt>
            <dd>Create or update the resource indicated by the uri with the provided data.</dd>
            <dt><code>setHeader (name, value)</code></dt>
            <dd>Set a default HTTP header.</dd>
            <dt><code>setHeaders (object)</code></dt>
            <dd>Set multiple HTTP headers.</dd>
            <dt><code>setTimeout</code></dt>
            <dd>Set the default request timeout.</dd>
          </dl>

          <p>Note, the object returned from head, get, patch, post, put, and del is
          the superagent request object. You must call <code>end()</code> to actually
          perform the request.</p>
        </section>

        <section>
          <h2>Example</h2>
          <pre><code className="javascript">
            {example}
          </code></pre>
        </section>

      </Article>
    );
  }
});

module.exports = RestDoc;
