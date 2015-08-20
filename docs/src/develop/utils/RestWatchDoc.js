// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');

var RestWatchDoc = React.createClass({

  render: function() {
    var inline = [
      "var requestId = RestWatch.start('/rest/index/resources', params,\n  this._onResponse);"
    ].join('\n');

    var example = [
      "var Component = React.createClass({",
      "  ...",
      "  _onUpdate: function (result) {",
      "    this.setState({result: result});",
      "  },",
      "  _getData: function () {",
      "    this._request = RestWatch.start('/rest/index/resources',",
      "      this.state.options.params, this._onUpdate);",
      "  },",
      "  ...",
      "});"
    ].join('\n');

    var message = [
      "{",
      "  id: <id string>,",
      "  url: <url string>,",
      "  params: <params object>",
      "}"
    ].join('\n');

    return (
      <Article primary={true}>
        <header>
          <h1>RestWatch</h1>
        </header>

        <section>
          <p>Attempts to use WebSocket to receive asynchronous updates
          of changes in responses to REST calls.
          If WebSocket is not available, it falls back to polling
          REST requests to the server every 10 seconds.
          For asynchronous WebSocket support, it relies on the server
          side supporting web sockets and supporting the interaction
          protocol used by RestWatch.</p>

          <pre><code className="javascript">{inline}</code></pre>

          <p>WebSocket messages sent to the server are JSON and look like this:</p>
          <pre><code className="javascript">{message}</code></pre>

          <p>RestWatch is resilient to the server restarting. If the
          connection is lost, RestWatch will poll every five seconds trying
          to re-establish the connection. When the connection is restored,
          all active watching is automatically resumed.</p>

        </section>

        <section>
          <h2>Methods</h2>
          <dl>
            <dt><code>initialize</code></dt>
            <dd>Initiate a connection to the server. This is optional as
              the <code>start()</code> method will perform this if needed.</dd>
            <dt><code>start  (url, params, function (data) {})</code></dt>
            <dd>Start watching the response to the REST request defined
              by the specified url and parameters. When updates are received,
              the handler function is called with the data returned from
              the server.
              This returns an opaque requestId object that must be used for
              corresponding calls to <code>stop()</code>.</dd>
            <dt><code>stop   (requestId)</code></dt>
            <dd>Stop watching the response to the REST request defined
              by the specified url and parameters.</dd>
          </dl>
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

module.exports = RestWatchDoc;
